import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './booklist.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          'https://openlibrary.org/search.json?q=popular&fields=title,author_name,first_publish_year,isbn,number_of_pages_median&limit=20'
        );
        
        const booksData = response.data.docs.filter(book => book.title && book.author_name);
        setBooks(booksData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const getFirstValue = (array) => {
    return Array.isArray(array) && array.length > 0 ? array[0] : 'No disponible';
  };

  return (
    <div className="book-list-container">
      <h1>Biblioteca Virtual</h1>
      {isLoading && !isError && <p>Cargando libros...</p>}
      {!isLoading && isError && <p>Error: No se pudieron cargar los libros</p>}
      {!isLoading && !isError && (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.key} className="book-card">
              <h2>{book.title}</h2>
              <div className="book-details">
                <p><strong>Año:</strong> {book.first_publish_year || 'No disponible'}</p>
                <p><strong>ISBN:</strong> {getFirstValue(book.isbn)}</p>
                <p><strong>Páginas:</strong> {book.number_of_pages_median || 'No disponible'}</p>
                <p><strong>Autor:</strong> {getFirstValue(book.author_name)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;