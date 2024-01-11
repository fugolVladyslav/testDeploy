import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { authAPI } from '../../services/auth';

type mainState = {
  myCardActive: boolean;
  isLogout: boolean;
  data: null | {
    refresh_token: string | null;
    access_token: string | null;
  };
  isMobile: boolean;
};

const initialState: mainState = {
  myCardActive: false,
  isLogout: false,
  data: {
    access_token: localStorage.getItem('accessToken'),
    refresh_token: localStorage.getItem('refreshToken'),
  },
  isMobile: false,
};

export const authReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setStatusCard: (state: mainState, { payload }: any) => {
      state.myCardActive = payload;
    },
    setLogout: (state: mainState, { action }: any) => {
      state.isLogout = action.payload;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setUser: (state: any, { payload }: any) => {
      state.data = payload;
    },

    setIsMobile: (state: any, { payload }: any) => {
      state.isMobile = payload;
    },

    logout: (state: mainState) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.data = null;
      state.myCardActive = false;
      state.isLogout = false;
    },
  },
  extraReducers: (builder: any) => {
    builder.addMatcher(
      authAPI.endpoints.sendLoginPhoneNumberVerify.matchFulfilled,
      (state: mainState, { payload }: any) => {
        state.data = payload;
        localStorage.setItem('refreshToken', payload.refresh_token);
        localStorage.setItem('accessToken', payload.access_token);
      },
    );
    builder.addMatcher(authAPI.endpoints.refresh.matchFulfilled, (state: mainState, { payload }: any) => {
      state.data = payload;
      localStorage.setItem('refreshToken', payload.refresh_token);
      localStorage.setItem('accessToken', payload.access_token);
    });
    builder.addMatcher(authAPI.endpoints.refresh.matchRejected, (state: mainState) => {
      localStorage.removeItem('timeZone');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('signUpData');
      state.data = null;
    });
  },
});

export const { setStatusCard, setLogout, setIsMobile, logout } = authReducer.actions;

export const selectCurrentUser = (state: RootState) => state.main;

export default authReducer.reducer;
