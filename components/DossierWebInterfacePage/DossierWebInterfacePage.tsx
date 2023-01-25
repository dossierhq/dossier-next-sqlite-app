import { Message, NotificationContainer } from '@dossierhq/design';
import '@dossierhq/design/main.css';
import '@dossierhq/leaflet/icons.css';
import '@dossierhq/leaflet/main.css';
import '@dossierhq/react-components/main.css';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { ENABLE_WEB_INTERFACE } from '../../config/WebInterfaceConfig';
import { FrontendUrls } from '../../utils/FrontendUrls';

interface Props {
  children: React.ReactNode;
}

export function DossierWebInterfacePage({ children }: Props) {
  if (ENABLE_WEB_INTERFACE) {
    return <NotificationContainer>{children}</NotificationContainer>;
  }

  return (
    <Message color="warning">
      <Message.Body>
        Dossier is disabled in production. Go <Link href={FrontendUrls.home}>home</Link>.
      </Message.Body>
    </Message>
  );
}
