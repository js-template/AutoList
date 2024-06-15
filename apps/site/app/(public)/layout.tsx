import Footer from "@/components/footer";
import MainNavBar from "@/components/nav-bar";
import TopNav from "@/components/top-nav";
import { find } from "@/lib/strapi";
import { getLanguageFromCookie } from "@/utils/language";
import _ from "lodash";
import { Fragment } from "react";

export default async function RootLayout({ children }: React.PropsWithChildren) {
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

   const TopBarData = _.get(LayoutData, "data.attributes.TopBar", null);
   const LogoData = _.get(LayoutData, "data.attributes.Logo", null);
   const MenuData = _.get(LayoutData, "data.attributes.MainMenu", null);
   const ButtonData = _.get(LayoutData, "data.attributes.Button", null);

   const FooterOneData = _.get(LayoutData, "data.attributes.FooterOne", null);
   const FooterTwoData = _.get(LayoutData, "data.attributes.FooterTwo", null);
   const FooterThreeData = _.get(LayoutData, "data.attributes.FooterThree", null);

   return (
      <Fragment>
         <TopNav TopBarData={TopBarData} error={LayoutError} />
         <MainNavBar LogoData={LogoData} MenuData={MenuData} ButtonData={ButtonData} />
         <main className='pt-32'>{children}</main>
         <Footer FooterOneData={FooterOneData} FooterTwoData={FooterTwoData} FooterThreeData={FooterThreeData} />
      </Fragment>
   );
}
