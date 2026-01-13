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
  error?: string
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
  error,
}: FormInputProps) {
  const baseInputStyles = `w-full px-4 py-3 text-base rounded-lg border-2 focus:outline-none transition-colors bg-warm-white text-text-primary disabled:bg-gray-100 disabled:cursor-not-allowed ${
    error ? 'border-red-500 focus:border-red-500' : 'border-soft-gray focus:border-terracotta'
  }`

  const handleInvalidTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    if (target.validity.valueMissing) {
      target.setCustomValidity(requiredMessage)
    }
  }

  const handleInvalidSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement
    if (target.validity.valueMissing) {
      target.setCustomValidity(requiredMessage)
    }
  }

  const handleInvalidInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (target.validity.valueMissing) {
      target.setCustomValidity(requiredMessage)
    } else if (target.validity.typeMismatch && type === 'email') {
      target.setCustomValidity('Veuillez entrer une adresse email valide.')
    }
  }

  const handleInputTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.setCustomValidity('')
  }

  const handleInputSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    e.currentTarget.setCustomValidity('')
  }

  const handleInputInput = (e: React.FormEvent<HTMLInputElement>) => {
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
          onInvalid={handleInvalidTextarea}
          onInput={handleInputTextarea}
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
          onInvalid={handleInvalidSelect}
          onInput={handleInputSelect}
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
          onInvalid={handleInvalidInput}
          onInput={handleInputInput}
          disabled={disabled}
          className={baseInputStyles}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
