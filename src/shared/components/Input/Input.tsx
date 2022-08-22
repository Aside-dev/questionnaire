import css from './Input.module.scss'
import { ChangeEvent, FocusEvent } from "react";

type InputProps = {
  placeholder?: string;
  type?: string;
  className?: string;
  value?: string;
  name?: string;
  isError?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

const Input = ({ placeholder, type, className, isError, ...props }: InputProps) => {
  return (
    <input
      className={`
        ${css.root}
        ${isError ? css.root_error : ''}
        ${className}
      `}
      placeholder={placeholder || ''}
      type={type || 'text'}
      {...props}
    />
  )
}

export default Input;