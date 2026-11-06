import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  /** 'dark' = for use on dark (ink) backgrounds */
  variant?: 'light' | 'dark';
  className?: string;
}

/** Goes to the previous page; if the visitor landed here directly it falls back to Home. */
export const BackButton: React.FC<BackButtonProps> = ({ variant = 'light', className = '' }) => {
  const navigate = useNavigate();

  const goBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (idx > 0) navigate(-1);
    else navigate('/');
  };

  const styles =
    variant === 'dark'
      ? 'border-white/20 bg-white/5 text-surface hover:border-white/60 hover:bg-white/10'
      : 'border-line bg-surface text-ink hover:border-ink';

  return (
    <button
      type="button"
      onClick={goBack}
      className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-heading font-medium transition-colors ${styles} ${className}`}
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
      Back
    </button>
  );
};
