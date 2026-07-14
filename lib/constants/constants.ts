export const ARTICLES_PATH = "/dashboard/articles";

/**
 * Dashboard sidebar navigation items. Single source of truth shared by the
 * dashboard layout and the e2e tests, so the nav can change in one place.
 */
export const SIDEBAR_ITEMS = [
  { title: "All Articles", href: ARTICLES_PATH },
  { title: "New Article", href: `${ARTICLES_PATH}/create` },
];
