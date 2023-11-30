export const FrontendUrls = {
  home: '/',
  changelog: '/dossier/changelog',
  contentList: '/dossier/content',
  contentEdit: (ids: string[]): string => `/dossier/content/edit?id=${ids.join('&id=')}`,
  contentEditNew: (entityType: string, id: string): string =>
    `/dossier/content/edit?new=${entityType}:${id}`,
  isContentEdit: (url: string): boolean => url.startsWith('/dossier/content/edit'),
  publishedContentList: '/dossier/published-content',
  publishedContentDisplay: (ids: string[]): string =>
    `/dossier/published-content/display?id=${ids.join('&id=')}`,
  schemaEditor: '/dossier/schema',
  clientSide: '/client-side',
  serverSide: '/server-side',
  static: '/static-generation',
};
