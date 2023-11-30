import Link from 'next/link';
import { ENABLE_WEB_INTERFACE } from '../../config/WebInterfaceConfig';
import { FrontendUrls } from '../../utils/FrontendUrls';
import styles from './Navbar.module.css';

interface Props {
  current: Item['id'];
}

interface Item {
  id: 'home' | 'csr' | 'ssr' | 'ssg' | 'content' | 'published-content' | 'changelog' | 'schema';
  url: string;
  title: string;
  cssScope: 'app' | 'dossier';
}

const webInterfaceItems: Item[] = [
  {
    id: 'content',
    url: FrontendUrls.contentList,
    title: 'Content',
    cssScope: 'dossier',
  },
  {
    id: 'published-content',
    url: FrontendUrls.publishedContentList,
    title: 'Published content',
    cssScope: 'dossier',
  },
  {
    id: 'changelog',
    url: FrontendUrls.changelog,
    title: 'Changelog',
    cssScope: 'dossier',
  },
  {
    id: 'schema',
    url: FrontendUrls.schemaEditor,
    title: 'Schema',
    cssScope: 'dossier',
  },
];

const items: Item[] = [
  {
    id: 'home',
    url: FrontendUrls.home,
    title: 'App router',
    cssScope: 'app',
  },
  {
    id: 'ssg',
    url: FrontendUrls.static,
    title: 'SSG',
    cssScope: 'app',
  },
  {
    id: 'ssr',
    url: FrontendUrls.serverSide,
    title: 'SSR',
    cssScope: 'app',
  },
  {
    id: 'csr',
    url: FrontendUrls.clientSide,
    title: 'CSR',
    cssScope: 'app',
  },
  ...(ENABLE_WEB_INTERFACE ? webInterfaceItems : []),
];

export function Navbar({ current }: Props) {
  // Since the Dossier pages add global styles (especially css reset), we use Next Link between pages
  // of the same scope, and regular <a> tags between pages of different scopes.
  const currentCssScope = items.find((item) => item.id === current)?.cssScope;
  return (
    <nav className={styles.navbar}>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.id === current ? styles.active : undefined}>
            {item.cssScope === currentCssScope ? (
              <Link href={item.url}>{item.title}</Link>
            ) : (
              <a href={item.url}>{item.title}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
