import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * Luxury Custom Dropdown Component (Pro-Partner Design System)
 * Replaces native OS <select> with a branded obsidian-warm titanium dropdown.
 * Retains 100% compatibility with FormData, form submission, and HTML5 validation.
 */
export default function CustomSelect({
  name,
  options = [],
  placeholder = "Select an option",
  required = false,
  defaultValue = "",
  value: controlledValue,
  onChange,
  className = "",
  disabled = false,
}) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(
    isControlled ? controlledValue : defaultValue || ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const nativeSelectRef = useRef(null);
  const listboxRef = useRef(null);

  const currentValue = isControlled ? controlledValue : internalValue;

  // Normalize options into { value, label } format
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }
    return {
      value: opt.value ?? opt.label,
      label: opt.label ?? opt.value,
    };
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === currentValue);

  // Sync internal value if controlledValue updates
  useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
    }
  }, [isControlled, controlledValue]);

  // Sync native select value & validity
  useEffect(() => {
    if (nativeSelectRef.current) {
      nativeSelectRef.current.value = currentValue;
      if (required && !currentValue) {
        nativeSelectRef.current.setCustomValidity("Please select an option.");
      } else {
        nativeSelectRef.current.setCustomValidity("");
        setIsInvalid(false);
      }
    }
  }, [currentValue, required]);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (optionValue) => {
      if (!isControlled) {
        setInternalValue(optionValue);
      }
      setIsInvalid(false);
      setIsOpen(false);

      if (nativeSelectRef.current) {
        nativeSelectRef.current.value = optionValue;
        nativeSelectRef.current.setCustomValidity("");
        // Dispatch synthetic change event for form listeners
        const event = new Event("change", { bubbles: true });
        nativeSelectRef.current.dispatchEvent(event);
      }

      if (onChange) {
        onChange(optionValue);
      }

      triggerRef.current?.focus();
    },
    [isControlled, onChange]
  );

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      const idx = normalizedOptions.findIndex((opt) => opt.value === currentValue);
      setFocusedIndex(idx >= 0 ? idx : 0);
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) => (prev + 1) % normalizedOptions.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(normalizedOptions.length - 1);
      } else {
        setFocusedIndex((prev) => (prev - 1 + normalizedOptions.length) % normalizedOptions.length);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isOpen) {
        if (focusedIndex >= 0 && focusedIndex < normalizedOptions.length) {
          handleSelect(normalizedOptions[focusedIndex].value);
        }
      } else {
        setIsOpen(true);
      }
    } else if (e.key === "Tab") {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  // Keep focused item visible in scrollbox
  useEffect(() => {
    if (isOpen && listboxRef.current && focusedIndex >= 0) {
      const items = listboxRef.current.querySelectorAll(".gz-custom-select-option");
      if (items[focusedIndex]) {
        items[focusedIndex].scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen, focusedIndex]);

  return (
    <div
      ref={containerRef}
      className={`gz-custom-select-wrap ${className}${isOpen ? " is-open" : ""}${isInvalid ? " is-invalid" : ""}${disabled ? " is-disabled" : ""}`}
    >
      {/* Accessible, Screen-Reader Friendly Native Select for FormData and native validation */}
      <select
        ref={nativeSelectRef}
        name={name}
        required={required}
        value={currentValue}
        onChange={(e) => handleSelect(e.target.value)}
        onInvalid={(e) => {
          setIsInvalid(true);
          triggerRef.current?.focus();
        }}
        tabIndex={-1}
        aria-hidden="true"
        className="gz-custom-select-native"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {normalizedOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Styled Interactive Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className="gz-custom-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`gz-custom-select-value${!selectedOption ? " is-placeholder" : ""}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Branded Chevron Icon */}
        <span className="gz-custom-select-arrow" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Luxury Floating Options Menu */}
      {isOpen && (
        <div
          ref={listboxRef}
          role="listbox"
          tabIndex={-1}
          className="gz-custom-select-menu"
        >
          {normalizedOptions.map((opt, index) => {
            const isSelected = opt.value === currentValue;
            const isKeyboardFocused = index === focusedIndex;

            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`gz-custom-select-option${isSelected ? " is-selected" : ""}${isKeyboardFocused ? " is-focused" : ""}`}
              >
                <span className="gz-custom-select-option-text">{opt.label}</span>
                {isSelected && (
                  <span className="gz-custom-select-check" aria-hidden="true">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

