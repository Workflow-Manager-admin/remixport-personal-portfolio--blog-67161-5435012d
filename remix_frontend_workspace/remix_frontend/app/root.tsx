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
  // Social links for the footer (can be extended easily)
  const socialLinks = [
    {
      href: "https://github.com/",
      label: "GitHub",
      svg: (
        <svg aria-hidden="true" focusable="false" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 .297c-6.6 0-12 5.4-12 12 0 5.3 3.438 9.799 8.205 11.409.6.111.82-.258.82-.578 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.384-1.333-1.752-1.333-1.752-1.09-.746.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.069 1.834 2.807 1.304 3.492.997.108-.775.419-1.305.762-1.604-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.382 1.236-3.222-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23.958-.267 1.984-.399 3.003-.404 1.018.005 2.045.137 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.84 1.235 1.913 1.235 3.222 0 4.609-2.804 5.624-5.476 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.901-.014 3.293 0 .321.217.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.6-5.4-12-12-12"
          />
        </svg>
      ),
    },
    {
      href: "https://linkedin.com/",
      label: "LinkedIn",
      svg: (
        <svg aria-hidden="true" focusable="false" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 19h-3v-9h3v9zm-1.5-10.271c-.966 0-1.75-.787-1.75-1.756 0-.97.784-1.758 1.75-1.758s1.75.788 1.75 1.758c0 .969-.784 1.756-1.75 1.756zm13.5 10.271h-3v-4.813c0-1.147-.021-2.625-1.598-2.625-1.6 0-1.846 1.249-1.846 2.541v4.897h-3v-9h2.881v1.233h.042c.401-.761 1.379-1.562 2.841-1.562 3.041 0 3.603 2.002 3.603 4.604v4.725z"
          />
        </svg>
      ),
    },
    {
      href: "mailto:email@example.com",
      label: "Email",
      svg: (
        <svg aria-hidden="true" focusable="false" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.5 4.75A2.25 2.25 0 013.75 2.5h16.5A2.25 2.25 0 0122.5 4.75v14.5a2.25 2.25 0 01-2.25 2.25H3.75a2.25 2.25 0 01-2.25-2.25V4.75zm2.613.75l7.887 6.57a.75.75 0 00.978 0l7.887-6.57a.75.75 0 00-.365-.126H3.75a.75.75 0 00-.637.126zM21 19.25v-12.2l-7.193 5.995a2.25 2.25 0 01-2.813 0L3 7.05v12.2a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75z"/>
        </svg>
      ),
    }
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-950 leading-relaxed">
        <ThemeProvider>
          {/* Header */}
          <header className="flex justify-end w-full px-4 sm:px-8 py-3 fixed top-0 left-0 z-40 bg-white/70 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
            <ThemeToggle />
          </header>
          {/* Layout wrapper - enables better footer placement */}
          <div className="relative min-h-screen flex flex-col pt-20">
            <main className="flex-1">{children}</main>
            <footer className="w-full mt-8 py-6 flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 bg-white/80 dark:bg-gray-950/80 border-t border-gray-200 dark:border-gray-800 text-xs gap-3">
              <span className="text-gray-500 dark:text-gray-400 text-center md:text-left">
                © {new Date().getFullYear()} Portfolio. All rights reserved.
              </span>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                {socialLinks.map(({ href, label, svg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  >
                    {svg}
                  </a>
                ))}
              </div>
            </footer>
          </div>
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
