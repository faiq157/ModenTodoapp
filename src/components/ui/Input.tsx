import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, errorMessage, fullWidth = true, className = '', ...props }, ref) => {
    const inputClasses = `px-4 py-2 rounded-md border ${
      error ? 'border-error focus:ring-error' : 'border-border focus:ring-primary'
    } bg-background focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${fullWidth ? 'w-full' : ''}`;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} space-y-1 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          aria-invalid={error}
          aria-describedby={`${props.id}-description`}
          {...props}
        />
        {(helperText || (error && errorMessage)) && (
          <p
            id={`${props.id}-description`}
            className={`text-xs ${error ? 'text-error' : 'text-muted'}`}
          >
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;