import Link from 'next/link';
import { ENABLE_WEB_INTERFACE } from '../../config/WebInterfaceConfig';
import { FrontendUrls } from '../../utils/FrontendUrls';
import styles from './Navbar.module.css';

interface Props {
  current: Item['id'];
}

interface Item {
  id: 'home' | 'csr' | 'ssr' | 'ssg' | 'admin-entities' | 'published-entities' | 'schema';
  url: string;
  title: string;
}

const webInterfaceItems: Item[] = [
  {
    id: 'admin-entities',
    url: FrontendUrls.adminEntities,
    title: 'Entities',
  },
  {
    id: 'published-entities',
    url: FrontendUrls.publishedEntities,
    title: 'Published entities',
  },
  {
    id: 'schema',
    url: FrontendUrls.schemaEditor,
    title: 'Schema',
  },
];

const items: Item[] = [
  {
    id: 'home',
    url: FrontendUrls.home,
    title: 'SSR app/',
  },
  {
    id: 'csr',
    url: FrontendUrls.clientSide,
    title: 'CSR',
  },
  {
    id: 'ssr',
    url: FrontendUrls.serverSide,
    title: 'SSR',
  },
  {
    id: 'ssg',
    url: FrontendUrls.static,
    title: 'SSG',
  },
  ...(ENABLE_WEB_INTERFACE ? webInterfaceItems : []),
];

export function Navbar({ current }: Props) {
  return (
    <nav className={styles.navbar}>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.id === current ? styles.active : undefined}>
            <Link href={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
