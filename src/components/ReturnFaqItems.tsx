"use client";

import { useState } from "react";

type ReturnFaqItemsProps = {
  question: string;
  emoji?: string;
  answer: React.ReactNode;
  isLast?: boolean;
};

export default function ReturnFaqItems({ question, emoji, answer,isLast = false  }: ReturnFaqItemsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${isLast ? '' : 'border-b'} py-4 w-full`}>
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className="font-medium flex items-center gap-2">
          {emoji && <span className="text-xl">{emoji}</span>}
          {question}
        </h3>
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
        <div className="mt-4 px-10 text-gray-600 space-y-2">
          {typeof answer === 'string' ? (
            <p>{answer}</p>
          ) : (
            answer
          )}
        </div>
      )}
    </div>
  );
}