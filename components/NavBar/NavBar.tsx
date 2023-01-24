import { Navbar as DesignNavbar } from '@dossierhq/design';
import Link from 'next/link';
import { useState } from 'react';
import { ENABLE_WEB_INTERFACE } from '../../config/WebInterfaceConfig';
import { FrontendUrls } from '../../utils/FrontendUrls';

interface Props {
  current: 'home' | 'admin-entities' | 'published-entities' | 'schema';
}

export function NavBar({ current }: Props) {
  const [active, setActive] = useState(false);
  return (
    <DesignNavbar>
      <DesignNavbar.Brand>
        <DesignNavbar.Item active={current === 'home'}>
          {NavItemRender(process.env.NEXT_PUBLIC_SITE_NAME ?? 'Home', FrontendUrls.home)}
        </DesignNavbar.Item>
        <DesignNavbar.Burger active={active} onClick={() => setActive(!active)} />
      </DesignNavbar.Brand>
      <DesignNavbar.Menu active={active}>
        {ENABLE_WEB_INTERFACE ? (
          <>
            <DesignNavbar.Item active={current === 'admin-entities'}>
              {NavItemRender('Entities', FrontendUrls.adminEntities)}
            </DesignNavbar.Item>
            <DesignNavbar.Item active={current === 'published-entities'}>
              {NavItemRender('Published entities', FrontendUrls.publishedEntities)}
            </DesignNavbar.Item>
            <DesignNavbar.Item active={current === 'schema'}>
              {NavItemRender('Schema', FrontendUrls.schemaEditor)}
            </DesignNavbar.Item>
          </>
        ) : null}
      </DesignNavbar.Menu>
    </DesignNavbar>
  );
}

function NavItemRender(text: string, href: string) {
  const renderer = ({ className }: { className: string }) => {
    return (
      <Link className={className} href={href}>
        {text}
      </Link>
    );
  };
  return renderer;
}
