import React from 'react';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'gold';

interface AdminBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const AdminBadge: React.FC<AdminBadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'sm',
  dot = true,
}) => {
  const styles: Record<BadgeVariant, { bg: string; text: string; dot: string; border: string }> = {
    success: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      border: 'border-emerald-200',
    },
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
      border: 'border-amber-200',
    },
    danger: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      dot: 'bg-rose-500',
      border: 'border-rose-200',
    },
    info: {
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      dot: 'bg-sky-500',
      border: 'border-sky-200',
    },
    neutral: {
      bg: 'bg-slate-50',
      text: 'text-slate-600',
      dot: 'bg-slate-400',
      border: 'border-slate-200',
    },
    gold: {
      bg: 'bg-[#F9F5EC]',
      text: 'text-[#9A7B44]',
      dot: 'bg-[#C7A66B]',
      border: 'border-[#E5D7B7]',
    },
  };

  const current = styles[variant] || styles.neutral;
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${current.bg} ${current.text} ${current.border} ${sizeClasses}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dot}`} />}
      <span>{label}</span>
    </span>
  );
};
