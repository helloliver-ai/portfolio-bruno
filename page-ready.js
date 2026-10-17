// Runs in <head>, before the stylesheet and the first page paint.
document.documentElement.dataset.pageState = "loading";
window.portfolioLoadingGuard = window.setTimeout(() => {
  delete document.documentElement.dataset.pageState;
}, 20000);
