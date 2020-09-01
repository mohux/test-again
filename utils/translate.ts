import { languages, defaultLanguage } from '~/translation.json';
import { Router } from 'next/router';

type Payload = {
   [key: string]: string;
};

/** -------------------------------------------------------------------------- **/
/**                       getStaticPaths helper function                       **/
/** -------------------------------------------------------------------------- **/

/**
 * @description this function will make sure that getStaticPaths work properly with dynamic languages
 * by looping through all languages inside @file translation.json inside root directory and create a path for each one
 * 
 * @param payload payload is helpful when using a dynamic route inside [lang] folder to create paths for both lang and passed values
   the key should be the name of the dynamic route, the value is array of strings storing the params
 **/

export function getLanguagesPaths(payloads?: Payload[]) {
   if (!payloads) return Object.keys(languages).map(lang => ({ params: { lang } }));

   const paths: any[] = [];

   /* -------------------------- looping all languages ------------------------- */
   /* ---------------------- Then injecting passed params ---------------------- */

   payloads.forEach(payload =>
      Object.keys(languages).forEach(lang =>
         paths.push({
            params: {
               lang,
               ...payload,
            },
         })
      )
   );

   return paths;
}

/* ------------------------ Without language payloads ----------------------- */
export function getPaths(payloads: Payload[]) {
   const paths: any[] = [];

   payloads.forEach(payload =>
      paths.push({
         params: {
            ...payload,
         },
      })
   );

   return paths;
}

/** -------------------------------------------------------------------------- **/
/**                       Get the user's current language                      **/
/** -------------------------------------------------------------------------- **/

/**
 * @description Will extract the language from router/
 * The language is only valid if it's inside @file translation.json languages array
 * otherwise, the default language will be used
 *
 * @param router NextJS router
 */

export function getLang(router: Router) {
   const langQuery = `${router.query.lang}`;

   if (router.query.lang && Object.keys(languages).includes(langQuery)) {
      return langQuery;
   }

   /* --------- Potentially sometimes router wont pass a query object, --------- */
   /* --- this will validate if the first slashed value is a language or not --- */

   const possibleLang = router.asPath.split('/')[1];

   if (Object.keys(languages).includes(possibleLang)) {
      return possibleLang;
   }

   return defaultLanguage;
}
