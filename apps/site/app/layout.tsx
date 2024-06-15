// Google Fonts
import { Inter } from "next/font/google";
// Global CSS
import "./globals.css";

import Provider from "@/context/provider";
import { Locale } from "@/i18n-config";
import { find } from "@/lib/strapi";
import _ from "lodash";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";

// Inter font
const inter = Inter({
   subsets: ["latin"],
   display: "swap",
   variable: "--font-inter"
});

export default async function RootLayout({ children }: React.PropsWithChildren) {
   const cookieStore = cookies();
   const Lang = cookieStore.get("lang");
   const Direction = cookieStore.get("direction");

   const language = Lang ? Lang.value : "en";
   const { data: LayoutData, error: LayoutError } = await find(
      "layout",
      {
         populate: "deep",
         publicationState: "live",
         locale: [language]
      },
      "no-store",
      process.env.STRAPI_AUTH_TOKEN
   );
   const direction = Direction ? Direction.value : "ltr";

   const TopBarData = _.get(LayoutData, "data.attributes.TopBar", null);
   const LogoData = _.get(LayoutData, "data.attributes.Logo", null);
   const MenuData = _.get(LayoutData, "data.attributes.MainMenu", null);
   const adminMenu = _.get(LayoutData, "data.attributes.adminMenu", null);

   return (
      <html lang={language} className={inter.variable} dir={direction}>
         <body>
            <Provider lang={language as Locale} loginMenu={adminMenu} menuList={MenuData}>
               {children}
               {/* React Hot Toast Provider */}
               <Toaster position='top-right' />
            </Provider>
         </body>
      </html>
   );
}
