export const NUMBER_OF_LATEST_BLOG_CARDS_TO_RENDER_ON_DESKTOP = 3;
export const NUMBER_OF_LATEST_BLOG_CARDS_TO_RENDER_ON_MOBILE = 3;
export const retrieveLatestBlogPosts = (allPosts) => {
  return allPosts.slice(0, NUMBER_OF_LATEST_BLOG_CARDS_TO_RENDER_ON_DESKTOP);
};
