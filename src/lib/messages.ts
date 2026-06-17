import en from '@/locales/en.json';
import es from '@/locales/es.json';
import id from '@/locales/id.json';
import pt from '@/locales/pt.json';
import { routing, type Locale } from '@/i18n/routing';

type MessageObject = Record<string, unknown>;

const partialMessages: Record<Locale, MessageObject> = {
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

export function asLocale(locale: string): Locale {
  return routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale;
}

export function getLocaleMessages(localeInput: string) {
  const locale = asLocale(localeInput);
  return locale === routing.defaultLocale ? en : deepMerge(en, partialMessages[locale]);
}

export function translate(localeInput: string, key: string): string {
  const messages = getLocaleMessages(localeInput) as MessageObject;
  const value = key.split('.').reduce<unknown>((current, part) => {
    if (!isObject(current)) return undefined;
    return current[part];
  }, messages);

  return typeof value === 'string' ? value : key;
}
