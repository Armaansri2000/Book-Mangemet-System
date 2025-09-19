/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { motion } from 'framer-motion';
import { useBookPresenter } from '../../show/BookShow.jsx';
import Button from '../../components/model/Button';
import SearchBar from '../../components/details/SearchBar';
import FilterBar from '../../components/details/FilterBar';
import BookCard from '../../components/details/BookCard';
import BookTable from '../../components/details/BookTable';
import Pagination from '../../components/model/Pagination';
import LoadingSkeleton from '../../components/model/LoadingSkeleton';
import ConfirmDialog from '../../components/details/ConfirmDialog';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const navigate = useNavigate();
  const { showDeleteConfirm, hideDeleteConfirm, bookToDelete } = useApp();
  const {
    books,
    totalBooks,
    currentPage,
    totalPages,
    searchTerm,
    genreFilter,
    statusFilter,
    loading,
    uniqueGenres,
    loadBooks,
    removeBook,
    handleSearch,
    handleGenreFilter,
    handleStatusFilter,
    handlePageChange,
  } = useBookPresenter();

  useEffect(() => {
    loadBooks();
  }, []);

  const handleAddBook = () => {
    navigate('/add-book');
  };

  const handleDeleteConfirm = async () => {
    if (bookToDelete) {
      await removeBook(bookToDelete._id || bookToDelete.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Book Management Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Manage your book collection with ease
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button variant="success" onClick={handleAddBook}>
                Add New Book
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <SearchBar
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by title or author..."
              />
            </div>
            <div className="lg:col-span-2">
              <FilterBar
                genreFilter={genreFilter}
                statusFilter={statusFilter}
                uniqueGenres={uniqueGenres}
                onGenreChange={handleGenreFilter}
                onStatusChange={handleStatusFilter}
              />
            </div>
          </div>
        </motion.div>

        {/* Results Summary and View Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex justify-between items-center"
        >
          <p className="text-gray-600">
            Showing {books.length} of {totalBooks} books
            {searchTerm && ` for "${searchTerm}"`}
            {genreFilter && ` in ${genreFilter}`}
            {statusFilter && ` with status ${statusFilter}`}
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18m-9 8h9m-9 4h9m-9-8h9m-9 4h9" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Books Display */}
        {loading ? (
          <LoadingSkeleton rows={6} />
        ) : books.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || genreFilter || statusFilter
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first book'}
              </p>
              {!searchTerm && !genreFilter && !statusFilter && (
                <Button variant="success" onClick={handleAddBook}>
                  Add Your First Book
                </Button>
              )}
            </div>
          </motion.div>
        ) : viewMode === 'table' ? (
          <BookTable books={books} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onConfirm={handleDeleteConfirm}
          onCancel={hideDeleteConfirm}
          title="Delete Book"
          message={`Are you sure you want to delete "${bookToDelete?.title}"? This action cannot be undone.`}
          loading={loading}
        />
    </div>
  );
};

export default Dashboard;