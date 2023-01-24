import { DEFAULT_AUTH_KEYS } from './AuthKeyConfig';

export const SYSTEM_USERS = {
  anonymous: {
    provider: 'sys',
    identifier: 'anonymous',
    defaultAuthKeys: DEFAULT_AUTH_KEYS,
  },
} as const;
