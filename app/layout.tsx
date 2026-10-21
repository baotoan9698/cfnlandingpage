import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CFN — Hạ tầng tài trợ thương mại số",
  description:
    "CFN số hóa và kiểm chứng khoản phải thu xuất khẩu, giúp doanh nghiệp Việt Nam kết nối với nguồn vốn thương mại quốc tế.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
