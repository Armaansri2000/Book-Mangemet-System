import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  isModalOpen: false,
  modalType: null,
  selectedBook: null,
  showDeleteConfirm: false,
  bookToDelete: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
        modalType: action.payload.type,
        selectedBook: action.payload.book || null,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        modalType: null,
        selectedBook: null,
      };
    case 'SHOW_DELETE_CONFIRM':
      return {
        ...state,
        showDeleteConfirm: true,
        bookToDelete: action.payload,
      };
    case 'HIDE_DELETE_CONFIRM':
      return {
        ...state,
        showDeleteConfirm: false,
        bookToDelete: null,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const openModal = (type, book = null) => {
    dispatch({ type: 'OPEN_MODAL', payload: { type, book } });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const showDeleteConfirmDialog = (book) => {
    dispatch({ type: 'SHOW_DELETE_CONFIRM', payload: book });
  };

  const hideDeleteConfirm = () => {
    dispatch({ type: 'HIDE_DELETE_CONFIRM' });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
        showDeleteConfirmDialog,
        hideDeleteConfirm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};