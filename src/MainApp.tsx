import { NavigationContainer } from "@react-navigation/native";
import Auth from "./navigation/Auth";
import React, { useEffect } from "react";
import Home from "./navigation/Home";
import Alert from "./components/Alert";
import { getToken } from "./store/action/UserAction";
import Loader from "./components/Loader";
import { RootState, useAppDispatch, useAppSelector } from "./store/Store";

export default function MainApp(): JSX.Element {
  const { loading, isAuthenticated } = useAppSelector(
    (state: RootState) => state.userSlice,
  );
  const { alert } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);


  return (
    <NavigationContainer>
      {isAuthenticated ? <Home /> : <Auth />}
      {alert ? <Alert /> : <></>}
      {loading ? <Loader /> : <></>}
    </NavigationContainer>
  );
}
