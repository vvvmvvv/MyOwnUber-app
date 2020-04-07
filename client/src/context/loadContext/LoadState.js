import React, { useReducer } from 'react';
import axios from 'axios';
import LoadContext from './loadContext';
import loadReducer from './loadReducer';
import {
    TOGGLE_LOADFILTER,
    SEARCH_LOAD,
    CLEAR_SEARCH,
    REMOVE_LOAD,
    ADD_LOAD,
    EDIT_LOAD,
    CLEAR_EDIT,
    UPDATE_LOAD,
    GET_LOADS,
    LOADS_ERROR,
    CLEAR_LOADS
} from '../types';

const API_URL = 'http://localhost:5000';
const LOADS_API = `${API_URL}/api/loads/`;

const LoadState = (props) => {
  const intialState = {
    loadFilter: false,
    searchLoad: null,
    editLoad: null,
    loads: [],
    error: null,
  }
  const [state, dispatch] = useReducer(loadReducer, intialState)

  // get loads
  const getLoads = async () => {
    try {
      const res = await axios.get(LOADS_API);
      dispatch({
        type: GET_LOADS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: LOADS_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Add Load 

  const addLoad = async (load) => {
    const config = {
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post(LOADS_API, load, config)
      dispatch({
        type: ADD_LOAD,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: LOADS_ERROR,
        payload: err.response.msg
      })
    }
  }


  // remove Load 
  const removeLoad = async (id) => {
    try {
      await axios.delete(`${LOADS_API}/${id}`)
      dispatch({
        type: REMOVE_LOAD,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: LOADS_ERROR,
        payload: err.response.msg
      })
    }
  }

  // update load

  const update_Load = async (load) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`${LOADS_API}/${load._id}`, load, config)
      dispatch({
        type: UPDATE_LOAD,
        payload: res.data
      })
      getLoads()

    } catch (err) {
      dispatch({
        type: LOADS_ERROR,
        payload: err.response
      })
    }
  }

  //toggle isconfirmed
  const toggleLoadFilter = () => {
    dispatch({
      type: TOGGLE_LOADFILTER
    })
  }

  // Search Load
  const search_Load = (load) => {
    dispatch({
      type: SEARCH_LOAD,
      payload: load
    })
  }
  const clearSearchLoad = () => {
    dispatch({
      type: CLEAR_SEARCH
    })
  }

  // Edit Load 
  const edit_Load = (load) => {
    dispatch({
      type: EDIT_LOAD,
      payload: load
    })
  }
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    })
  }
  const clearLoads = () => {
    dispatch({
      type: CLEAR_LOADS
    })
  }
  return (
    <LoadContext.Provider value={{
      loads: state.loads,
      loadFilter: state.loadFilter,
      searchLoad: state.searchLoad,
      editLoad: state.editLoad,
      error: state.error,
      loading: state.loading,
      addLoad,
      removeLoad,
      edit_Load,
      clearEdit,
      update_Load,
      toggleLoadFilter,
      search_Load,
      clearSearchLoad,
      getLoads,
      clearLoads
    }} >
      {props.children}
    </LoadContext.Provider >
  )
}

export default LoadState;
