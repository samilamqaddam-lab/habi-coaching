import React from 'react'

interface FormInputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  rows?: number
  value?: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void
  disabled?: boolean
}

export default function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  options = [],
  rows = 4,
  value,
  onChange,
  disabled = false,
}: FormInputProps) {
  const baseInputStyles =
    'w-full px-4 py-3 text-base rounded-lg border-2 border-soft-gray focus:border-terracotta focus:outline-none transition-colors bg-warm-white text-text-primary disabled:bg-gray-100 disabled:cursor-not-allowed'

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-text-primary mb-2">
        {label}
        {required && <span className="text-terracotta ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseInputStyles} resize-none`}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={baseInputStyles}
        >
          <option value="">Sélectionnez une option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={baseInputStyles}
        />
      )}
    </div>
  )
}
