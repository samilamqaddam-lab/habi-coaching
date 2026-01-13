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
  requiredMessage?: string
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
  requiredMessage = 'Veuillez remplir ce champ.',
}: FormInputProps) {
  const baseInputStyles =
    'w-full px-4 py-3 text-base rounded-lg border-2 border-soft-gray focus:border-terracotta focus:outline-none transition-colors bg-warm-white text-text-primary disabled:bg-gray-100 disabled:cursor-not-allowed'

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity(requiredMessage)
    } else if (e.target.validity.typeMismatch && type === 'email') {
      e.target.setCustomValidity('Veuillez entrer une adresse email valide.')
    }
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.setCustomValidity('')
  }

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
          onInvalid={handleInvalid}
          onInput={handleInput}
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
          onInvalid={handleInvalid}
          onInput={handleInput}
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
          onInvalid={handleInvalid}
          onInput={handleInput}
          disabled={disabled}
          className={baseInputStyles}
        />
      )}
    </div>
  )
}
