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
  } from '../types'
  
  export default (state, { type, payload }) => {
    switch (type) {
      case GET_LOADS:
        return {
          ...state,
          loads: payload,
          error: null
        }
      case ADD_LOAD:
        return {
          ...state,
          loads: [...state.loads, payload]
        }
      case REMOVE_LOAD:
        return {
          ...state,
          loads: state.loads.filter(load => load._id !== payload)
        }
      case EDIT_LOAD:
        return {
          ...state,
          editLoad: payload
        }
      case CLEAR_EDIT:
        return {
          ...state,
          editLoad: null
        }
      case UPDATE_LOAD:
        return {
          ...state,
          loads: state.loads.map(load => load._id === payload._id ? payload : load)
        }
      case TOGGLE_LOADFILTER:
        return {
          ...state,
          loadFilter: !state.loadFilter
      }
      case SEARCH_LOAD:
        const regex = new RegExp(`${payload}`, 'gi')
        return {
          ...state,
          searchLoad: state.loads.filter(load => load.name.match(regex))
        }
      case CLEAR_SEARCH:
        return {
          ...state,
          searchLoad: null
        }
      case LOADS_ERROR:
        return {
          ...state,
          error: payload,
        }
      case CLEAR_LOADS:
        return {
          ...state,
          loadFilter: false,
          searchLoad: null,
          editLoad: null,
          loads: [],
          error: null
        }
      default:
        return state
    }
  } 