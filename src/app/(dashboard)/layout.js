import DashboardNav from "@/components/Dashboard/DashboardNav";

export const metadata = {
  title: "Admin Dashboard | CarDoc",
};

export default function DashboardLayout({ children }) {
  return <DashboardNav>
           {children}
        </DashboardNav>;
}