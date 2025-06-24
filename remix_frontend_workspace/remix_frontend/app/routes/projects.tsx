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
  { name: "description", content: "Developer projects and portfolio gallery" },
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
    <div className="mx-auto max-w-3xl py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((proj) => (
          <div key={proj.github} className="rounded-xl border p-6 shadow hover:shadow-lg bg-white dark:bg-gray-900">
            <h2 className="text-xl font-semibold">
              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">{proj.name}</a>
            </h2>
            <p className="my-3">{proj.description}</p>
            {proj.tags && (
              <div className="flex flex-wrap gap-2">
                {proj.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
