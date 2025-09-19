/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import Dropdown from '../model/Dropdown';

const FilterBar = ({
  genreFilter,
  statusFilter,
  uniqueGenres,
  onGenreChange,
  onStatusChange,
}) => {
  const genreOptions = [
    { value: '', label: 'All Genres' },
    ...uniqueGenres.map(genre => ({
      value: genre,
      label: genre,
    }))
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Available', label: 'Available' },
    { value: 'Issued', label: 'Issued' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <div className="flex-1">
        <Dropdown
          value={genreFilter}
          onChange={(e) => onGenreChange(e.target.value)}
          options={genreOptions}
          placeholder="All Genres"
        />
      </div>
      <div className="flex-1">
        <Dropdown
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          options={statusOptions}
          placeholder="All Status"
        />
      </div>
    </motion.div>
  );
};

export default FilterBar;