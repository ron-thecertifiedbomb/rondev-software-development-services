import { useState } from 'react';

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: '', email: '', service: '', message: '' };

interface UseContactFormReturn {
  formData: FormData;
  formStatus: FormStatus;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormStatus('success');
        setFormData(INITIAL_FORM);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return { formData, formStatus, setFormData, handleSubmit };
}
