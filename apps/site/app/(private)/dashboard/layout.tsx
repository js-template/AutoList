import PopupPackages from "@/components/popup-packages";
import { auth } from "@/context/auth";
import { find } from "@/lib/strapi";
import { getLanguageFromCookie } from "@/utils/language";
import _ from "lodash";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import LayoutBody from "./LayoutBody";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
   const cookieStore = cookies();
   const direction = cookieStore.get("direction")?.value || "ltr";
   const language = getLanguageFromCookie();

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

   const session = await auth();

   const MenuData = _.get(LayoutData, "data.attributes.MainMenu", null);
   const adminMenu = _.get(LayoutData, "data.attributes.adminMenu", null);
   const sidebarMenu = _.get(LayoutData, "data.attributes.sidebarMenu", null);

   return (
      <LayoutBody mainMenu={MenuData} adminMenu={adminMenu} sidebarMenu={sidebarMenu} error={LayoutError}>
         {children}
         <PopupPackages language={language} direction={direction} user={session?.user} />
      </LayoutBody>
   );
};

export default DashboardLayout;
