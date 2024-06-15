import type { Metadata } from "next";
import EditAds from "@/components/edit-ads";
import { getCategories } from "@/lib/fetch.data";

export const metadata: Metadata = {
   title: "Edit Ads | AutoLister",
   description: "Edit Ads page for the app"
};

const EditAdPage = async () => {
   const { data: CategoriesData } = await getCategories();
   return (
      <>
         <EditAds CategoriesData={CategoriesData} />
      </>
   );
};

export default EditAdPage;
