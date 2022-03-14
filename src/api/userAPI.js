import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserProfileImage } from '../features/user/userSlice';
import axios from './newAPI';

export const fetchGetUserDetails = createAsyncThunk('user/getUserDetails', async () => {
  try {
    const res = await axios.get(`/user-details/getUserDetails`);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
});

export const updateUserDetails = createAsyncThunk('user/updateDetails', async (userDetailsDto, thunkAPI) => {
  try {
    console.log(thunkAPI);
    const res = await axios.patch(`users/user/updateUser`, userDetailsDto);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
});

export const createUserDetails = createAsyncThunk('user/createUserDetails', async (userCreateDetailsDto, thunkAPI) => {
  try {
    const { idUser, location, address, telephone, number } = userCreateDetailsDto;
    const res = await axios.post(`/user-details/create-details/user/${idUser}`, userCreateDetailsDto);
    const { firstname, lastName } = res.data;
    return { location, address, number, firstname, telephone, lastName };
  } catch (error) {
    throw Error(error);
  }
});

export const getUserProfileImage = createAsyncThunk('user/getUserProfileImage', async (body, thunkAPI) => {
  try {
    const res = await axios.get('/users/user/profile-image', { responseType: 'blob' });
    const imageObject = await res.data;
    thunkAPI.dispatch(setUserProfileImage(URL.createObjectURL(imageObject)));
    return URL.createObjectURL(imageObject);
  } catch (error) {
    throw Error(error);
  }
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (body, thunkAPI) => {
  try {
    const res = await axios.post('/users/upload/profile-image', body, {
      headers: { 'Content-Type': 'multipart/form-data;boundary' },
    });
    const uploadedImage = await res.json();
    return uploadedImage;
  } catch (error) {
    throw Error(error);
  }
});
