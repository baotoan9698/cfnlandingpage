import type { Metadata } from "next";
import DashboardScreen from "./dashboard-screen";

export const metadata: Metadata = {
  title: "CFN Portfolio Dashboard",
  description: "Bảng điều hành danh mục khoản phải thu CFN.",
};

export default function DashboardPage() {
  return <DashboardScreen />;
}
