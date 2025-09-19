/* eslint-disable no-unused-vars */

import { useDispatch, useSelector } from 'react-redux';
import { useApp } from '../context/AppContext.jsx';
import { Book } from '../entity/BookEntity.jsx';
import { bookApi } from '../api/bookApi.jsx';
import useApi from '../hooks/useApi.jsx';
import {
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
} from '../store/bookSlice.jsx';
import toast from 'react-hot-toast';

export const useBookPresenter = () => {
  const dispatch = useDispatch();
  const { getApi, postApi, putApi, deleteApi } = useApi();
  const { closeModal, hideDeleteConfirm } = useApp();
  
  const {
    books,
    filteredBooks,
    currentPage,
    booksPerPage,
    searchTerm,
    genreFilter,
    statusFilter,
    loading,
  } = useSelector((state) => state.books);

  const loadBooks = async () => {
    try {
      dispatch(setLoading(true));
      const response = await bookApi.getBooks();
      const bookInstances = response.data.map(book => Book.fromApi(book));
      dispatch(setBooks(bookInstances));
    } catch (error) {
      dispatch(setError(error.message));
      toast.error('Failed to load books');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createBook = async (bookData) => {
    try {
      dispatch(setLoading(true));
      const book = new Book(bookData);
      const validation = book.validate();
      
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors)[0]);
      }

      const response = await bookApi.createBook(book.toApi());
      dispatch(addBook(Book.fromApi(response.data)));
      toast.success('Book added successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const editBook = async (bookId, bookData) => {
    try {
      dispatch(setLoading(true));
      console.log("bookdata",bookData)
      const book = new Book({ ...bookData, _id: bookId, _id: bookId });
      console.log("book",book)
      const validation = book.validate();
      
      if (!validation.isValid) {
        console.log("validation",validation)
        throw new Error(Object.values(validation.errors)[0]);
      }

      const response = await bookApi.updateBook(bookId, book.toApi());
      console.log("response",response)
      dispatch(updateBook(Book.fromApi({ ...response.data, _id: bookId })));
      toast.success('Book updated successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const removeBook = async (bookId) => {
    try {
      dispatch(setLoading(true));
      await bookApi.deleteBook(bookId);
      dispatch(deleteBook(bookId));
      hideDeleteConfirm();
      toast.success('Book deleted successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearch = (term) => {
    dispatch(setSearchTerm(term));
  };

  const handleGenreFilter = (genre) => {
    dispatch(setGenreFilter(genre));
  };

  const handleStatusFilter = (status) => {
    dispatch(setStatusFilter(status));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPaginatedBooks = () => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return filteredBooks.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(filteredBooks.length / booksPerPage);
  };

  const getUniqueGenres = () => {
    return [...new Set(books.map(book => book.genre))];
  };

  return {
    books: getPaginatedBooks(),
    totalBooks: filteredBooks.length,
    currentPage,
    totalPages: getTotalPages(),
    searchTerm,
    genreFilter,
    statusFilter,
    loading,
    uniqueGenres: getUniqueGenres(),
    loadBooks,
    createBook,
    editBook,
    removeBook,
    handleSearch,
    handleGenreFilter,
    handleStatusFilter,
    handlePageChange,
  };
};