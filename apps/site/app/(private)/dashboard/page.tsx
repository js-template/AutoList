import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Dashboard | AutoLister",
   description: "Dashboard page for the app"
};

const Dashboard = () => {
   redirect("/dashboard/ads");
};

export default Dashboard;
