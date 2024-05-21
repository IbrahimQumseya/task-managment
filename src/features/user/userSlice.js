import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { sentFacebookAuth } from '../../api/authAPI';
import {
  createUserDetails,
  fetchGetUserDetails,
  getUserProfileImage,
  updateUserDetails,
  updateUserProfile,
} from '../../api/userAPI';

const initialState = {
  accessToken: '',
  user: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    profileImage: '',
  },
  userDetails: {
    id: '',
    location: '',
    address: '',
    number: '',
    telephone: '',
  },
  profileImage: '',
  isFulfilled: false,
  isPending: false,
  isRejected: false,
  errorMessage: '',
  isAuthenticated: false,
  isExpiredToken: false,
};
const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    console.log('sasdsad');
    return appReducer(initialState, action);
  }
  return appReducer(state, action);
};
const appReducer = combineReducers({
  /* your app’s top-level reducers */
  rootReducer,
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      sessionStorage.setItem('user', action.payload);
    },
    logout: (state, _action) => {
      state.isAuthenticated = false;
      sessionStorage.removeItem('user');
      state = initialState;
    },
    setIsAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserFirstnameLastname: (state, action) => {
      const { firstName, lastName } = action.payload;
      state.user = { ...state.user, firstName, lastName };
    },
    setUserProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGetUserDetails.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(fetchGetUserDetails.fulfilled, (state, action) => {
        if (action.payload) {
          state.userDetails = action.payload;
        }
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(fetchGetUserDetails.rejected, (state, _action) => {
        state.isRejected = true;
        state.isFulfilled = false;
        state.isPending = false;
      })

      .addCase(updateUserDetails.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(updateUserDetails.rejected, (state, _action) => {
        state.isRejected = true;
        state.isFulfilled = false;
        state.isPending = false;
      })

      .addCase(createUserDetails.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(createUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(createUserDetails.rejected, (state, _action) => {
        state.isRejected = true;
        state.isFulfilled = false;
        state.isPending = false;
      })

      .addCase(getUserProfileImage.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(getUserProfileImage.fulfilled, (state, action) => {
        state.profileImage = action.payload;
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(getUserProfileImage.rejected, (state, _action) => {
        state.isRejected = true;
        state.isFulfilled = false;
        state.isPending = false;
      })

      .addCase(updateUserProfile.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileImage = action.payload.profileImage;
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(updateUserProfile.rejected, (state, _action) => {
        state.isRejected = true;
        state.isFulfilled = false;
        state.isPending = false;
      })

      .addCase(sentFacebookAuth.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(sentFacebookAuth.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(sentFacebookAuth.rejected, (state, _action) => {
        state.isRejected = true;
        state.isFulfilled = false;
        state.isPending = false;
      });
  },
});

export const { login, logout, setUser, setUserFirstnameLastname, setUserProfileImage } = userSlice.actions;
export const selectUserDetails = (state) => state.user.userDetails;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
