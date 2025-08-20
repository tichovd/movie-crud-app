import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type DropDownProps<T extends string | number> = {
  options: T[];
  value: T | "";
  onChange: (value: T | "") => void;
  display?: (option: T | "") => string;
  label?: string;
  className?: string;
  disableAllOption?: boolean;
};

/**
 * A reusable dropdown component.
 *
 * @template T extends string | number
 * @param {Object} props
 * @param {T[]} props.options - Selectable options
 * @param {T | ""} props.value - Currently selected value
 * @param {(value: T | "") => void} props.onChange - Callback when a value is selected
 * @param {(option: T | "") => string} [props.display] - Function to display each option
 * @param {string} [props.label] - Optional label before the dropdown value
 * @param {string} [props.className]
 * @param {boolean} [props.disableAllOption] - If true, the "All" option is not shown.
 * @returns {JSX.Element}
 */
export default function DropDown<T extends string | number>({
  options,
  value,
  onChange,
  display = (option) => (option === "" ? "All" : String(option)),
  label = "",
  className = "",
  disableAllOption = false,
}: DropDownProps<T>) {
  return (
    <div className={`relative inline-block text-left ${className}`}>
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50">
            {label} {display(value)}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-400"
            />
          </MenuButton>
        </div>
        <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {!disableAllOption && (
              <MenuItem>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? "bg-gray-100" : ""
                    } w-full text-left px-4 py-2 text-sm ${
                      value === "" ? "font-semibold" : ""
                    }`}
                    onClick={() => onChange("")}
                  >
                    {display("")}
                  </button>
                )}
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem key={option}>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? "bg-gray-100" : ""
                    } w-full text-left px-4 py-2 text-sm ${
                      value === option ? "font-semibold" : ""
                    }`}
                    onClick={() => onChange(option)}
                  >
                    {display(option)}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
