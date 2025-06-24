import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

type BlogMeta = {
  title: string;
  slug: string;
  summary: string;
  date: string;
};

export const meta: MetaFunction = () => [
  { title: "Blog | Portfolio" },
  { name: "description", content: "Personal blog posts and writing" }
];

// PUBLIC_INTERFACE
export async function loader() {
  // Should match backend listening port/proxy for dev.
  const apiBase = process.env.API_BASE_URL || "http://localhost:3001/api";
  const res = await fetch(`${apiBase}/blogs`);
  if (!res.ok) throw new Response("Failed to fetch blog list", { status: res.status });
  const blogs: BlogMeta[] = await res.json();
  return { blogs };
}

export default function BlogIndex() {
  const { blogs } = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto max-w-3xl py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8">
        {blogs.map(blog =>
          <Link
            to={`/blog/${blog.slug}`}
            key={blog.slug}
            className="block rounded-lg border p-6 transition hover:shadow-lg bg-white dark:bg-gray-900"
          >
            <h2 className="text-xl font-semibold mb-1">{blog.title}</h2>
            <div className="text-gray-500 text-sm mb-2">{new Date(blog.date).toLocaleDateString()}</div>
            <p className="mb-2">{blog.summary}</p>
          </Link>
        )}
      </div>
    </div>
  );
}
