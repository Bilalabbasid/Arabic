export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.lsayartk.com').replace(/\/+$/, '');
export const SITE_DOMAIN = SITE_URL;
export const PRIMARY_HOST = new URL(SITE_URL).host;
