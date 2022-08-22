const ONLY_LETTERS_REGEX = /^[а-яА-Яa-zA-Z]+$/
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const name = (value: string) => {
  let message = ''

  if (!value) {
    message = 'empty'
  } else if (!ONLY_LETTERS_REGEX.test(value)) {
    message = 'only_letters'
  } else {
    message = ''
  }

  return {
    valid: !message,
    message
  }
}

export const email = (value: string) => {
  let message = ''

  if (!value) {
    message = 'empty'
  } else if (!EMAIL_REGEX.test(value)) {
    message = 'wrong_email'
  } else {
    message = ''
  }

  return {
    valid: !message,
    message
  }
}