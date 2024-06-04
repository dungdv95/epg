import { Metadata } from "next";
import MainPage from "./main";

export const metadata: Metadata = {
  title: "ERP - Home",
};
export default function Open() {
  return <MainPage />;
}
