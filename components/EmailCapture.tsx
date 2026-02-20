'use client';

import React, { useState } from 'react';
import { playClack, playSlam } from '@/utils/audio';
import { GlitchOverlay } from './GlitchOverlay';

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
  const [isFlashing, setIsFlashing] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, email: e.target.value, error: null }));
    // A sharp piece clack on every keystroke
    playClack();
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

    // Trigger the WOW cinematic sequence
    setIsFlashing(true);
    playSlam();

    try {
      const response = await fetch(formAction, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: formState.email }),
      });

      if (response.ok) {
        setTimeout(() => {
          setFormState((prev) => ({
            ...prev,
            isSubmitting: false,
            isSubmitted: true,
            email: '',
          }));
        }, 1500); // Wait for sequence
      } else {
        const data = await response.json().catch(() => ({}));
        setTimeout(() => {
          setFormState((prev) => ({
            ...prev,
            isSubmitting: false,
            error: data.error || 'Something went wrong. Please try again.',
          }));
        }, 1500);
      }
    } catch (err) {
      if (!formAction || formAction === '#') {
        setTimeout(() => {
          setFormState((prev) => ({
            ...prev,
            isSubmitting: false,
            isSubmitted: true,
            email: '',
          }));
        }, 1500);
        return;
      }

      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: 'Network error. Please try again later.',
        }));
      }, 1500);
    }
  };

  return (
    <>
      <GlitchOverlay active={isFlashing} onComplete={() => setIsFlashing(false)} />

      {!formState.isSubmitted ? (
        <div className={`w-full max-w-md mx-auto transition-opacity duration-300 ${isFlashing ? 'opacity-0' : 'opacity-100'}`}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="flex flex-col gap-2">
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`input-field w-full ${formState.error ? 'border-error focus:ring-error' : ''}`}
                  value={formState.email}
                  onChange={handleType}
                  disabled={formState.isSubmitting}
                  aria-label="Email address"
                  aria-invalid={!!formState.error}
                />
              </div>
              {formState.error && (
                <p className="error-text animate-slide-up" role="alert">{formState.error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
              onMouseEnter={() => playClack()}
            >
              {formState.isSubmitting ? 'Verifying Sacrifice...' : ctaText}
            </button>
          </form>
          <p className="text-xs text-muted/70 text-center mt-4">
            A confirmation clack means the piece moves.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-lg border border-success/20 animate-fade-in w-full max-w-md mx-auto">
          <div className="text-accent text-2xl font-bold mb-2 tracking-widest uppercase">Checkmate.</div>
          <p className="text-muted/80 text-center text-sm md:text-base mb-4">
            Your sacrifice was historically sound. The arbiter expects you.
          </p>
          <button
            onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
            className="mt-4 text-xs font-mono text-muted hover:text-white transition-colors underline"
          >
            initiate_new()
          </button>
        </div>
      )}
    </>
  );
};

export default EmailCapture;
