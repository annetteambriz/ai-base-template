import { useState, useEffect } from 'react';
import formSchema from '../forms/startupvisa/investtokyo/form_1-3.json';

export interface Question {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'date' | 'number';
  pdfField: string;
  placeholder?: string;
}

export interface FormSchema {
  formName: string;
  pdfTemplate: string;
  questions: Question[];
}

export function useFormSchema() {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setSchema(formSchema as FormSchema);
      setLoading(false);
    } catch (err) {
      setError('Failed to load form schema');
      setLoading(false);
    }
  }, []);

  return {
    schema,
    loading,
    error,
    totalQuestions: schema?.questions.length ?? 0,
  };
} 