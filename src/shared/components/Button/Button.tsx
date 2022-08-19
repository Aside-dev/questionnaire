import { ReactNode } from 'react';
import css from './Button.module.scss';

type ButtonProps = {
  children: ReactNode;
};

const Button = ({ children }: ButtonProps) => {
  return <div className={css.root}>{children}</div>;
};

export default Button;
