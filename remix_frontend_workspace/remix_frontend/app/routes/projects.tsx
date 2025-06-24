import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type Project = {
  name: string;
  description: string;
  github: string;
  tags?: string[];
};

export const meta: MetaFunction = () => [
  { title: "Projects | Portfolio" },
  { name: "description", content: "Developer projects and portfolio gallery. Explore real-world programming projects and apps." },
  { property: "og:title", content: "Projects | Portfolio" },
  { property: "og:description", content: "View developer projects, sample code, and portfolio app gallery." },
  { property: "og:type", content: "website" },
  { property: "og:image", content: "/logo-light.png" },
  { name: "twitter:card", content: "summary" },
  { name: "twitter:title", content: "Projects | Portfolio" },
  { name: "twitter:description", content: "Gallery of programming projects built by the developer." }
];

// PUBLIC_INTERFACE
export async function loader() {
  const apiBase = process.env.API_BASE_URL || "http://localhost:3001/api";
  const res = await fetch(`${apiBase}/projects`);
  if (!res.ok) throw new Response("Failed to load projects", { status: res.status });
  const projects: Project[] = await res.json();
  return { projects };
}

export default function Projects() {
  const { projects } = useLoaderData<typeof loader>();
  return (
    <section className="mx-auto max-w-3xl py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-9">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((proj) => (
          <div
            key={proj.github}
            className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 bg-white/90 dark:bg-gray-900 transition-all duration-150 h-full flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-1">
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline dark:text-blue-400"
              >
                {proj.name}
              </a>
            </h2>
            <p className="mb-3 text-sm">{proj.description}</p>
            {proj.tags && (
              <div className="flex flex-wrap gap-2 mt-auto">
                {proj.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-block text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-blue-100 dark:border-gray-700 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
