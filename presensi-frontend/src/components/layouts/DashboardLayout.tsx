import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Layout from "./Layout";

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const DashboarLayout: React.FC<DashboardLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Helmet>
        <div className="w-full min-h-screen">
          <Layout>{children}</Layout>
        </div>
      </HelmetProvider>
    </>
  );
};
