import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

const CONTENT_URL = "data/site-content.json";
const DEFAULT_PORTRAIT_IMAGE = "assets/images/portrait-source.jpeg";
const container = document.querySelector("#portrait-points");
const status = document.querySelector("#prototype-status");

if (!container) {
  throw new Error("O contêiner #portrait-points não foi encontrado.");
}

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;

/*
  CONFIGURAÇÕES PRINCIPAIS

  grid:
  quantidade de amostras da imagem em cada eixo.
  110 x 110 não significa 12.100 objetos separados:
  todos os pontos ficam dentro de uma única BufferGeometry.
*/
const settings = {
  grid: isSmallScreen ? 82 : 176,
  portraitSize: isSmallScreen ? 410 : 620,
  depth: isSmallScreen ? 110 : 150,
  rotationSpeed: 0.62,
  minimumDarkness: isSmallScreen ? 0.04 : 0.025,
  pointColor: 0x000000,
  pixelRatioLimit: isSmallScreen ? 1.25 : 1.5,
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  34,
  1,
  1,
  3000
);

camera.position.set(0, 0, isSmallScreen ? 980 : 1050);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  powerPreference: "high-performance",
});

renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, settings.pixelRatioLimit)
);

container.appendChild(renderer.domElement);

const portraitGroup = new THREE.Group();
portraitGroup.position.set(0, 0, 0);

scene.add(portraitGroup);

const timer = new THREE.Timer();
timer.connect(document);

let pointCloud = null;
let animationFrameId = null;
let resizeFrameId = null;

function createPortraitGeometry(image) {
  const sampleCanvas = document.createElement("canvas");
  const sampleContext = sampleCanvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!sampleContext) {
    throw new Error("O navegador não conseguiu criar o Canvas 2D.");
  }

  const grid = settings.grid;

  sampleCanvas.width = grid;
  sampleCanvas.height = grid;

  /*
    A imagem é reduzida para a grade.
    Depois lemos apenas esses pixels menores, em vez dos 1600 × 1600 originais.
  */
  sampleContext.drawImage(image, 0, 0, grid, grid);

  const imageData = sampleContext.getImageData(0, 0, grid, grid).data;

  const positions = [];
  const sizes = [];
  const alphas = [];

  const spacing = settings.portraitSize / (grid - 1);

  for (let row = 0; row < grid; row += 1) {
    for (let column = 0; column < grid; column += 1) {
      const pixelIndex = (row * grid + column) * 4;

      const red = imageData[pixelIndex];
      const green = imageData[pixelIndex + 1];
      const blue = imageData[pixelIndex + 2];
      const sourceAlpha = imageData[pixelIndex + 3] / 255;

      const brightness = (
        red * 0.2126 +
        green * 0.7152 +
        blue * 0.0722
      ) / 255;

      const darkness = (1 - brightness) * sourceAlpha;

      if (darkness < settings.minimumDarkness) {
        continue;
      }

      const x = column * spacing - settings.portraitSize / 2;
      const y = settings.portraitSize / 2 - row * spacing;
      const z = THREE.MathUtils.lerp(
        -settings.depth,
        settings.depth,
        darkness
      );

      positions.push(x, y, z);
      sizes.push(isSmallScreen ? 1.1 + darkness * 5.8 : 1.35 + darkness * 8.4);
      alphas.push(
        isSmallScreen
          ? 0.2 + darkness * 0.8
          : THREE.MathUtils.clamp(0.38 + darkness * 0.92, 0.38, 1)
      );
    }
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  geometry.setAttribute(
    "aSize",
    new THREE.Float32BufferAttribute(sizes, 1)
  );

  geometry.setAttribute(
    "aAlpha",
    new THREE.Float32BufferAttribute(alphas, 1)
  );

  geometry.computeBoundingBox();
  geometry.center();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  return geometry;

}

function createPortraitMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,

    uniforms: {
      uColor: {
        value: new THREE.Color(settings.pointColor),
      },
      uPixelRatio: {
        value: Math.min(
          window.devicePixelRatio,
          settings.pixelRatioLimit
        ),
      },
    },

    vertexShader: `
      attribute float aSize;
      attribute float aAlpha;

      uniform float uPixelRatio;

      varying float vAlpha;

      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);

        float perspectiveScale = 360.0 / max(1.0, -viewPosition.z);

        gl_PointSize = aSize * uPixelRatio * perspectiveScale;
        gl_Position = projectionMatrix * viewPosition;

        vAlpha = aAlpha;
      }
    `,

    fragmentShader: `
      uniform vec3 uColor;

      varying float vAlpha;

      void main() {
        vec2 centeredPoint = gl_PointCoord - vec2(0.5);
        float distanceFromCenter = length(centeredPoint);

        if (distanceFromCenter > 0.5) {
          discard;
        }

        float softEdge = 1.0 - smoothstep(
          0.38,
          0.5,
          distanceFromCenter
        );

        gl_FragColor = vec4(
          uColor,
          vAlpha * softEdge
        );
      }
    `,
  });
}

async function getPortraitImageSource() {
  if (container.dataset.image) {
    return container.dataset.image;
  }

  try {
    const response = await fetch(CONTENT_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Falha ao carregar ${CONTENT_URL}: ${response.status}`);
    }

    const content = await response.json();

    return content.home?.portraitImage || DEFAULT_PORTRAIT_IMAGE;
  } catch (error) {
    console.warn("Usando imagem padrão do retrato.", error);
    return DEFAULT_PORTRAIT_IMAGE;
  }
}

function loadPortrait(imageSource) {
  const image = new Image();

  image.onload = () => {
    try {
      const geometry = createPortraitGeometry(image);
      const material = createPortraitMaterial();

      pointCloud = new THREE.Points(geometry, material);
      portraitGroup.add(pointCloud);

      status?.classList.add("is-hidden");

      resizeRenderer();
      startAnimation();
    } catch (error) {
      showError(error);
    }
  };

  image.onerror = () => {
    showError(
      new Error(
        `A imagem ${imageSource} não pôde ser carregada.`
      )
    );
  };

  image.src = imageSource;
}

function fitPortraitToCanvas() {
  if (!pointCloud) {
    return;
  }

  const boundingBox =
    pointCloud.geometry.boundingBox;

  if (!boundingBox) {
    return;
  }

  const portraitDimensions =
    new THREE.Vector3();

  boundingBox.getSize(
    portraitDimensions
  );

  const visibleHeight =
    2 *
    Math.tan(
      THREE.MathUtils.degToRad(
        camera.fov / 2
      )
    ) *
    camera.position.z;

  const visibleWidth =
    visibleHeight * camera.aspect;

  /*
    Durante a rotação completa, a largura máxima pode
    vir tanto do eixo horizontal quanto da profundidade.
  */
  const rotatingWidth = Math.hypot(
    portraitDimensions.x,
    portraitDimensions.z
  );

  const responsiveScale =
    Math.min(
      visibleWidth / rotatingWidth,
      visibleHeight / portraitDimensions.y
    ) * 0.9;

  portraitGroup.scale.setScalar(
    responsiveScale
  );

  portraitGroup.position.set(0, 0, 0);
}

function resizeRenderer() {
  const { width, height } = container.getBoundingClientRect();

  if (width === 0 || height === 0) {
    return;
  }

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, settings.pixelRatioLimit)
  );

  renderer.setSize(width, height, false);
  fitPortraitToCanvas();
}

function requestResize() {
  if (resizeFrameId !== null) {
    return;
  }

  resizeFrameId = requestAnimationFrame(() => {
    resizeFrameId = null;
    resizeRenderer();
  });
}

function renderFrame(timestamp) {
  if (pointCloud && !prefersReducedMotion) {
    timer.update(timestamp);

    const elapsedTime = timer.getElapsed();

    const rotationPhase =
      elapsedTime * settings.rotationSpeed;

    /*
      Continua girando 360° sem parar nem voltar.
      Apenas desacelera suavemente quando o rosto está de frente
      e acelera um pouco nos ângulos menos reconhecíveis.
    */
    portraitGroup.rotation.y =
      rotationPhase -
      0.35 * Math.sin(rotationPhase);

    portraitGroup.rotation.x = 0;
  }

  renderer.render(scene, camera);
}

function animate(timestamp) {
  animationFrameId = requestAnimationFrame(animate);
  renderFrame(timestamp);
}

function startAnimation() {
  if (animationFrameId !== null) {
    return;
  }

  if (prefersReducedMotion) {
    portraitGroup.rotation.y = -0.35;
    renderFrame();
    return;
  }

  timer.reset();
  animate();
}

function stopAnimation() {
  if (animationFrameId === null) {
    return;
  }

  cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
}

function showError(error) {
  console.error(error);

  if (status) {
    status.textContent = error.message;
    status.classList.remove("is-hidden");
  }
}

window.addEventListener("resize", requestResize);

const resizeObserver = new ResizeObserver(requestResize);
resizeObserver.observe(container);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAnimation();
    return;
  }

  startAnimation();
});

getPortraitImageSource()
  .then(loadPortrait)
  .catch(showError);
