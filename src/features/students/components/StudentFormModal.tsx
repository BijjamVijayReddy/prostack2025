"use client";

import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StudentForm } from "./StudentForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function StudentFormModal({ open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl">
          
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              New Student
            </Dialog.Title>

            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
              title="Close"
            >
              <XMarkIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>

          <StudentForm
            onSubmit={(data) => {
              console.log("NEW STUDENT:", data);
              onClose();
            }}
            // onCancel={onClose}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
