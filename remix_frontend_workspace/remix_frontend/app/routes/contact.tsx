import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";

// Extend ActionData to return more detailed errors
type ActionData = { success?: boolean; error?: string; fieldErrors?: Record<string, string> };

export const meta: MetaFunction = () => [
  { title: "Contact | Portfolio" },
  { name: "description", content: "Contact form to get in touch with the developer via email." },
  { property: "og:title", content: "Contact | Portfolio" },
  { property: "og:description", content: "Reach out using the contact form for freelance, collaboration, or questions." },
  { property: "og:type", content: "website" },
  { property: "og:image", content: "/logo-light.png" },
  { name: "twitter:card", content: "summary" },
  { name: "twitter:title", content: "Contact | Portfolio" },
  { name: "twitter:description", content: "Contact the developer via this form." }
];

/** Simple email regex for frontend-only check */
function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

/** Field length validation for UX and abuse prevention */
const MAX_NAME = 64;
const MAX_EMAIL = 100;
const MAX_MESSAGE = 1000;

// PUBLIC_INTERFACE
export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const message = form.get("message");
  const apiBase = process.env.API_BASE_URL || "http://localhost:3001/api";

  // Server-side basic validation: required
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return { error: "Invalid input." };
  }
  if (!name || !email || !message) {
    return {
      fieldErrors: {
        name: !name ? "Name is required." : "",
        email: !email ? "Email is required." : "",
        message: !message ? "Message is required." : "",
      },
    };
  }
  // Format/length validation (for defense in depth; backend is currently less strict)
  const fieldErrors: Record<string, string> = {};
  if (name.length > MAX_NAME) fieldErrors.name = "Name is too long.";
  if (!isValidEmail(email)) fieldErrors.email = "Enter a valid email address.";
  if (email.length > MAX_EMAIL) fieldErrors.email = "Email is too long.";
  if (message.length > MAX_MESSAGE) fieldErrors.message = "Message is too long.";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const res = await fetch(`${apiBase}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  });

  if (!res.ok) {
    const errorText = (await res.text()) || "Failed to send.";
    // Try to surface backend 400 error helpfully
    return { error: errorText };
  }
  return { success: true };
}

export default function Contact() {
  // Local state for live validation (before submit)
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on successful submission
  useEffect(() => {
    if (actionData?.success && formRef.current) {
      formRef.current.reset();
      setFields({ name: "", email: "", message: "" });
      setFieldErrors({});
    }
  }, [actionData]);

  // Real-time validation logic
  function validate(current = fields) {
    const errors: Record<string, string> = {};
    if (!current.name) errors.name = "Name is required.";
    else if (current.name.length > MAX_NAME) errors.name = "Name is too long.";
    if (!current.email) errors.email = "Email is required.";
    else if (!isValidEmail(current.email)) errors.email = "Enter a valid email address.";
    else if (current.email.length > MAX_EMAIL) errors.email = "Email is too long.";
    if (!current.message) errors.message = "Message is required.";
    else if (current.message.length > MAX_MESSAGE) errors.message = "Message is too long.";
    return errors;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const updatedFields = { ...fields, [name]: value };
    setFields(updatedFields);
    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors(validate(updatedFields));
    }
  }

  function handleBlur() {
    setFieldErrors(validate());
  }

  // Final error sources: local state + backend
  const mergedFieldErrors: Record<string, string> = {
    ...fieldErrors,
    ...(actionData?.fieldErrors ?? {}),
  };
  const canSubmit =
    !navigation.state.startsWith("submitting") &&
    Object.values(validate()).every(v => !v);

  return (
    <div className="mx-auto max-w-md py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Contact</h1>
      <div className="text-gray-500 text-sm mb-6">
        Fill out the form below to send a message.
        <br />
        <span className="italic block mt-1 text-gray-600 dark:text-gray-400">
          (Note: This form is for demonstration – messages will not be emailed, but form delivery will be simulated.)
        </span>
      </div>
      <Form method="post" ref={formRef} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg border shadow" replace>
        <label className="block">
          <span className="mb-1 block font-semibold">Name</span>
          <input
            name="name"
            className={`w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 ${mergedFieldErrors.name ? 'border-red-500' : ''}`}
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={MAX_NAME}
            required
            autoComplete="name"
            disabled={navigation.state === "submitting"}
          />
          {mergedFieldErrors.name && (
            <div className="text-red-600 mt-1 text-xs">{mergedFieldErrors.name}</div>
          )}
        </label>
        <label className="block">
          <span className="mb-1 block font-semibold">Email</span>
          <input
            name="email"
            type="email"
            className={`w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 ${mergedFieldErrors.email ? 'border-red-500' : ''}`}
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={MAX_EMAIL}
            required
            autoComplete="email"
            disabled={navigation.state === "submitting"}
          />
          {mergedFieldErrors.email && (
            <div className="text-red-600 mt-1 text-xs">{mergedFieldErrors.email}</div>
          )}
        </label>
        <label className="block">
          <span className="mb-1 block font-semibold">Message</span>
          <textarea
            name="message"
            className={`w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 ${mergedFieldErrors.message ? 'border-red-500' : ''}`}
            value={fields.message}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={MAX_MESSAGE}
            rows={5}
            required
            disabled={navigation.state === "submitting"}
          />
          {mergedFieldErrors.message && (
            <div className="text-red-600 mt-1 text-xs">{mergedFieldErrors.message}</div>
          )}
        </label>
        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full font-semibold py-2 rounded ${
            canSubmit
              ? "bg-blue-700 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              : "bg-gray-400 text-gray-100 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed"
          }`}
        >
          {navigation.state === "submitting" ? "Sending..." : "Send"}
        </button>
        {/* Error/success feedback block */}
        {actionData?.error && (
          <div className="text-red-600 mt-2 text-sm">
            {actionData.error}
          </div>
        )}
        {actionData?.success && (
          <div className="text-green-700 mt-2 text-sm">
            Message submitted successfully! (No real email sent)
          </div>
        )}
      </Form>
    </div>
  );
}
