import Form from '../../components/Form'
import { ChangeEvent, FocusEvent, useMemo, useState } from "react";
import { formValidators } from '@/helpers/validators'
import { FormData } from '../../types/applicant-form'

const INITIAL_FORM_DATA: FormData = {
  name: '',
  surname: '',
  email: '',
  gender: '',
  file: undefined,
  github: ''
}

const FormContainer = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [formErrors, setFormErrors] = useState(INITIAL_FORM_DATA)
  const formRequiredFields = Object.keys(INITIAL_FORM_DATA).filter(field => !['file', 'github'].includes(field))
  const errorMessageDictionary = {
    empty: 'Поле не должно быть пустым',
    only_letters: 'В имени могут быть только буквы',
    wrong_email: 'Пожалуйста укажите электронную почту'
  }

  /**
   * Указывает не то, что не все обязательные поля заполнены
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
  const validateField = (fieldName: string, fieldValue: string) => {
    let error = ''

    if (['name', 'surname'].includes(fieldName)) {
      const validField = formValidators.name(fieldValue)
      error = validField.message && errorMessageDictionary[validField.message as keyof typeof errorMessageDictionary] || ''
    }

    if (fieldName === 'email') {
      const validField = formValidators.email(fieldValue)
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
  const onChangeFormField = (fieldName: string, event: ChangeEvent<HTMLInputElement>) => {
    const value = fieldName === 'file' ? (event.target.files || [])[0] || undefined : event.target.value

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
    const errors = { ...INITIAL_FORM_DATA }

    Object.keys(formData).forEach(fieldName => {
      errors[fieldName as keyof typeof errors] = validateField(fieldName, formData[fieldName as keyof typeof formData])
    })

    setFormErrors({ ...formErrors, ...errors })
  }

  return (
    <Form
      formData={formData}
      formErrors={formErrors}
      isDisabledSubmit={isEmptyRequiredFields}
      onChangeFormField={onChangeFormField}
      onBlurFormField={onBlurFormField}
      onSubmit={onSubmitForm}
    />
  )
}

export default FormContainer;