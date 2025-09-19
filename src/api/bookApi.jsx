

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const bookApi = {
  // Get all books
  getBooks: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      return { data };
    } catch (error) {
      throw new Error('Failed to fetch books');
    }
  },

  // Get book by ID
  getBookById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Book not found');
      }
      const data = await response.json();
      return { data };
    } catch (error) {
      throw new Error('Failed to fetch book');
    }
  },

  // Create new book
  createBook: async (bookData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error('Failed to create book');
      }
      const data = await response.json();
      return { data };
    } catch (error) {
      throw new Error('Failed to create book');
    }
  },

  // Update book
  updateBook: async (id, bookData) => {
  console.log("_bookData", bookData);
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    });
    console.log("armaan", response);

    if (!response.ok) {
      console.log("dydty");
      throw new Error('Failed to update book');
    }

    let data = {};
    const text = await response.text();
    if (text) {
      data = JSON.parse(text);
    }

    console.log("data", data);

    return { data: { ...bookData, _id: id } }; // return original bookData with _id
  } catch (error) {
    console.log("Error caught:", error);
    throw new Error('Failed to update book');
  }
},


  // Delete book
  deleteBook: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      return { data: { id } };
    } catch (error) {
      throw new Error('Failed to delete book');
    }
  },
};

export default bookApi;