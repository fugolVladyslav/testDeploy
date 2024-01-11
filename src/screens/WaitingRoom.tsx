import 'moment-timezone';
import { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '../components/Button';
import { ClockIcon, CameraIcon, InviteFriendIcon, Close } from '../assets/svg';
import { StyledWaitingRoomScreens } from '../styles/screens/WaitingRoomScreens';
import Countdown from '../components/CountDown';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledInviteFriendModal } from '../styles/components/InviteFriendModal';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useGetWaitingRoomQuery, useInviteFriendMutation } from '../services/auth';
import moment from 'moment';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useToaster } from '../hooks/useToaster';

const ContactFormShema = Yup.object().shape({
  phone: Yup.string().required('Required.'),
  message: Yup.string().required('Required.'),
});

interface InviteFriend {
  phone: string;
  message: string;
}

export const WaitingRoom: FC = () => {
  const { eventId } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 965);

  const { data: waitingRoom, refetch: refetchWaitingRoomData } = useGetWaitingRoomQuery({ id: eventId });

  const [inviteFriend] = useInviteFriendMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const localtimeZone = moment.tz.guess();
  const eventTimeWithTimeZones = moment.tz(waitingRoom?.start, waitingRoom?.timezone);
  const [timer, setTimer] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isEvent: false,
    started: false,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [value, setValue] = useState('');
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

  const inviteFriendForm = async (values: InviteFriend) => {
    try {
      await inviteFriend({
        phone: values.phone,
        comment: values.message,
        id: eventId,
      }).unwrap();
      handleSelectSizesModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrors(error);
    }
  };

  const handleSelectSizesModal = () => {
    setValue('');
    setIsOpenModal(!isOpenModal);
  };
  // const [muted, setMuted] = useState(true);
  const navigate = useNavigate();

  const [eventTimeStart, setEventTimeStart] = useState(waitingRoom?.start);

  useEffect(() => {
    setEventTimeStart(waitingRoom?.start);
  }, [waitingRoom?.start]);

  useEffect(() => {
    refetchWaitingRoomData();
  }, []);

  const currentTime = new Date();
  // get current year
  const currentYear = currentTime.getFullYear();

  useEffect(() => {
    if (!timer.started && waitingRoom?.start) {
      setInterval(() => {
        const countdown = () => {
          const dateAtm = new Date();
          const currentTime = dateAtm.getTime();
          const time = eventTimeWithTimeZones.tz(localtimeZone);
          const eventTime = new Date(time.toString()).getTime();
          const timeRemaining = eventTime - currentTime;

          let seconds = Math.floor(timeRemaining / 1000);
          let minutes = Math.floor(seconds / 60);
          let hours = Math.floor(minutes / 60);
          const days = Math.floor(hours / 24);

          seconds %= 60;
          minutes %= 60;
          hours %= 24;

          // Setting States
          setTimer((prevState) => ({
            ...prevState,
            seconds,
            minutes,
            hours,
            days,
            started: true,
          }));
        };
        if (!timer.isEvent) {
          countdown();
        } else {
          setTimer((prevState) => ({
            ...prevState,
            isEvent: true,
          }));
        }
      }, 1000);
    }
  }, [currentYear, timer.isEvent, waitingRoom?.start, eventTimeStart]);

  // const handleAddToCalendar = () => {
  //   console.log('handleAddToCalendar');
  // };
  const backgroundColor = waitingRoom?.waiting_room_bg_color;
  const fontColor = waitingRoom?.waiting_room_font_color;

  const listenWidth = () => {
    const width = window.innerWidth;

    if (width < 965) {
      !isMobile && // to limit setting state only the first time
        setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', listenWidth);
    return () => window.removeEventListener('resize', listenWidth);
  }, [listenWidth]);

  const isEventStarted = moment(waitingRoom?.start).isBefore(new Date());

  return (
    <StyledWaitingRoomScreens>
      <div className="player-container">
        <ReactPlayer
          className="player"
          url={!isMobile ? waitingRoom?.waiting_room_landscape_video_url : waitingRoom?.waiting_room_portrait_video_url}
          width="100%"
          height="100%"
          playing
          loop
          muted
          playsinline
          stopOnUnmount
        />

        {/* <button className="mute-button" onClick={() => setMuted((prev) => !prev)}>
          <Mute color={'#fff'} muted={muted} />
        </button> */}
        <div
          className="content-wrapper"
          style={{
            backgroundColor: `rgba(${backgroundColor?.r}, ${backgroundColor?.g}, ${backgroundColor?.b}, ${backgroundColor?.a})`,
          }}
        >
          <div className="mobile-counter event-info-block ">
            <div className="invite-friend">
              <span
                className="start-event"
                style={{
                  color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                }}
              >
                {isEventStarted ? 'event is live' : 'event starts in:'}
              </span>

              <Button
                flat
                textButton
                type="button"
                onClick={handleSelectSizesModal}
                className="text-button"
                leftIcon={<InviteFriendIcon />}
              >
                Invite a friend
              </Button>
            </div>
            {moment(waitingRoom?.start).isAfter(new Date()) && <Countdown countdownData={timer} />}
          </div>
          <div className="event-info">
            <div className="event-name-container event-info-block">
              <span
                className="event-name"
                style={{
                  color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                }}
              >
                {waitingRoom?.brand_name}
              </span>
              <div className="event-date">
                <div>
                  <img src={CameraIcon} alt="camera" />
                  <span
                    style={{
                      color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                    }}
                  >
                    {Math.ceil(waitingRoom?.duration / 60)}
                    min
                  </span>
                </div>
                <div>
                  <img src={ClockIcon} alt="time" />
                  <span
                    style={{
                      color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                    }}
                  >
                    {eventTimeWithTimeZones.tz(localtimeZone).format('MMM. DD, YYYY -  h:mm a')}
                  </span>
                </div>
              </div>
              <span
                className="event-description"
                style={{
                  color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                }}
              >
                {waitingRoom?.description}
              </span>
            </div>
            <div className="event-info-block event-info-block-center">
              {
                //   <Button
                //   flat
                //   textButton
                //   type="button"
                //   onClick={handleAddToCalendar}
                //   className="text-button select-sizes-button"
                // >
                //   + Add to calendar
                // </Button>
              }
              <Button
                onClick={() => navigate(`/select-sizes/${eventId}`)}
                transparent={true}
                className="select-size-btn"
              >
                Select size
                {waitingRoom?.sizes_added && <span className="select-size-btn-green-dot"/>}
              </Button>
              {isEventStarted && (
                <Button onClick={() => navigate(`/event/${eventId}`)} disabled={!waitingRoom?.sizes_added}>
                  Start Event
                </Button>
              )}
            </div>
            <div className="event-info-block event-info-block-right">
              <div className="invite-friend">
                <span
                  className="start-event"
                  style={{
                    color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                  }}
                >
                  {isEventStarted ? 'event is live' : 'event starts in:'}
                </span>

                <Button
                  flat
                  textButton
                  type="button"
                  onClick={handleSelectSizesModal}
                  className="text-button"
                  leftIcon={<InviteFriendIcon />}
                >
                  Invite a friend
                </Button>
              </div>
              {moment(waitingRoom?.start).isAfter(new Date()) && <Countdown countdownData={timer} />}
            </div>
          </div>
        </div>
      </div>
      <StyledInviteFriendModal
        isOpen={isOpenModal}
        onBackgroundClick={handleSelectSizesModal}
        onEscapeKeydown={handleSelectSizesModal}
      >
        <button className="close-button" onClick={handleSelectSizesModal}>
          <Close />
        </button>
        <h2>INVITE A FRIEND</h2>

        <Formik
          initialValues={{ phone: '', message: '' }}
          onSubmit={inviteFriendForm}
          validationSchema={ContactFormShema}
        >
          {({ setFieldValue, handleSubmit, errors }) => (
            <Form className="form">
              <label htmlFor="#phone">enter friend’s phone number</label>
              <PhoneInput
                international
                placeholder="Enter phone number"
                defaultCountry="US"
                value={value}
                onChange={(e: any) => {
                  setValue(e);
                  setFieldValue('phone', e);
                }}
                smartCaret={false}
                id="phone"
              />
              {errors.phone && <p className="error">Phone number is required</p>}
              <label htmlFor="#comment" className="comment-label">
                Comment (optional)
              </label>
              <Field name="message">
                {({ field }: any) => {
                  return <textarea placeholder="Your message..." name="message" value={field.value} onChange={field.onChange}></textarea>;
                }}
              </Field>
              {errors.message && <p className="error">Message is required</p>}

              <p>Max 120 symbols</p>
              <Button onClick={handleSubmit}>send invitation</Button>
            </Form>
          )}
        </Formik>
      </StyledInviteFriendModal>
      {ToastAnchor}
    </StyledWaitingRoomScreens>
  );
};

export default WaitingRoom;
