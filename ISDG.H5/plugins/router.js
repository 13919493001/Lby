export default ({ app }) => {
  app.router.afterEach((to, from) => {
    window.scrollTo(0, 0); /* 页面切换回顶部 */
  });
};