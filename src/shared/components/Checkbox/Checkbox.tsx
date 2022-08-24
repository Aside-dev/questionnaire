import { ChangeEvent } from 'react';
import css from './Checkbox.module.scss';
import CheckWhiteIcon from '@/images/check-white.svg';

type RadioProps = {
  className?: string;
  value?: string;
  name?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ className, checked, ...props }: RadioProps) => {
  return (
    <span className={css.root}>
      <input
        type='checkbox'
        className={`${css.input} ${className}`}
        checked={checked}
        {...props}
      />
      <CheckWhiteIcon className={css.checkIcon} />
    </span>
  );
};

export default Checkbox;
