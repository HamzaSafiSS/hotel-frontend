import React, { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  id,
  className = '',
  containerClassName = '',
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wider text-[#18324A]"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#60758B]">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={`w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#18324A] placeholder:text-[#60758B]/60 transition-all duration-200 outline-none
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${
              error
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                : 'border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/30'
            }
            ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}
            ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-[#60758B]">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <span className="text-xs text-red-600 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-[#60758B]">{helperText}</span>
      ) : null}
    </div>
  );
};
