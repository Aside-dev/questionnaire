export type TFormData = {
  name: string;
  surname: string;
  email: string;
  gender: string;
  file: File | undefined;
  github: string;
}

export type TFormErrors = {
  name: string;
  surname: string;
  email: string;
  gender: string;
  file: string;
  github: string;
}