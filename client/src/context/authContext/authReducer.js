import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    DELETE_PROFILE,
    GET_PROFILE
  } from '../types'
  
  export default (state, { type, payload }) => {
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthencated: true,
          user: payload,
          loading: false,
          error: null
        }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token)
        return {
          ...state,
          ...payload,
          isAuthencated: true,
          loading: false,
          error: null
        }
      case REGISTER_FAIL:
      case UPDATE_PROFILE:
        if (payload.logout) {
          localStorage.setItem('token', payload.token);
        }
        return {
          ...state,
          user: payload.user,
          isAuthencated: !payload.logout
        }
      case PROFILE_ERROR:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case DELETE_PROFILE:
        localStorage.removeItem('token')
        return {
          token: null,
          isAuthencated: null,
          user: null,
          loading: false,
          error: payload
        }
      case GET_PROFILE:
        return{
          ...state,
          isAuthencated: true,
          user: payload,
          loading: false,
          error: null
        }
      case LOGOUT:
        localStorage.removeItem('token')
        return {
          ...state,
          token: null,
          isAuthencated: null,
          user: null,
          loading: false,
          error: payload
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        }
      default:
        return state
    }
  }