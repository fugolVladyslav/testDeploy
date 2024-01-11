import { FC, useState } from 'react';
import { StyledPhoneAuth } from '../styles/components/PhoneAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import PhoneInput from 'react-phone-number-input';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useToaster } from '../hooks/useToaster';
import * as Yup from 'yup';
import moment from 'moment';

import { Button } from './Button';

import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { SuccessModalAuth } from '../styles/components/SuccessModalAuth';
import {
  useRegisterPhoneMutation,
  useRegisterVerifyPhoneMutation,
  useSubmitregisterFormMutation,
  useSendLoginPhoneNumberMutation,
  useSendLoginPhoneNumberVerifyMutation,
} from '../services/auth';
import { Loader } from './Loader';

interface Props {
  title: string;
  subtitle: string;
  subtitleLinkText: string;
  subtitleLinkPath: string;
  stepsCount: number;
  setShowModal?: any;
}

interface FormProps {
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  email: string;
}

const genderList = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'female',
  },
  {
    value: 'other',
    label: 'other',
  },
];

type LoginError = {
  data: {
    detail: string;
  };
  status: number;
};

type SignUpForm = {
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  email: string;
};

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name.'),
  lastName: Yup.string().required('Please enter your last name.'),
  birthday: Yup.string().required('Please enter your birthday.'),
  gender: Yup.string().required('Please select your gender.'),
  email: Yup.string().email().required('Please enter your email.'),
});

export const PhoneAuth: FC<Props> = ({
  title,
  subtitle,
  subtitleLinkText,
  subtitleLinkPath,
  stepsCount,
  setShowModal,
}) => {
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>('');
  const [counter, setCounter] = useState<boolean>(false);

  const navigate = useNavigate();
  const { toastTrigger, ToastAnchor, toastRemove } = useToaster();

  const [startRegister] = useRegisterPhoneMutation<{
    error: LoginError;
    isLoading: boolean;
    isError: boolean;
  }>();

  const [startConfirmRegister] = useRegisterVerifyPhoneMutation<{
    error: LoginError;
    isLoading: boolean;
    isError: boolean;
  }>();

  const [submitregisterForm] = useSubmitregisterFormMutation<{
    error: LoginError;
    isLoading: boolean;
    isError: boolean;
  }>();

  const [sendLoginPhoneNumber] = useSendLoginPhoneNumberMutation<{
    error: LoginError;
    isLoading: boolean;
    isError: boolean;
  }>();

  const [sendLoginPhoneNumberVerify] = useSendLoginPhoneNumberVerifyMutation<{
    error: LoginError;
    isLoading: boolean;
    isError: boolean;
  }>();

  const handleSelectSizesModal = () => {
    setShowModal(!isOpenModal);
    setIsOpenModal(!isOpenModal);
  };

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
    setTimeout(() => {
      toastRemove();
    }, 3000);
  };

  const handleLoginNext = async () => {
    setLoading(true);
    if (!value?.length) {
      setPhoneError(true);
      setLoading(false);
    } else {
      try {
        await sendLoginPhoneNumber({
          phone_number: value,
        }).unwrap();
        setCurrentIndex(1);
        setLoading(false);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        handleErrors(error);
      }
    }
  };

  const handleCreateAccount = async () => {
    setLoading(true);
    if (!value?.length) {
      setPhoneError(true);
      setLoading(false);
    } else {
      try {
        await startRegister({
          phone_number: value,
        }).unwrap();
        setCurrentIndex(1);
        setLoading(false);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoading(false);
        handleErrors(error);
      }
    }
  };

  const handleLogin = async (valueCode: string) => {
    if (!valueCode || valueCode.length != 6) {
      if (valueCode.length && (valueCode.length >= 6 || valueCode.length <= 6)) {
        toastTrigger({
          message: `Verification code is incorrect. Please enter the code again`,
          type: 'error',
        });
      } else {
        toastTrigger({
          message: `Verification code is missing. Please enter a code`,
          type: 'error',
        });
      }
    } else {
      setLoading(true);
      try {
        await sendLoginPhoneNumberVerify({
          phone_number: value,
          code: valueCode,
        }).unwrap();
        setLoading(false);
        navigate('/');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoading(false);
        handleErrors(error);
      }
    }
  };

  const handleResendCode = async () => {
    try {
      if (stepsCount === 3) {
        await startRegister({
          phone_number: value,
        }).unwrap();
      } else {
        await sendLoginPhoneNumber({
          phone_number: value,
        }).unwrap();
      }

      setCounter(true);
      setTimeout(() => {
        setCounter(false);
      }, 60000);
      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      handleErrors(error);
    }
  };

  const handleNextCreateAcc = async (valueCode: string) => {
    if (!valueCode || valueCode.length != 6) {
      if (valueCode.length && (valueCode.length >= 6 || valueCode.length <= 6)) {
        toastTrigger({
          message: `Verification code is incorrect. Please enter the code again`,
          type: 'error',
        });
      } else {
        toastTrigger({
          message: `Verification code is missing. Please enter a code`,
          type: 'error',
        });
      }
    } else {
      try {
        setLoading(true);
        const res = await startConfirmRegister({
          phone_number: value,
          code: valueCode,
        }).unwrap();
        setToken(res.token);
        setCurrentIndex(2);
        setLoading(false);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoading(false);
        handleErrors(error);
      }
    }
  };

  const handleSubmitCreateAcc = async (values: SignUpForm) => {
    setLoading(true);
    try {
      await submitregisterForm({
        ...values,
        token: token,
        date_of_birth: moment(startDate).format('YYYY-MM-DD'),
      }).unwrap();
      handleSelectSizesModal();
      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      handleErrors(error);
    }
  };

  return (
    <StyledPhoneAuth>
      {!isOpenModal && (
        <div>
          <h4>{title}</h4>
          <p className="subtitle">
            <span>{subtitle}</span>
            <Link to={subtitleLinkPath}>{subtitleLinkText}</Link>
          </p>
        </div>
      )}

      {currentIndex === 0 ? (
        <div>
          <div className="label-wrapper">
            <p className="label">Phone number</p>
          </div>

          <PhoneInput
            international
            placeholder="Enter phone number"
            defaultCountry="US"
            value={value}
            limitMaxLength={true}
            onChange={setValue}
            smartCaret={false}
          />
          {phoneError && <p className="error">Phone number is required</p>}
          {stepsCount === 3 && (
            <div className="agreement-wrapper">
              <p className="agreement-text">
                By clicking “Create account” you agree to <Link to="/terms-and-conditions">Terms & Conditions</Link> and{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>
              </p>
            </div>
          )}
          <Button
            type="button"
            className="sign-up-btn"
            onClick={stepsCount === 2 ? handleLoginNext : handleCreateAccount}
            // disabled={!value}
          >
            {stepsCount === 2 ? 'Next' : 'create account'}
          </Button>
        </div>
      ) : currentIndex === 1 ? (
        <Formik initialValues={{ code: '' }} onSubmit={() => {}} enableReinitialize>
          {({ values }) => (
            <Form className="form" name="register">
              <div className="label-wrapper">
                <p className="label">Verification code from SMS</p>
                {false && <p className="error">Code is required</p>}
              </div>

              <Field name="code" type="text" className="input-text" placeholder="Enter Verification code" />
              <Button
                type="button"
                className="text-button"
                onClick={stepsCount === 2 ? () => handleLogin(values.code) : () => handleNextCreateAcc(values.code)}
              >
                {stepsCount === 2 ? 'Log in' : 'next'}
              </Button>
              <Button
                disabled={!!counter}
                flat
                textButton
                type="button"
                onClick={handleResendCode}
                className="text-button"
              >
                {!counter && 'resend code'}
              </Button>
              <Button flat textButton type="button" className="sign-up-btn" onClick={() => setCurrentIndex(0)}>
                Change phone number
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        !isOpenModal && (
          <Formik
            initialValues={{ firstName: '', lastName: '', birthday: '', gender: '', email: '' }}
            onSubmit={(value: FormProps) => handleSubmitCreateAcc(value)}
            validationSchema={SignUpSchema}
            validateOnBlur={false}
            enableReinitialize
          >
            {({ values, setFieldValue, errors, handleSubmit, touched }) => (
              <Form className="form" name="registerForm">
                <div className="label-wrapper">
                  <p className="label">first name</p>
                </div>
                <Field name="firstName" type="text" className="input-text" placeholder="Enter first name" />
                {errors.firstName && touched.firstName && <p className="error">First name is required</p>}
                <div className="label-wrapper">
                  <p className="label">last name</p>
                </div>
                <Field name="lastName" type="text" className="input-text" placeholder="Enter last name" />
                {errors.lastName && touched.lastName && <p className="error">Last name is required</p>}
                <div className="gender-dob-container">
                  <div className="gender-dob-field-container">
                    <div className="label-wrapper">
                      <p className="label">your birthday</p>
                    </div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setFieldValue('birthday', date);
                        setStartDate(date);
                      }}
                      placeholderText="date of birth"
                      //It should be added, because  it is not convenient to choose birthday by flipping through just one month.
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                    {errors.birthday && touched.birthday && <p className="error">Birthday is required</p>}
                  </div>
                  <div className="gender-dob-field-container">
                    <div className="label-wrapper">
                      <p className="label">your gender</p>
                    </div>
                    <Select
                      name="gender"
                      placeholder="select gender"
                      options={genderList}
                      value={genderList.find((item) => item.value === values.gender)}
                      onChange={(selectedOption) => setFieldValue('gender', selectedOption?.value)}
                      className="gender-select"
                      classNamePrefix="gender-select"
                      isSearchable={false}
                    />
                    {errors.gender && touched.gender && <p className="error">Gender is required</p>}
                  </div>
                </div>
                <div className="label-wrapper">
                  <p className="label">your email</p>
                </div>
                <Field name="email" type="email" className="input-text" placeholder="Enter email" />

                {errors.email && touched.email && <p className="error">Email is required</p>}
                <Button type="button" className="sign-up-btn" onClick={() => handleSubmit()}>
                  submit
                </Button>
              </Form>
            )}
          </Formik>
        )
      )}

      <SuccessModalAuth
        isOpen={isOpenModal}
        onBackgroundClick={handleSelectSizesModal}
        onEscapeKeydown={handleSelectSizesModal}
      >
        <h2>Success!</h2>
        <p>Congratulations, your account has been successfully created!</p>

        <Button type="button" transparent onClick={() => navigate('/sign-in')}>
          Sign-in
        </Button>
      </SuccessModalAuth>

      <div>
        {Array.from({ length: stepsCount }, (_, index) => (
          <div key={index} className={`tile ${currentIndex === index ? 'active' : ''}`}></div>
        ))}
      </div>
      <Loader show={loading} />
      {ToastAnchor}
    </StyledPhoneAuth>
  );
};
