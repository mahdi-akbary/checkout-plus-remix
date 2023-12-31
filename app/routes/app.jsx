import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";

import { authenticate } from "../shopify.server";
import { NavigationTabs } from "~/components/navigationTabs";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export async function loader ({ request }) {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY });
}

export default function App () {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavigationTabs />
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary () {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
