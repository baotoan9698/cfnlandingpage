import type { Metadata } from "next";
import ExporterPage from "./exporter-page";
export const metadata: Metadata = {
  title: "Nhà xuất khẩu | CFN — Mở đường vốn cho hàng Việt",
  description: "Tài trợ khoản phải thu xuất khẩu qua CFN: dòng tiền minh họa, Funder, điều kiện tham gia và đăng ký thí điểm Việt Nam–UAE.",
};
export default function Page() { return <ExporterPage />; }
