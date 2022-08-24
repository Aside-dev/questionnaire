import css from './ApplicantForm.module.scss'
import Button from '@/components/Button';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import Radio from '@/components/Radio';
import FileInput from '@/components/FileInput'
import { ChangeEvent, FocusEvent } from 'react'
import { TFormData, TFormErrors } from '../../types/applicant-form'
import Modal from "@/components/Modal";
import Checkbox from "@/components/Checkbox";
import PrivacyPolicyModal from '../PrivacyPolicyModal';
import CloseIcon from "@/images/close-blue-24.svg";

type TFormProps = {
  formData: TFormData;
  formErrors: TFormErrors;
  isDisabledSubmit: boolean;
  isShowedSuccessModal: boolean;
  isShowedPrivacyPolicyModal: boolean;
  onChangeFormField: (fieldName: string, event: ChangeEvent<HTMLInputElement>) => void;
  onBlurFormField: (fieldName: string, event: FocusEvent<HTMLInputElement>) => void;
  onCloseSuccessModal: () => void;
  onClosePrivacyPolicyModal: () => void;
  onOpenPrivacyPolicyModal: () => void;
  onClickIAgree: () => void;
  onSubmit: () => void;
};

const ApplicantForm = ({
    formData,
    formErrors,
    isDisabledSubmit,
    isShowedSuccessModal,
    isShowedPrivacyPolicyModal,
    onCloseSuccessModal,
    onClosePrivacyPolicyModal,
    onOpenPrivacyPolicyModal,
    onClickIAgree,
    onChangeFormField,
    onBlurFormField,
    onSubmit
  }: TFormProps) => {
  const privacyPolicyLink = <div>* Я согласен с <button className={css.privacyPolicyLink} onClick={onOpenPrivacyPolicyModal}>политикой конфиденциальности</button></div>
  return (
    <div className={css.root}>
      <header className={css.formHeader}>
        <h1>Анкета соискателя</h1>
      </header>
      <div className={css.section}>
        <div className={css.sectionTitle}>Личные данные</div>
        <div className={css.sectionContent}>
          <FormField
            labelText='Имя *'
            errorText={formErrors.name}
            className={css.inputField}
          >
            <Input
              placeholder='Имя'
              type='text'
              name='name'
              value={formData.name}
              isError={!!formErrors.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeFormField('name', event)}
              onBlur={(event: FocusEvent<HTMLInputElement>) => onBlurFormField('name', event)}
            />
          </FormField>
          <FormField
            labelText='Фамилия *'
            errorText={formErrors.surname}
            className={css.inputField}
          >
            <Input
              placeholder='Фамилия'
              type='text'
              name='surname'
              value={formData.surname}
              isError={!!formErrors.surname}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeFormField('surname', event)}
              onBlur={(event: FocusEvent<HTMLInputElement>) => onBlurFormField('surname', event)}
            />
          </FormField>
          <FormField
            labelText='Электронная почта *'
            errorText={formErrors.email}
            className={css.inputField}
          >
            <Input
              placeholder='Электронная почта'
              type='email'
              name='email'
              value={formData.email}
              isError={!!formErrors.email}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeFormField('email', event)}
              onBlur={(event: FocusEvent<HTMLInputElement>) => onBlurFormField('email', event)}
            />
          </FormField>
          <FormField
            className={css.inputField}
          >
            <FileInput
              buttonText='Загрузить резюме'
              value={formData.file}
              className={css.fileInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeFormField('file', event)}
            />
          </FormField>
        </div>
      </div>
      <div className={`${css.section}`}>
        <div className={css.sectionTitle}>
          Пол * { formErrors.gender && <span className={css.sectionTitleErrorText}>{formErrors.gender}</span> || null }
        </div>
        <div className={css.sectionContent}>
          <div className={css.radioRow}>
            <FormField
              labelText='Мужской'
              labelPosition='right'
              className={css.radioField}
            >
              <Radio
                value='male'
                name='gender'
                onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeFormField('gender', event)}
                checked={formData.gender === 'male'}
              />
            </FormField>
            <FormField
              labelText='Женский'
              labelPosition='right'
              className={css.radioField}
            >
              <Radio
                value='female'
                name='gender'
                onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeFormField('gender', event)}
                checked={formData.gender === 'female'}
              />
            </FormField>
          </div>
        </div>
      </div>
      <div className={css.section}>
        <div className={css.sectionTitle}>Github</div>
        <div className={css.sectionContent}>
          <FormField
            labelText='Вставьте ссылку на Github'
            className={css.inputField}
          >
            <Input
              placeholder='Вставьте ссылку на Github'
              type='text'
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeFormField('github', event)}
            />
          </FormField>
        </div>
      </div>
      <div className={css.section}>
        <div className={css.sectionContent}>
        <FormField
          labelText={privacyPolicyLink}
          labelPosition='right'
          className={css.checkboxField}
        >
          <Checkbox
            checked={formData.privacyPolicy}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeFormField('privacyPolicy', event)}
          />
        </FormField>
        </div>
      </div>
      <Button
        className={css.submitButton}
        onClick={onSubmit}
        disabled={isDisabledSubmit}
      >
        Отправить
      </Button>
      <Modal
        isShowed={isShowedSuccessModal}
        containerClassName={css.modalContainer}
      >
        <button className={css.successModalCloseButton} onClick={onCloseSuccessModal}><CloseIcon /></button>
        <div className={css.successModalTitle}>Спасибо {formData.name}!</div>
        <div className={css.successModalText}>Мы скоро свяжемся с вами</div>
        <Button
          className={css.closeSuccessModal}
          onClick={onCloseSuccessModal}
        >
          Понятно
        </Button>
      </Modal>
      <PrivacyPolicyModal
        isShowed={isShowedPrivacyPolicyModal}
        onClickSubmit={() => onClickIAgree()}
        onClickClose={() => onClosePrivacyPolicyModal()}
      />
    </div>
  )
}

export default ApplicantForm;
