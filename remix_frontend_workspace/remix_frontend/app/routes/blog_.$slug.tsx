import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ReactMarkdown from "react-markdown";

type BlogDetail = {
  title: string;
  date: string;
  content: string; // markdown
  summary?: string;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data?.title ? `${data.title} | Blog` : "Blog | Portfolio";
  const description =
    data?.summary ??
    (data?.content
      ? data.content.slice(0, 140) + (data.content.length > 140 ? "..." : "")
      : "Blog detail page");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:image", content: "/logo-light.png" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
};

// PUBLIC_INTERFACE
export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) throw new Response("Missing blog slug", { status: 400 });

  const apiBase = process.env.API_BASE_URL || "http://localhost:3001/api";
  const res = await fetch(`${apiBase}/blogs/${slug}`);
  if (!res.ok) throw new Response("Blog post not found", { status: res.status });

  const detail: BlogDetail = await res.json();
  return detail;
}

export default function BlogDetailPage() {
  const { title, content, date } = useLoaderData<typeof loader>();
  return (
    <article className="mx-auto max-w-2xl py-10 px-6 prose dark:prose-invert">
      <h1>{title}</h1>
      <div className="text-gray-500 text-sm mb-6">{new Date(date).toLocaleDateString()}</div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
