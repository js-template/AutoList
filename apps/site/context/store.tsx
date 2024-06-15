"use client";
import { createContext, ReactNode, useContext, useEffect, useState, useTransition } from "react";
import { Locale } from "../i18n-config";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
   children: ReactNode;
   language?: Locale;
};

// NOTE: Global context props
interface contextProps {
   lang: Locale;
   changeLang: (lang: Locale) => void;
   direction?: "ltr" | "rtl";
   changeDirection?: (direction: "ltr" | "rtl") => void;
   hydration: boolean;
   setHydration: (hydration: boolean) => void;
   sidebarShow: boolean;
   setSidebarShow: (value: boolean) => void;
   mobileMenuShow: boolean;
   setMobileMenuShow: (value: boolean) => void;
}

// NOTE: Global context store
const GlobalContext = createContext<contextProps>({
   lang: "en",
   changeLang: () => {},
   direction: "ltr",
   changeDirection: () => {},
   hydration: false,
   setHydration: () => {},
   sidebarShow: false,
   setSidebarShow: () => {},
   mobileMenuShow: false,
   setMobileMenuShow: () => {}
});

// NOTE: Global provider for context store
export const GlobalProvider = ({ children, language }: Props) => {
   const [lang, setLang] = useState<Locale>(language ?? "en");
   const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
   const [hydration, setHydration] = useState(false);
   const [sidebarShow, setSidebarShow] = useState(false);
   const [mobileMenuShow, setMobileMenuShow] = useState(false);
   const router = useRouter();
   const [, startTransition] = useTransition();
   const { status } = useSession();

   useEffect(() => {
      if (status === "unauthenticated") {
         deleteCookie("jwt");
      }
   });

   // NOTE: Set the hydration state to true
   useEffect(() => {
      setHydration(true);
   }, []);

   // Region for setting the language
   useEffect(() => {
      const getLang = getCookie("lang");
      if (getLang) {
         setLang(getLang as Locale);
      }

      const getDirection = getCookie("direction");
      if (getDirection) {
         setDirection(getDirection as "ltr" | "rtl");
      }

      // NOTE: Set the lang cookie if it doesn't exist
      const internalId = setInterval(() => {
         const getLang = getCookie("lang");
         if (!getLang) {
            setCookie("lang", lang);
         }

         // NOTE: Set the direction cookie if it doesn't exist
         const getDirection = getCookie("direction");
         if (!getDirection) {
            setCookie("direction", direction);
         }
      }, 500);

      return () => {
         clearInterval(internalId);
      };
   }, []);

   // NOTE: Change the language function handler
   const changeLang = (lang: Locale) => {
      setLang(lang);
      setDirection(lang === "ar" ? "rtl" : "ltr");
      setCookie("lang", lang, {
         maxAge: 30 * 24 * 60 * 60,
         path: "/"
      });
      setCookie("direction", lang === "ar" ? "rtl" : "ltr", {
         maxAge: 30 * 24 * 60 * 60,
         path: "/"
      });
      router.refresh();
   };

   // NOTE: Change the direction function handler
   const changeDirection = (direction: "ltr" | "rtl") => {
      setDirection(direction);
      setCookie("direction", direction);
   };

   // NOTE: Automatically change the language based on the cookie lang value
   useEffect(() => {
      const getLang = getCookie("lang");
      if (getLang) {
         setLang(getLang as Locale);
      } else {
         setCookie("lang", lang, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
         });
      }
   }, []);

   // NOTE: Return the global context provider
   return (
      <GlobalContext.Provider
         value={{
            lang,
            changeLang,
            direction,
            changeDirection,
            hydration,
            setHydration,
            sidebarShow,
            setSidebarShow,
            mobileMenuShow,
            setMobileMenuShow
         }}
      >
         {children}
      </GlobalContext.Provider>
   );
};

// NOTE: Global context hook
export const useGlobalContext = () => useContext(GlobalContext);
