"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react"; // Close icon
import React from "react";
import { Button } from "@heroui/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer: boolean;
  children: React.ReactNode;
};

export default function ModalComponent({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button
            onPress={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Modal Body */}
        <div className="mt-4">{children}</div>

        {/* Modal Footer */}
        {footer && (
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Confirm
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
