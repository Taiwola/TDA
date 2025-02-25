"use client";
import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

type FormField = {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

type FormTemplateProps = {
  title: string;
  fields: FormField[];
  action: (formData: FormData) => void;
  buttonText: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  error?: string;
};

export const FormTemplate = ({
  title,
  fields,
  action,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkHref,
  error,
}: FormTemplateProps) => {
  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="font-bold text-base mb-6 text-center">{title}</h1>
      <form action={action} className="space-y-4">
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required || false}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-burntgold"
            />
          </div>
        ))}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-burntgold text-white rounded-sm hover:bg-black transition-all"
          variant="bordered"
        >
          {buttonText}
        </Button>
      </form>
      {footerText && footerLinkText && footerLinkHref && (
        <p className="mt-4 text-center text-sm text-gray-600">
          {footerText}{" "}
          <Link
            href={footerLinkHref}
            className="text-burntgold hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>
      )}
    </div>
  );
};
