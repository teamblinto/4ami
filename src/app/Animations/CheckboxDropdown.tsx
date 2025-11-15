"use client";

import { Listbox, Transition } from "@headlessui/react";

export interface DropdownOption {
  label: string;
  value: string;
}

interface CheckboxDropdownProps {
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function CheckboxDropdown({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  required = false,
  className = "",
}: CheckboxDropdownProps) {
  const displayLabel = value
    ? options.find((option) => option.value === value)?.label ?? placeholder
    : placeholder;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium leading-6 text-[#6C757D]">
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="flex w-full items-center justify-between rounded-lg border border-[#CED4DA] bg-[#FBFBFB] px-3 py-2 text-left text-sm font-normal text-[#343A40] shadow-sm transition  focus:outline-none">
              <span className={value ? "text-[#343A40]" : "text-[#6C757D]"}>
                {displayLabel}
              </span>
              <svg
                className={`h-4 w-4 text-[#6C757D] transition-transform duration-200 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Listbox.Button>

            <Transition
              show={open}
              as="div"
              leave="transition duration-150 ease-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              enter="transition duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              className="absolute inset-x-0 z-10 mt-1 origin-top"
            >
              <Listbox.Options className="max-h-56 overflow-auto rounded-lg border border-[#E9ECEF] bg-white py-2 text-sm text-[#343A40] shadow-lg outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active }) =>
                      `relative cursor-pointer select-none px-3 py-2 ${
                        active ? "bg-red-50" : ""
                      }`
                    }
                  >
                    {({ selected }) => (
                      <label className="flex w-full cursor-pointer items-center gap-3">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border ${
                            selected
                              ? "border-red-500 bg-red-500"
                              : "border-[#CED4DA] bg-white"
                          }`}
                        >
                          {selected && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>
                        <span className="text-sm text-[#343A40]">{option.label}</span>
                      </label>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}

