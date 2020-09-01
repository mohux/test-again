import { FC, useEffect } from 'react';
import TranslationContext, { TranslateProps } from './context';
import cookie from 'js-cookie';
import { parseMessage } from './_helpers';
type LocaleProviderProps = {
   lang: string;
   translations: {
      [key: string]: Record<string, string>;
   };
};

/* -------------------------------------------------------------------------- */
/*                           TRANSLATING IS EASY :(                           */
/* -------------------------------------------------------------------------- */

const TranslationProvider: FC<LocaleProviderProps> = ({ children, lang, translations }) => {
   function translate({ id, fallback, values }: TranslateProps) {
      const keys = id?.split(':');
      const messages = translations;

      const translatedMessage = messages?.[keys?.[0]]?.[keys?.[1]];
      if (!translatedMessage && fallback) {
         console.warn(`Translation for '${id}' not found, using fallback instead.`);
         return fallback;
      }
      if (!translatedMessage && !fallback) {
         console.warn(`Translation for '${id}' not found.`);
         return `Missing translation for '${id}'`;
      }

      return parseMessage(translatedMessage, values);
   }

   useEffect(() => {
      const cookieLang = cookie.get('lang');
      if (cookieLang !== lang)
         cookie.set('lang', lang, {
            path: '/',
            expires: Number(process.env.NEXT_PUBLIC_LANG_COOKIES_AGE),
         });
   }, [lang]);

   return (
      <TranslationContext.Provider value={{ lang, translate }}>
         {children}
      </TranslationContext.Provider>
   );
};

export default TranslationProvider;
