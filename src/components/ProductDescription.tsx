"use client";

import { useState } from "react";

type ProductDescriptionProps = {
  title: string;
  description: string;
};

export default function ProductDescription({
  title,
  description,
}: ProductDescriptionProps) {
  const [open, setOpen] = useState(false);
  if (!description) return null;

  return (
    <div className="border-b py-4">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className="font-medium">{title}</h3>
        <div
          className={`transform transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {open && (
        <div
          className="space-y-3 mt-4 flex flex-col gap-2 text-gray-500 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:p-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}
