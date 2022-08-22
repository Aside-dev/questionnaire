import { ChangeEvent, MouseEvent, RefObject, useRef } from 'react';
import css from './FileInput.module.scss';
import PaperClipIcon from '@/images/paper-clip.svg'
import CloseIcon from '@/images/close.svg'

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  buttonText: string;
  value?: File | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = ({ className, buttonText, value, ...props }: ButtonProps) => {
  const hiddenFileInput: RefObject<HTMLInputElement> = useRef(null);

  const onClickUploadFile = () => {
    hiddenFileInput?.current?.click();
  }

  const onClickResetFile = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    // hiddenFileInput.current.target = ''
  }

  return (
    <div className={className}>
      {
        !value && <div className={css.uploadButton} onClick={onClickUploadFile}>{buttonText}</div> || null
      }
      {
        value && (
          <div className={css.labelButton} onClick={onClickUploadFile}>
            <div className={css.label}>
              <PaperClipIcon className={css.paperClipIcon} />
              <div className={css.labelText}>{value.name}</div>
            </div>
            <button className={css.resetBtn} onClick={onClickResetFile}><CloseIcon /></button>
          </div>
        )
      }
      <input
        type='file'
        ref={hiddenFileInput}
        className={css.input}
        {...props}
      />
    </div>
  );
};

export default FileInput;
