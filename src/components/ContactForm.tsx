"use client";
import React, { useState } from "react";

export type ContactFormProps = {
  onSubmit?: (form: { name: string; email: string; message: string }) => void;
};

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setEmailValid(validateEmail(e.target.value));
    }
  }

  function handleEmailBlur() {
    setEmailTouched(true);
    setEmailValid(validateEmail(form.email));
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailTouched(true);
    if (!validateEmail(form.email)) {
      setEmailValid(false);
      return;
    }
    if (onSubmit) onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md bg-white p-8 rounded shadow"
    >
      <label className="font-medium">
        Name
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full text-black"
        />
      </label>
      <label className="font-medium">
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          className={`mt-1 p-2 border rounded w-full text-black ${
            emailTouched && !emailValid ? "border-red-500" : ""
          }`}
        />
        {emailTouched && !emailValid && (
          <span className="text-red-600 text-sm">Invalid email address</span>
        )}
      </label>
      <label className="font-medium">
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 p-2 border rounded w-full text-black"
        />
      </label>
      <button
        type="submit"
        className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
      >
        Send
      </button>
    </form>
  );
}
