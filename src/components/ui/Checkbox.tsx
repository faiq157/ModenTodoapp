import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, className = '', ...props }, ref) => {
    return (
      <div className={`flex items-center ${className}`}>
        <input
          id={id}
          type="checkbox"
          ref={ref}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0 transition-colors cursor-pointer"
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className="ml-2 block text-sm text-foreground cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;