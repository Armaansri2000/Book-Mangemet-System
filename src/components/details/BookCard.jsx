/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../model/Button';
import { useApp } from '../../context/AppContext.jsx';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { showDeleteConfirmDialog } = useApp();

  const handleEdit = () => {
    navigate(`/edit-book/${book._id || book._id}`);
  };

  const handleDelete = () => {
    showDeleteConfirmDialog(book);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {book.genre}
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
              {book.publishedYear}
            </span>
            <span
              className={`px-2 py-1 rounded ${
                book.status === 'Available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {book.status}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleEdit}
          className="flex-1"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          className="flex-1"
        >
          Delete
        </Button>
      </div>
    </motion.div>
  );
};

export default BookCard;