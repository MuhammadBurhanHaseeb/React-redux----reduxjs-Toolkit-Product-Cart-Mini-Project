import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems , addItem , updateItem , deleteItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};
export const fetchAsync = createAsyncThunk(
  'cart/fetchItem',
  async () => {
    const response = await fetchItems();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const addAsync = createAsyncThunk(
  'cart/addItems',
  async (item) => {
    const {id,image,name,brand,price,quantity} = item;
        const response = await addItem({id,image, name,brand,price,quantity:1} );
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteAsync = createAsyncThunk(
  'cart/deleteItem',
  async (id) => {
      await deleteItem(id);
    return id;
  }
);
export const updateAsync = createAsyncThunk(
  'cart/updateItem',
  async ({id , change }) => {
    // const {quantity} = item;
     const response =  await updateItem(id , change);
    return response.data;
  }
);


export const cartSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload);
        state.items.splice(index ,1);
        // state.items.pop(action.payload);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(index ,1 ,action.payload );
        // state.items.pop(action.payload);
      });
  },
});
// increment, decrement, incrementByAmount
// export const {  } = cartSlice.actions;
export default cartSlice.reducer;
