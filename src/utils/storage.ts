import { Storage } from '@plasmohq/storage';

export const DEFAULT_DOMAIN_WHITELIST = ['https://movie-web.app', 'http://localhost:5173'];

export const storage = new Storage();

export const domainIsInWhitelist = async (domain: string) => {
  const whitelist = await storage.get<string[]>('domainWhitelist');
  return whitelist?.some((d) => d.includes(domain)) ?? false;
};

export const validateDomainWhiteList = async (domain: string) => {
  const isWhiteListed = await domainIsInWhitelist(domain);
  if (!isWhiteListed) throw new Error('Domain is not whitelisted');
};
