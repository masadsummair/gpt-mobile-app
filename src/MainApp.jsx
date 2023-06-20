import { NavigationContainer } from '@react-navigation/native';
import Auth from './navigation/Auth';
import React, { useEffect } from 'react';
import Home from './navigation/Home';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './components/Alert';
import { getToken } from './store/action/UserAction';
import Loader from './components/Loader';
export default function MainApp() {
  const { AppLoading,loading,isAuthenticated } = useSelector(
    (state) => state.userSlice,
  );
  const { alert } = useSelector((state) => state.appSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  if (AppLoading) {
    return null;
  } 

  return (
    <NavigationContainer>
      
      {isAuthenticated ? <Home /> : <Auth />}
      {alert ? <Alert /> : <></>}
      {loading?<Loader />:<></>}
    </NavigationContainer>
  );
}
