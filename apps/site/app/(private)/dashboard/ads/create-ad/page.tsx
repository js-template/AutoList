import AddNewAds from "@/components/create-ads";
import PopupPackages from "@/components/popup-packages";
import { auth } from "@/context/auth";
import { getCategories } from "@/lib/fetch.data";
import { getLanguageFromCookie } from "@/utils/language";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
   title: "Create Ads | AutoLister",
   description: "Create Ads page for the app"
};

const CreateAdPage = async () => {
   const cookieStore = cookies();
   const direction = cookieStore.get("direction")?.value || "ltr";
   const language = getLanguageFromCookie();
   const { data: CategoriesData } = await getCategories();

   const session = await auth();

   if (!session?.user?.membership) {
      return <PopupPackages language={language} direction={direction} user={session?.user} force={true} />;
   }

   return (
      <>
         <AddNewAds CategoriesData={CategoriesData} />
      </>
   );
};

export default CreateAdPage;
