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
  
  export const authReducer = (state = { user: {}, success: false, isProfileUpdate: false }, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_USER_REQUEST:
      case LOAD_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
          isProfileUpdate: false
        };
      
  
      case LOGIN_SUCCESS:
      case REGISTER_USER_SUCCESS:
        return { ...state, success: true }
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload
        };
  
      case LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload
        };
  
     
      case LOGIN_FAIL:
      case REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
          success: false
        };
  
      
  
      default:
        return state;
    }
  };
  
