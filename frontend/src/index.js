import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store.js';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import  {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.js';
import User from './screens/Users.jsx';

// import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
     <Route index={true} path='/' element = {<HomeScreen/>}/>
     <Route path='/login' element={<LoginScreen/>} />
     <Route path='/register' element={<RegisterScreen/>}/>
     <Route path='' element={<PrivateRoute/>} >
      <Route path = '/profile' element={<ProfileScreen/>}/>
      <Route path = '/users' element={<User />}/>
     </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
