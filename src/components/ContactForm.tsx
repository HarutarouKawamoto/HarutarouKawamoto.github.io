import { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';

interface ContactFormProps {
  formId: string;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  _honeypot: string;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const INITIAL_VALUES: FormValues = { name: '', email: '', phone: '', message: '', _honeypot: '' };

export function ContactForm({ formId }: ContactFormProps) {
  const { t } = useI18n();
  const ct = t.contact;

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!values.name.trim()) newErrors.name = ct.validation.nameRequired;
    if (!values.email.trim()) {
      newErrors.email = ct.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = ct.validation.emailInvalid;
    }
    if (values.phone && !/^[\d\-+() ]+$/.test(values.phone)) {
      newErrors.phone = ct.validation.phoneInvalid;
    }
    if (!values.message.trim()) {
      newErrors.message = ct.validation.messageRequired;
    } else if (values.message.trim().length < 10) {
      newErrors.message = ct.validation.messageTooShort;
    } else if (values.message.trim().length > 2000) {
      newErrors.message = ct.validation.messageTooLong;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values._honeypot) return;
    if (!validate()) return;

    setSubmitState('loading');
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, phone: values.phone, message: values.message }),
      });
      if (!res.ok) throw new Error('送信失敗');
      setSubmitState('success');
      setValues(INITIAL_VALUES);
    } catch {
      setSubmitState('error');
    }
  }

  const inputClass = (field: keyof FormValues) =>
    `w-full rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 ring-1 ${
      errors[field]
        ? 'ring-red-500 dark:ring-red-400 focus-visible:ring-red-500 dark:focus-visible:ring-red-400'
        : 'ring-neutral-950/10 dark:ring-white/10 focus-visible:ring-primary dark:focus-visible:ring-primary-light'
    } focus-visible:outline-none focus-visible:ring-2`;

  if (submitState === 'success') {
    return (
      <p className="text-primary dark:text-primary-light font-[550]">{ct.successMessage}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* honeypot */}
      <input
        type="text"
        name="_honeypot"
        value={values._honeypot}
        onChange={(e) => setValues((v) => ({ ...v, _honeypot: e.target.value }))}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* 名前・メール 横並び */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-neutral-950 dark:text-white">
            {ct.name} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            placeholder={ct.namePlaceholder}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClass('name')}
            maxLength={100}
          />
          {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-950 dark:text-white">
            {ct.email} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            placeholder={ct.emailPlaceholder}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass('email')}
          />
          {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-neutral-950 dark:text-white">
          {ct.phone}
        </label>
        <input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          placeholder={ct.phonePlaceholder}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className={inputClass('phone')}
        />
        {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-neutral-950 dark:text-white">
          {ct.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          placeholder={ct.messagePlaceholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputClass('message')} resize-y`}
        />
        {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
      </div>

      {submitState === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">{ct.errorMessage}</p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitState === 'loading'}
          className="rounded-full bg-primary px-8 py-2.5 text-sm font-[550] text-white transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-light dark:hover:bg-primary dark:focus-visible:ring-primary-light dark:focus-visible:ring-offset-neutral-950"
        >
          {submitState === 'loading' ? ct.submitting : ct.submit}
        </button>
      </div>
    </form>
  );
}
