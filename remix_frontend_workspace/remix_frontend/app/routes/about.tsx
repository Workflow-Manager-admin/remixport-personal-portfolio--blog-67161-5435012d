import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type AboutData = {
  content: string;
};

export const meta: MetaFunction = () => [
  { title: "About | Portfolio" },
  { name: "description", content: "About the site owner and portfolio" },
];

/* PUBLIC_INTERFACE */
export async function loader() {
  const apiBase = process.env.API_BASE_URL || "http://localhost:3001/api";
  const res = await fetch(`${apiBase}/about`);
  if (!res.ok) throw new Response("Failed to load about info", { status: res.status });
  const data: AboutData = await res.json();
  return data;
}

export default function About() {
  const { content } = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto max-w-2xl py-12 px-6 prose dark:prose-invert">
      <h1>About Me</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
