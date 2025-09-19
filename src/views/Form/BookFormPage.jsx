import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Input from '../../components/model/Input';
import Dropdown from '../../components/model/Dropdown';
import Button from '../../components/model/Button';
import { useBookPresenter } from '../../show/BookShow.jsx';

const BookFormPage = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createBook, editBook, loading } = useBookPresenter();
  const books = useSelector((state) => state.books.books);
  
  const selectedBook = mode === 'edit' ? books.find(book => book.id === id || book._id === id) : null;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      publishedYear: new Date().getFullYear(),
      status: 'Available',
    },
  });

  useEffect(() => {
    if (selectedBook) {
      reset(selectedBook);
    }
  }, [selectedBook, reset]);

  const onSubmit = async (data) => {
    try {
      if (mode === 'edit' && selectedBook) {
        await editBook(selectedBook._id || selectedBook._id, data);
      } else {
        await createBook(data);
      }
      navigate('/');
    } catch (error) {
      // Error handling is done in the presenter
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const genreOptions = [
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Non-Fiction', label: 'Non-Fiction' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Sci-Fi', label: 'Science Fiction' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Biography', label: 'Biography' },
    { value: 'History', label: 'History' },
    { value: 'Dystopian', label: 'Dystopian' },
  ];

  const statusOptions = [
    { value: 'Available', label: 'Available' },
    { value: 'Issued', label: 'Issued' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {mode === 'edit' ? 'Edit Book' : 'Add New Book'}
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Title"
            placeholder="Enter book title"
            required
            error={errors.title?.message}
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 2,
                message: 'Title must be at least 2 characters',
              },
            })}
          />

          <Input
            label="Author"
            placeholder="Enter author name"
            required
            error={errors.author?.message}
            {...register('author', {
              required: 'Author is required',
              minLength: {
                value: 2,
                message: 'Author name must be at least 2 characters',
              },
            })}
          />

          <Controller
            name="genre"
            control={control}
            rules={{ required: 'Genre is required' }}
            render={({ field }) => (
              <Dropdown
                label="Genre"
                required
                options={genreOptions}
                error={errors.genre?.message}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />

          <Input
            label="Published Year"
            type="number"
            placeholder="Enter published year"
            required
            error={errors.publishedYear?.message}
            {...register('publishedYear', {
              required: 'Published year is required',
              min: {
                value: 1000,
                message: 'Please enter a valid year',
              },
              max: {
                value: new Date().getFullYear(),
                message: 'Year cannot be in the future',
              },
            })}
          />

          <Controller
            name="status"
            control={control}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <Dropdown
                label="Status"
                required
                options={statusOptions}
                error={errors.status?.message}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="flex-1"
            >
              {mode === 'edit' ? 'Update Book' : 'Add Book'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BookFormPage;