import React from "react";
import { DashboardWrapper } from "./component/dashboardWrapper";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
