import DashboardNav from "@/components/dashboard/DashboardNav";

export const metadata = {
  title: "Admin Dashboard | CarDoc",
};

export default function DashboardLayout({ children }) {
  return <DashboardNav>
           {children}
        </DashboardNav>;
}