import { ChangeEvent } from "react";
import css from './Radio.module.scss';

type RadioProps = {
  className?: string;
  value?: string;
  name?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Radio = ({ className, ...props }: RadioProps) => {
  return (
    <input
      type="radio"
      className={`${css.root} ${className}`}
      {...props}
    />
  );
};

export default Radio;
