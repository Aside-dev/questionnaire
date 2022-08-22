import { ReactNode } from 'react';
import css from './Button.module.scss';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`${css.root} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
