import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  filteredBooks: [],
  currentPage: 1,
  booksPerPage: 10,
  searchTerm: '',
  genreFilter: '',
  statusFilter: '',
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
      state.filteredBooks = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
      applyFilters(state);
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex(book => book._id === action.payload._id);
      if (index !== -1) {
        state.books[index] = action.payload;
        applyFilters(state);
      }
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
      applyFilters(state);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setGenreFilter: (state, action) => {
      state.genreFilter = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Helper function for filtering
const applyFilters = (state) => {
  let filtered = [...state.books];

  if (state.searchTerm) {
    filtered = filtered.filter(book =>
      book.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }

  if (state.genreFilter) {
    filtered = filtered.filter(book => book.genre === state.genreFilter);
  }

  if (state.statusFilter) {
    filtered = filtered.filter(book => book.status === state.statusFilter);
  }

  state.filteredBooks = filtered;
};

// ✅ Export actions and reducer correctly
export const {
  setBooks,
  addBook,
  updateBook,
  deleteBook,
  setSearchTerm,
  setGenreFilter,
  setStatusFilter,
  setCurrentPage,
  setLoading,
  setError,
} = bookSlice.actions;

export default bookSlice.reducer;
