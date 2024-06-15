"use client";
import { Fragment } from "react";
import { i18n, Locale } from "../../i18n-config";

const LangOptions = ({ selectedLang }: { selectedLang: Locale }) => {
   return (
      <Fragment>
         {i18n.locales.map((locale: Locale) => (
            <option key={locale} value={locale} selected={locale === selectedLang ? true : false}>
               {locale}
            </option>
         ))}
      </Fragment>
   );
};
export default LangOptions;
