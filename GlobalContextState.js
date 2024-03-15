// GlobalStateContext.js

import React, { createContext, useReducer, useContext } from 'react';

// Define initial state
const initialState = {
  globalVariable: "English"
};

// Create context
const GlobalStateContext = createContext(initialState);

// Create a provider for the context
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to consume the context
export const useGlobalState = () => useContext(GlobalStateContext);

// reducer function
const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_GLOBAL_VARIABLE':
        return {
          ...state,
          globalVariable: action.payload
        };
      default:
        return state;
    }
  };