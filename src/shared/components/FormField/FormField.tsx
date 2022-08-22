import css from './FormField.module.scss'
import { ReactNode } from 'react';

type FormFieldProps = {
  labelText?: string;
  errorText?: string;
  labelPosition?: string;
  children: ReactNode;
  className?: string;
};

const FormField = ({ labelText, errorText, children, className, labelPosition }: FormFieldProps) => {

  const renderWithLabel = () => {
    if (labelPosition === 'right') {
      return (
        <label className={css.labelRight}>
          {children}
          <span className={`${css.labelText} ${css.labelTextRight}`}>{labelText}</span>
        </label>
      )
    }

    return (
      <label>
        <div className={css.labelText}>{labelText}</div>
        {children}
      </label>
    )
  }

  return (
    <div className={className}>
      {
        labelText && renderWithLabel() || children
      }
      {
        errorText && <div className={css.error}>{errorText}</div> || null
      }
    </div>
  )
}

export default FormField;