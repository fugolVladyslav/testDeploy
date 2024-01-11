import './App.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  SignIn,
  Home,
  SignUp,
  WaitingRoom,
  ProductsList,
  PickedItems,
  MissedItems,
  Checkout,
  Event,
  TermsAndConditions,
  PrivacyPolicy,
  SelectSizes,
  NotFound,
  Success,
} from './screens';
import { Theme } from './styles/Theme';
import { Header } from './components/Header';
import 'animate.css/animate.min.css';
import { ModalProvider } from 'styled-react-modal';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useLoadScript } from '@react-google-maps/api';

const libraries: 'places'[] = ['places'];
export const googleMapsApiKey: string = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey ?? '',
    libraries,
  });
  console.log(isLoaded);
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <ModalProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/waiting-room/:eventId" element={<WaitingRoom />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/:eventId/:productId" element={<ProductsList />} />
              <Route path="/picked-items/:eventId" element={<PickedItems />} />
              <Route path="/missed-items/:eventId" element={<MissedItems />} />
              <Route path="/checkout/:eventId/:orderId" element={<Checkout />} />
              <Route path="/event/:eventId" element={<Event />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/select-sizes/:eventId" element={<SelectSizes />} />
              <Route path="/success" element={<Success />} />

              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
