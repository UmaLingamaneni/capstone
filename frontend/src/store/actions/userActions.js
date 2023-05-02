import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import service from '../../service';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,


} from '../constant/userConstant';

// // Login
export const login = (values) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { user, success ,token} = await service.post('/login',values);
    console.log(user);
    if (success === true) {
      localStorage.setItem('token', token);
      localStorage.setItem('login', true);
      window.location.replace('/');
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error
    });
  }
};

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const user = await service.post('/admin/register', userData);
    if (user.success === true) {
      toast.success('Register successfully');
      window.location.replace('/login');
    }

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: user.user
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response
    });
  }
};




// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { user } = await service.get('/currentUser');


    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: user
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response
    });
  }
};

