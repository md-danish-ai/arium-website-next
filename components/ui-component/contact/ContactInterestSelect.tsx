"use client";

import React, { useState, useRef, useEffect } from "react";
import { Typography } from "@ui-element";
import { DropdownArrowSvg } from "@ui-svg";
import type { ContactTopicOption } from "@data/contact.data";

export interface ContactInterestSelectProps {
  options: ContactTopicOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export default function ContactInterestSelect({
  options,
  value,
  onChange,
  error,
  disabled = false,
}: ContactInterestSelectProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setFocusedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setDropdownOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!dropdownOpen) {
        setDropdownOpen(true);
        const idx = options.findIndex((opt) => opt.value === value);
        setFocusedIndex(idx >= 0 ? idx : 0);
      } else {
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex].value);
        } else {
          setDropdownOpen(false);
        }
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
      setFocusedIndex(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!dropdownOpen) {
        setDropdownOpen(true);
        const idx = options.findIndex((opt) => opt.value === value);
        setFocusedIndex(idx >= 0 ? idx : 0);
      } else {
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (dropdownOpen) {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }
  };

  const selectedOption = options.find((opt) => opt.value === value);

  const borderClass = error
    ? "border-red-500 ring-2 ring-red-500/20"
    : dropdownOpen
      ? "border-[#00e8d9] ring-2 ring-[#00e8d9]/20"
      : "border-[#162047]/40 hover:border-[#162047]/35";

  return (
    <div className="flex flex-col gap-2 mb-5">
      <Typography
        variant="b4"
        as="label"
        uppercase
        weight="medium"
        htmlFor="interest-wrapper"
        id="interest-label"
        className="tracking-[0.06em] text-[#162047]/85 leading-relaxed cursor-pointer"
        onClick={() => wrapperRef.current?.focus()}
      >
        Who are you reaching out to? <span className="text-red-600">*</span>
      </Typography>

      <div
        ref={wrapperRef}
        className="relative w-full"
        id="interest-wrapper"
        role="combobox"
        aria-expanded={dropdownOpen}
        aria-haspopup="listbox"
        aria-controls={dropdownOpen ? "interest-listbox" : undefined}
        aria-labelledby="interest-label"
        onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
      >
        <div
          className={`w-full bg-transparent border-[1.5px] ${borderClass} rounded-[10px] px-[18px] py-[15px] flex items-center justify-between cursor-pointer transition-all duration-300 ease-out outline-none`}
        >
          <span
            className={`text-xs ${value ? "text-[#162047] text-[0.95rem]" : "text-[#162047]/50"}`}
          >
            {selectedOption ? selectedOption.label : "Please select one of the following options"}
          </span>
          <DropdownArrowSvg isOpen={dropdownOpen} />
        </div>

        {dropdownOpen && (
          <ul
            className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border-[1.5px] border-[#162047]/15 rounded-[10px] shadow-[0_12px_32px_rgba(22,32,71,0.1)] overflow-hidden z-20 py-1 max-h-[240px] overflow-y-auto"
            role="listbox"
            id="interest-listbox"
          >
            {options.map((option, index) => {
              const isSelected = value === option.value;
              const isFocused = focusedIndex === index;

              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  className={`px-[18px] py-3 text-[0.95rem] text-[#162047]/80 cursor-pointer transition-colors duration-200 hover:bg-[#00e8d9]/10 hover:text-[#162047] ${
                    isSelected ? "bg-[#00e8d9]/15 text-[#162047] font-medium" : ""
                  } ${isFocused ? "bg-[#00e8d9]/10 text-[#162047]" : ""}`}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelect(option.value);
                  }}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && <p className="text-red-600 text-xs mt-1 font-body leading-tight">{error}</p>}
    </div>
  );
}
