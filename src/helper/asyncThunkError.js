export const asyncThunkError = (err, rejectWithValue) => {
   if (err.response && err.response.data.message) return rejectWithValue(err.response.data.message);
   else if (err.message) return rejectWithValue(err.message);
   else return rejectWithValue('Unexpected error occured');
}