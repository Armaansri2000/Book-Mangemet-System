export class Book {
  constructor(data = {}) {
    this.id = data._id || data.id || null;
    this._id = data._id || null;
    this.title = data.title || '';
    this.author = data.author || '';
    this.genre = data.genre || '';
    this.publishedYear = data.publishedYear || new Date().getFullYear();
    this.status = data.status || 'Available';
  }

  static fromApi(apiData) {
    return new Book({
      ...apiData,
      id: apiData._id || apiData.id,
      _id: apiData._id,
    });
  }

  toApi() {
    return {
      title: this.title,
      author: this.author,
      genre: this.genre,
      publishedYear: this.publishedYear,
      status: this.status,
    };
  }

  validate() {
    const errors = {};
    
    if (!this.title.trim()) errors.title = 'Title is required';
    if (!this.author.trim()) errors.author = 'Author is required';
    if (!this.genre.trim()) errors.genre = 'Genre is required';
    if (!this.publishedYear || this.publishedYear < 1000 || this.publishedYear > new Date().getFullYear()) {
      errors.publishedYear = 'Valid published year is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}