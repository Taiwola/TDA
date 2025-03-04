"use client";
import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

type FormField = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
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
  forgotPasswordLinkHref?: string; // New optional prop for forgot password link
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
  forgotPasswordLinkHref,
  error,
}: FormTemplateProps) => {
  return (
    <div className="max-w-md w-full mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {title}
      </h1>
      <form action={action} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required || false}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-900 placeholder-gray-400"
            />
          </div>
        ))}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        <Button
          type="submit"
          className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all"
        >
          {buttonText}
        </Button>
      </form>

      {/* Forgot Password Link (only shown if provided) */}
      {forgotPasswordLinkHref && (
        <p className="mt-4 text-center text-sm text-gray-600">
          <Link
            href={forgotPasswordLinkHref}
            className="text-amber-600 hover:text-amber-700 hover:underline font-medium transition-colors"
          >
            Forgot Password?
          </Link>
        </p>
      )}

      {/* Existing Footer */}
      {footerText && footerLinkText && footerLinkHref && (
        <p className="mt-4 text-center text-sm text-gray-600">
          {footerText}{" "}
          <Link
            href={footerLinkHref}
            className="text-amber-600 hover:text-amber-700 hover:underline font-medium transition-colors"
          >
            {footerLinkText}
          </Link>
        </p>
      )}
    </div>
  );
};
