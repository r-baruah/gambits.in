'use client';

import React, { useState } from 'react';

interface EmailCaptureProps {
  ctaText: string;
  formAction: string;
}

interface FormState {
  email: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ ctaText, formAction }) => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, isSubmitting: true, error: null }));

    if (!formState.email) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: 'Email is required',
      }));
      return;
    }

    if (!validateEmail(formState.email)) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: 'Please enter a valid email address',
      }));
      return;
    }

    try {
      const response = await fetch(formAction, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: formState.email }),
      });

      if (response.ok) {
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          isSubmitted: true,
          email: '',
        }));
      } else {
        const data = await response.json().catch(() => ({}));
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: data.error || 'Something went wrong. Try again.',
        }));
      }
    } catch {
      if (!formAction || formAction === '#') {
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          isSubmitted: true,
          email: '',
        }));
        return;
      }

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: 'Network error. Try again later.',
      }));
    }
  };

  return (
    <>
      {!formState.isSubmitted ? (
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="flex flex-col gap-2">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className={`input-field w-full ${formState.error ? 'border-error focus:ring-1 focus:ring-error' : ''}`}
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    email: e.target.value,
                    error: null,
                  }))
                }
                disabled={formState.isSubmitting}
                aria-label="Email address"
                aria-invalid={!!formState.error}
              />
              {formState.error && (
                <p className="error-text animate-slide-up" role="alert">
                  {formState.error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed tracking-wider text-sm uppercase"
            >
              {formState.isSubmitting ? 'Sending...' : ctaText}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-center p-8 bg-secondary/80 border-l-2 border-accent clip-angled w-full max-w-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent/20"></div>
          <p className="text-foreground text-xl font-bold uppercase tracking-wider mb-2">
            You&apos;re in.
          </p>
          <p className="text-muted text-sm mb-6 font-mono">
            // AUTHORIZATION GRANTED. AWAITING SIGNAL.
          </p>
          <button
            onClick={() =>
              setFormState((prev) => ({ ...prev, isSubmitted: false }))
            }
            className="text-xs font-mono text-accent hover:text-accent-hover transition-colors uppercase tracking-widest border-b border-accent/30 pb-1"
          >
            [ NEW CONNECTION ]
          </button>
        </div>
      )}
    </>
  );
};

export default EmailCapture;
