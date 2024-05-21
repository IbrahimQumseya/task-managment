import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from './newAPI';

export const sentFacebookAuth = createAsyncThunk('auth/setFacebookAuth', async (data, thunkAPI) => {
  try {
    const res = await axios.post(
      `/auth/facebook`,
      { accessToken: data },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        },
      }
    );
    console.log('------',res);
    const result = await res.json();
    return result;
  } catch (error) {
    throw Error(error);
  }
});
