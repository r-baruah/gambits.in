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
    // Simple RFC 5322 compliant-ish regex for basic validation
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

    // Since we are using Formspree or similar standard HTML form actions, 
    // strictly speaking we would just let the form submit natively if we weren't doing 
    // AJAX. But "Single Page Application" implies we might want to stay on page.
    // However, the requirement says "HTML5 form with Formspree integration" and "standard HTML form structure".
    // Usually Formspree redirects you to a thank you page unless you use AJAX.
    // I will simulate the "AJAX" submission for the UI experience, but keeping the form capable.
    // Actually, if we use standard action, we can just submit the form via ref or let default happen if valid.
    
    // For this implementation, I'll use fetch to submit to the action URL to keep it SPA-like.
    
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
          error: data.error || 'Something went wrong. Please try again.',
        }));
      }
    } catch (err) {
      // If the action is empty or invalid in dev, we might just mock success for the UI demo
      if (!formAction || formAction === '#') {
         // Mock success for demo purposes if no real backend
         setTimeout(() => {
             setFormState((prev) => ({
              ...prev,
              isSubmitting: false,
              isSubmitted: true,
              email: '',
            }));
         }, 1000);
         return;
      }

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: 'Network error. Please try again later.',
      }));
    }
  };

  if (formState.isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-lg border border-success/20 animate-fade-in">
        <div className="text-success text-xl font-semibold mb-2">Checkmate!</div>
        <p className="text-muted text-center">
          You've successfully joined the waitlist. We'll be in touch soon.
        </p>
        <button 
          onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
          className="mt-4 text-sm text-muted hover:text-white transition-colors underline"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`input-field w-full ${formState.error ? 'border-error focus:ring-error' : ''}`}
              value={formState.email}
              onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value, error: null }))}
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
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState.isSubmitting ? 'Sacrificing...' : ctaText}
        </button>
      </form>
      <p className="text-xs text-muted text-center mt-4">
        Join the queue. No spam, just gambits.
      </p>
    </div>
  );
};

export default EmailCapture;
