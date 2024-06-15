"use client";
import MobileNav from "@/components/nav-bar/MobileNav";
import { Locale } from "@/i18n-config";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { GlobalProvider } from "./store";

const Provider = ({
   children,
   lang,
   menuList,
   loginMenu
}: {
   children: ReactNode;
   lang: Locale;
   menuList: {
      id: number;
      label: string;
      link: string;
      type: string;
      icon?: string;
      target: string;
   }[];
   loginMenu: {
      id: number;
      label: string;
      link: string;
      icon?: string;
      type: string;
      target: string;
   }[];
}) => {
   return (
      <SessionProvider>
         <GlobalProvider language={lang}>
            {children}
            {/* menu for small devices */}
            <MobileNav loginMenu={loginMenu} menuList={menuList} />
         </GlobalProvider>
      </SessionProvider>
   );
};

export default Provider;
