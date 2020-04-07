import React, { useReducer } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import AuthContext from './authContext';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  GET_PROFILE,
  DELETE_PROFILE
} from '../types';

const API_URL = 'http://localhost:5000';
const LOGIN_API = `${API_URL}/api/user/login`;
const REGISTER_API = `${API_URL}/api/user/register`;
const PROFILE_API = `${API_URL}/api/user`;


const AuthState = (props) => {
  const intialState = {
    token: localStorage.getItem('token'),
    isAuthencated: null,
    loading: true,
    user: null,
    error: null
  }
  const [state, dispatch] = useReducer(authReducer, intialState)

  // Load User

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(LOGIN_API);
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      })
    }
  };

  //Register User
  const register = async formData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post(REGISTER_API, formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error
      })
    }
  }

//WORK WITH USER PROFILE

  const getProfile = async (user) => {
    try {
      const res = await axios.get(`${PROFILE_API}/${user._id}`);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response
      })
    }
  }

  const updateProfile = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`${PROFILE_API}/${user._id}`, user, config)
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
      getProfile();

    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response
      })
    }
  }

  const deleteShipper = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    try {
      console.log(id);
      console.log("START DELETING");
      await axios.delete(`${PROFILE_API}/${id}`, config);
      console.log("END DELETING");
      dispatch({
        type: DELETE_PROFILE,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.msg
      })
    }
  }


  //login user

  const login = async formData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post(LOGIN_API, formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      })
    }
  }
  const setError = (err) => {
    dispatch({
      type: REGISTER_FAIL,
      payload: [{ msg: err }]
    })
  }
  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <AuthContext.Provider value={{
      token: state.token,
      isAuthencated: state.isAuthencated,
      user: state.user,
      error: state.error,
      loading: state.loading,
      register,
      login,
      loadUser,
      logout,
      clearErrors,
      setError,
      updateProfile,
      deleteShipper
    }} >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;
