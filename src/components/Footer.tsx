import { FC, useState } from 'react';

import { StyledFooter } from '../styles/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Field, Form, Formik } from 'formik';
import { ContactUsModal } from '../styles/components/ContactUsModal';
import { Close } from '../assets/svg';
import { useContactFormMutation, useGetEventsQuery } from '../services/auth';
import * as Yup from 'yup';
import { useToaster } from '../hooks/useToaster';

const ContactFormShema = Yup.object().shape({
  name: Yup.string().required('Required.'),
  email: Yup.string().email(),
  message: Yup.string().required('Required.'),
});

export const Footer: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { toastTrigger, ToastAnchor } = useToaster();

  const handleErrors = (error: any) => {
    if (error?.response?.status === 422) {
      toastTrigger({
        message: `${
          error?.data?.detail[0].msg ? error?.data?.detail[0].msg : 'Something went wrong, please try again later'
        }`,
        type: 'error',
      });
    } else {
      toastTrigger({
        message: `${
          typeof error?.data?.detail == 'string' ? error?.data?.detail : 'Something went wrong, please try again later'
        }`,
        type: 'error',
      });
    }
  };

  const handleSelectSizesModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const [submitForm] = useContactFormMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const handleSubmitForm = async (values: any) => {
    try {
      await submitForm({
        email: values.email,
        name: values.name,
        message: values.message,
      }).unwrap();

      setIsOpenModal(!isOpenModal);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrors(error);
    }
  };

  const { data: allEvents } = useGetEventsQuery();

  return (
    <StyledFooter>
      <div className="links-container">
        <img src={allEvents?.items[0]?.brand_logo_url} className="logo" alt="logo" />

        <div className="web-links">
          <Button flat textButton type="button" onClick={handleSelectSizesModal}>
            Contact Us
          </Button>
          {/* <Link to="/">My Account</Link> */}
        </div>
      </div>
      <div className="bottom-container">
        <span>© ALL RIGHTS RESERVED</span>
        <div>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>

      <ContactUsModal
        isOpen={isOpenModal}
        onBackgroundClick={handleSelectSizesModal}
        onEscapeKeydown={handleSelectSizesModal}
      >
        <h2>contact us</h2>
        <button className="close-button" onClick={handleSelectSizesModal}>
          <Close />
        </button>
        <Formik
          initialValues={{ email: '', name: '', message: '' }}
          validationSchema={ContactFormShema}
          onSubmit={() => console.log('submit')}
        >
          {({ values, errors }) => (
            <Form className="form">
              <div className="label-wrapper">
                <p className="label">name</p>
                {errors.name && <p className="error">Name is required</p>}
              </div>
              <Field name="name" type="text" className="input-text" placeholder="Name" />

              <div className="label-wrapper">
                <p className="label">Email</p>
                {errors.email && <p className="error">Email is required</p>}
              </div>
              <Field name="email" type="email" className="input-text" placeholder="Email" />
              <div className="label-wrapper">
                <p className="label">Message</p>
                {errors.message && <p className="error">Message is required</p>}
              </div>

              <Field name="message">
                {({ field }: any) => {
                  return <textarea name="message" value={field.value} onChange={field.onChange}></textarea>;
                }}
              </Field>
              <Button type="button" transparent onClick={() => handleSubmitForm(values)}>
                send
              </Button>
            </Form>
          )}
        </Formik>
      </ContactUsModal>
      {ToastAnchor}
    </StyledFooter>
  );
};
