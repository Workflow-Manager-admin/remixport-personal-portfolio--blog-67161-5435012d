import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useRef, useEffect } from "react";

type ActionData = { success?: boolean; error?: string };

export const meta: MetaFunction = () => [
  { title: "Contact | Portfolio" },
  { name: "description", content: "Contact form for portfolio site" }
];

// PUBLIC_INTERFACE
export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const message = form.get("message");
  const apiBase = process.env.API_BASE_URL || "http://localhost:3001/api";

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return { error: "Invalid input." };
  }

  const res = await fetch(`${apiBase}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  });

  if (!res.ok) {
    const errorText = (await res.text()) || "Failed to send.";
    return { error: errorText };
  }
  return { success: true };
}

export default function Contact() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionData?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [actionData]);

  return (
    <div className="mx-auto max-w-md py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Contact</h1>
      <Form method="post" ref={formRef} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg border shadow">
        <label className="block">
          <span className="mb-1 block font-semibold">Name</span>
          <input name="name" className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800" required />
        </label>
        <label className="block">
          <span className="mb-1 block font-semibold">Email</span>
          <input name="email" type="email" className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800" required />
        </label>
        <label className="block">
          <span className="mb-1 block font-semibold">Message</span>
          <textarea name="message" className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800" rows={5} required />
        </label>
        <button
          type="submit"
          disabled={navigation.state === "submitting"}
          className="w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          {navigation.state === "submitting" ? "Sending..." : "Send"}
        </button>
        {actionData?.error && <div className="text-red-600 mt-2">{actionData.error}</div>}
        {actionData?.success && <div className="text-green-700 mt-2">Message sent successfully!</div>}
      </Form>
    </div>
  );
}
