import ApplicantForm from '../../components/ApplicantForm'
import { ChangeEvent, FocusEvent, useMemo, useState } from "react";
import { formValidators } from '@/helpers/validators'
import { TFormData, TFormErrors } from '../../types/applicant-form'

const axios = require('axios').default;

const INITIAL_FORM_DATA: TFormData = {
  name: '',
  surname: '',
  email: '',
  gender: '',
  file: undefined,
  github: '',
  privacyPolicy: false
}

const INITIAL_FORM_ERRORS: TFormErrors = {
  name: '',
  surname: '',
  email: '',
  gender: '',
  file: '',
  github: ''
}

const ApplicantFormContainer = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [formErrors, setFormErrors] = useState(INITIAL_FORM_ERRORS)
  const [isShowedSuccessModal, setIsShowedSuccessModal] = useState(false)
  const [isShowedPrivacyPolicyModal, setIsShowedPrivacyPolicyModal] = useState(false)
  const formRequiredFields = Object.keys(INITIAL_FORM_DATA).filter(field => !['file', 'github'].includes(field))
  const errorMessageDictionary = {
    empty: 'Поле не должно быть пустым',
    only_letters: 'В имени могут быть только буквы',
    wrong_email: 'Пожалуйста укажите электронную почту'
  }

  /**
   * Указывает на то, что не все обязательные поля заполнены
   */
  const isEmptyRequiredFields: boolean = useMemo(() => {
    const filledFields = formRequiredFields.filter((fieldName) => {
      return !!formData[fieldName as keyof typeof formData]
    })

    return filledFields.length !== formRequiredFields.length
  }, [formRequiredFields, formData])

  /**
   * Валидация полей формы
   * @param fieldName - имя поля
   * @param fieldValue - имя поля
   */
  const validateField = (fieldName: string, fieldValue: string | undefined) => {
    let error = ''

    if (['name', 'surname'].includes(fieldName)) {
      const validField = formValidators.name(fieldValue || '')
      error = validField.message && errorMessageDictionary[validField.message as keyof typeof errorMessageDictionary] || ''
    }

    if (fieldName === 'email') {
      const validField = formValidators.email(fieldValue || '')
      error = validField.message && errorMessageDictionary[validField.message as keyof typeof errorMessageDictionary] || ''
    }

    if (fieldName === 'gender') {
      error = !fieldValue && 'укажите пол' || ''
    }

    return error;
  }

  /**
   * Событие изменения значения полей формы
   * @param fieldName - имя поля
   * @param event - объект ивента
   */
  const onChangeFormField = (fieldName: string, event?: ChangeEvent<HTMLInputElement>) => {
    let value;

    if (fieldName === 'file') {
      value = (event?.target.files || [])[0] || undefined
    } else if (fieldName === 'privacyPolicy') {
      value = !formData.privacyPolicy
    } else {
      value = event?.target.value
    }

    setFormData({ ...formData, [fieldName]: value })
    setFormErrors({ ...formErrors, [fieldName]: '' })
  }

  /**
   * Событие блюра на поле формы
   * @param fieldName - имя поля
   * @param event - объект ивента
   */
  const onBlurFormField = (fieldName: string, event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value

    setFormErrors({ ...formErrors, [fieldName]: validateField(fieldName, value) })
  }

  /**
   * Событие отправки формы
   */
  const onSubmitForm = () => {
    const errors = { ...INITIAL_FORM_ERRORS }
    const reqFormData = new FormData()

    Object.keys(formData).forEach((fieldName: string) => {

      // @ts-ignore
      errors[fieldName as keyof typeof errors] = validateField(fieldName, formData[fieldName as keyof typeof formData])
      // @ts-ignore
      reqFormData.append(fieldName, formData[fieldName as keyof typeof formData])
    })

    setFormErrors({ ...formErrors, ...errors })

    if (Object.values(errors).filter(error => !!error).length) {
      return null
    }

    axios.post('/api/applicant-form', reqFormData).then(() => {
      setIsShowedSuccessModal(true)
    })
  }

  const onCloseSuccessModal = () => {
    setIsShowedSuccessModal(false)
    setFormData(INITIAL_FORM_DATA)
    setFormErrors(INITIAL_FORM_ERRORS)
  }

  const onClickIAgree = () => {
    setFormData({ ...formData, privacyPolicy: true })
    setIsShowedPrivacyPolicyModal(false)
  }

  const onOpenPrivacyPolicyModal = () => {
    setIsShowedPrivacyPolicyModal(true)
  }

  const onClosePrivacyPolicyModal = () => {
    setIsShowedPrivacyPolicyModal(false)
  }

  return (
    <ApplicantForm
      formData={formData}
      formErrors={formErrors}
      isShowedSuccessModal={isShowedSuccessModal}
      isDisabledSubmit={isEmptyRequiredFields}
      isShowedPrivacyPolicyModal={isShowedPrivacyPolicyModal}
      onClickIAgree={onClickIAgree}
      onOpenPrivacyPolicyModal={onOpenPrivacyPolicyModal}
      onClosePrivacyPolicyModal={onClosePrivacyPolicyModal}
      onCloseSuccessModal={onCloseSuccessModal}
      onChangeFormField={onChangeFormField}
      onBlurFormField={onBlurFormField}
      onSubmit={onSubmitForm}
    />
  )
}

export default ApplicantFormContainer;
