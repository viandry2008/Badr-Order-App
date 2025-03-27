import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

interface Order {
  id: string;
  customer_name: string;
  total_products: number;
  total_price: number;
  created_at: string;
}

interface OrderState {
  data: Order[];
  orderDetail: OrderDetail | null;
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  total: number;
}

interface OrderDetail {
  order_id: string;
  customer_name: string;
  products: { quantity: number; product: { name: string; price: number; id: number } }[];
}

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/orders?page=${page}&limit=10`);
      return {
        orders: response.data.list,
        total: response.data.total,
        hasMore: response.data.list.length > 0,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiClient.delete(`/order/${orderId}`);
      if (response.data.success) {
        dispatch(removeOrder(orderId));
        return orderId;
      } else {
        return rejectWithValue('Failed to delete order');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete order');
    }
  }
);

export const fetchOrderDetail = createAsyncThunk(
  'orders/fetchOrderDetail',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/order/${orderId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order details');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: { customer_name: string; products: { product_id: number; quantity: number }[] }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/order', orderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ orderId, orderData }: { orderId: string; orderData: { customer_name: string; products: { product_id: number; quantity: number }[] } }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/order/${orderId}`, orderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order');
    }
  }
);


const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
    orderDetail: null,
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
    total: 0,
  } as OrderState,
  reducers: {
    resetOrders: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
      state.total = 0;
    },
    removeOrder: (state, action) => {
      state.data = state.data.filter((order) => order.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload.orders];
        state.total = action.payload.total;
        state.hasMore = action.payload.hasMore;
        state.page += 1;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Order Detail
      .addCase(fetchOrderDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetail = action.payload;
      })
      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.data.push(action.payload); // Tambahkan order baru ke state
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        if (updatedOrder && updatedOrder.id) {
          state.data = state.data.map((order) => (order.id === updatedOrder.id ? updatedOrder : order));
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const { resetOrders, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
