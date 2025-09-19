/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import Input from '../../components/model/Input.jsx';
import Dropdown from '../../components/model/Dropdown.jsx';
import Button from '../../components/model/Button.jsx';
import Modal from '../../components/model/Modal.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { useBookPresenter } from '../../show/BookShow.jsx';

const BookForm = () => {
  const { isModalOpen, modalType, selectedBook, closeModal } = useApp();
  const { createBook, editBook, loading } = useBookPresenter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: selectedBook || {
      title: '',
      author: '',
      genre: '',
      publishedYear: new Date().getFullYear(),
      status: 'Available',
    },
  });

  React.useEffect(() => {
    if (selectedBook) {
      reset(selectedBook);
    } else {
      reset({
        title: '',
        author: '',
        genre: '',
        publishedYear: new Date().getFullYear(),
        status: 'Available',
      });
    }
  }, [selectedBook, reset]);

  const onSubmit = async (data) => {
    try {
      if (modalType === 'edit' && selectedBook) {
        await editBook(selectedBook.id, data);
      } else {
        await createBook(data);
      }
      reset();
    } catch (error) {
      // Error handling is done in the presenter
    }
  };

  const handleClose = () => {
    reset();
    closeModal();
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
    <Modal
      isOpen={isModalOpen && (modalType === 'add' || modalType === 'edit')}
      onClose={handleClose}
      title={modalType === 'edit' ? 'Edit Book' : 'Add New Book'}
    >
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
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
            onClick={handleClose}
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
            {modalType === 'edit' ? 'Update Book' : 'Add Book'}
          </Button>
        </div>
      </motion.form>
    </Modal>
  );
};

export default BookForm;