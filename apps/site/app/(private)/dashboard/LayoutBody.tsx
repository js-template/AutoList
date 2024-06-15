"use client";
import SideNavBar from "@/components/sidebar";
import SuperAdminNavbar from "@/components/sidebar/admin";
import { useGlobalContext } from "@/context/store";
import { PropsWithChildren, useEffect } from "react";
import toast from "react-hot-toast";

const LayoutBody = ({
   mainMenu,
   adminMenu,
   sidebarMenu,
   children,
   error
}: {
   mainMenu: {
      id: number;
      label: string;
      link: string;
      type: string;
      icon?: string;
      target: string;
   }[];
   adminMenu: {
      id: number;
      label: string;
      link: string;
      icon?: string;
      type: string;
      target: string;
   }[];
   sidebarMenu: {
      id: number;
      label: string;
      link: string;
      type: string;
      icon?: string;
      target: string;
   }[];
   error: any;
} & PropsWithChildren) => {
   const { direction } = useGlobalContext();

   // *** if layout data load failed show this warning
   useEffect(() => {
      const closeId = setTimeout(() => {
         if (error) {
            toast.error("Failed to load layout data");
         }
      }, 100);

      return () => clearTimeout(closeId);
   }, [error]);

   return (
      <section className='bg-success-content min-h-[calc(100vh-5rem)]'>
         {/* side nav */}
         <SideNavBar sidebarMenu={sidebarMenu} />

         {/* top nav */}
         <SuperAdminNavbar mainMenu={mainMenu} adminMenu={adminMenu} />

         {/* main content */}
         <div className={direction === "ltr" ? "lg:ml-80 mt-20" : "lg:mr-80 mt-20"}>
            <div
               className={` px-5 ${direction === "rtl" ? "lg:!pl-8  lg:pr-0" : "lg:!pr-8 lg:pl-0"} pb-1 pt-10 relative`}
            >
               <main>{children}</main>
            </div>
         </div>
      </section>
   );
};

export default LayoutBody;
