import { configureStore } from '@reduxjs/toolkit'
import { sidebarReducer } from '../features/sidebar/sidebar-slice';

const store = configureStore({
  reducer: {
    sidebar : sidebarReducer
  },
})

export default store;

export type RootState = ReturnType<typeof store.getState>;