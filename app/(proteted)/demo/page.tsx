import { Metadata } from "next";
import MainPage from "./main";

export const metadata: Metadata = {
  title: "ERP - Quản lý Template Email",
};
export default function Open() {
  return <MainPage />;
}
