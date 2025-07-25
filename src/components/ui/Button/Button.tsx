export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const baseClass =
    'inline-flex items-center justify-center rounded-lg text-white font-semibold';
  const sizeClass = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  const modeClass = primary
    ? 'bg-blue-500 hover:bg-blue-600'
    : 'bg-gray-500 hover:bg-gray-600';

  return (
    <button
      type="button"
      className={`${baseClass} ${sizeClass[size]} ${modeClass}`}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
