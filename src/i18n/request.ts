import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import pt from '@/locales/pt.json';
import id from '@/locales/id.json';

type Messages = typeof en;
type MessageObject = Record<string, unknown>;

const messages: Record<Locale, MessageObject> = {
  en,
  es: es as MessageObject,
  pt: pt as MessageObject,
  id: id as MessageObject
};

function isObject(value: unknown): value is MessageObject {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge<T extends MessageObject>(base: T, override: MessageObject): T {
  const output: MessageObject = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (isObject(value) && isObject(output[key])) {
      output[key] = deepMerge(output[key] as MessageObject, value);
    } else if (value !== undefined) {
      output[key] = value;
    }
  }

  return output as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages:
      locale === routing.defaultLocale
        ? en
        : deepMerge(en, messages[locale as Locale] ?? {})
  };
});
