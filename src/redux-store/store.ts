import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  user: UserReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: storage,
    whitelist: ["user"],
  },
  reducers
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
