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
  { name: "description", content: "Personal blog posts, insights, and technical writing from a developer portfolio." },
  { property: "og:title", content: "Blog | Portfolio" },
  { property: "og:description", content: "Personal blog and writing: technical posts and developer musings." },
  { property: "og:type", content: "article" },
  { property: "og:image", content: "/logo-light.png" },
  { name: "twitter:card", content: "summary" },
  { name: "twitter:title", content: "Blog | Portfolio" },
  { name: "twitter:description", content: "Read personal blog posts and writing." }
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
    <section className="mx-auto max-w-3xl py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-9">Blog</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {blogs.map(blog =>
          <Link
            to={`/blog/${blog.slug}`}
            key={blog.slug}
            className="block rounded-xl border border-gray-200 dark:border-gray-700 p-5 transition-all duration-150 hover:shadow-xl shadow-sm bg-white/90 dark:bg-gray-900 hover:border-blue-500 hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-blue-600"
            tabIndex={0}
            aria-label={`${blog.title} blog post`}
          >
            <div className="flex flex-col gap-2 h-full">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 line-clamp-2">{blog.title}</h2>
              <div className="text-gray-500 text-xs mb-1">{new Date(blog.date).toLocaleDateString()}</div>
              <p className="mb-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{blog.summary}</p>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
