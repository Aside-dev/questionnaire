import { ApplicantFormContainer } from '@/features/applicant-form'

export default function Home() {
  return (
    <>
      <div className='container'>
        <ApplicantFormContainer />
      </div>
      <div id="modal-root" />
    </>
  );
}
