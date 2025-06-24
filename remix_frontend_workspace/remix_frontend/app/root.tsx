import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";

/** PUBLIC_INTERFACE */
export const meta: MetaFunction = () => [
  { title: "Portfolio | Modern Developer Portfolio & Blog" },
  {
    name: "description",
    content:
      "Modern web developer portfolio and blog. Projects, writing, and contact.",
  },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { name: "theme-color", content: "#0042d1", media: "(prefers-color-scheme: light)" },
  { name: "theme-color", content: "#0f172a", media: "(prefers-color-scheme: dark)" },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "Portfolio" },
  // Add more defaults as needed
];

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <header className="flex justify-end w-full px-6 py-4 fixed top-0 left-0 z-40 bg-white/60 dark:bg-gray-950/80 backdrop-blur">
            <ThemeToggle />
          </header>
          <main className="pt-20">{children}</main>
          <ScrollRestoration />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
