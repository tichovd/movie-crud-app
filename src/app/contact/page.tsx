"use client";
import { useState } from "react";
import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleFormSubmit() {
    setSubmitted(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 py-6">
      <h1 className="text-3xl font-bold mb-8">Contact</h1>
      {submitted ? (
        <p className="text-green-600 text-lg">Thank you for your message!</p>
      ) : (
        <ContactForm onSubmit={handleFormSubmit} />
      )}
    </main>
  );
}
