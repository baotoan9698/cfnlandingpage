import type { Metadata } from "next";
import AnalyticsScreen from "./analytics-screen";

export const metadata: Metadata = {
  title: "CFN Market Intelligence",
  description: "Bản mẫu phân tích công khai cho hạ tầng tài trợ thương mại CFN.",
};

export default function AnalyticsPage() {
  return <AnalyticsScreen />;
}
