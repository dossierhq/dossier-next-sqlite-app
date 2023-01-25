import { NotificationContainer } from '@dossierhq/design';
import '@dossierhq/design/main.css';
import '@dossierhq/leaflet/icons.css';
import '@dossierhq/leaflet/main.css';
import '@dossierhq/react-components/main.css';
import 'leaflet/dist/leaflet.css';
import { ENABLE_WEB_INTERFACE } from '../../config/WebInterfaceConfig';

interface Props {
  children: React.ReactNode;
}

export function DossierWebInterfacePage({ children }: Props) {
  if (ENABLE_WEB_INTERFACE) {
    return <NotificationContainer>{children}</NotificationContainer>;
  }

  return <></>;
}
