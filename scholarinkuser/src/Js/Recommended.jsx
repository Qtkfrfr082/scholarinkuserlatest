import React from 'react';
import '../Css/Recommended.css';

const BooksCarousel1 = () => {
  const books = [
    { id: 1, title: 'Book 1', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Book 2', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Book 3', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Book 4', image: 'https://via.placeholder.com/150' },
    { id: 5, title: 'Book 5', image: 'https://via.placeholder.com/150' },
    { id: 6, title: 'Book 6', image: 'https://via.placeholder.com/150' },
    { id: 7, title: 'Book 7', image: 'https://via.placeholder.com/150' },
  ];

  return (


    <div className="w-full overflow-x-scroll mt-16 scrollbar-hide">
        
      <div className="flex space-x-4">
        {books.map((book) => (
          <div key={book.id} className="min-w-[150px]">
            <img src={book.image} alt={book.title} className="w-full h-auto rounded-lg shadow-lg" />
            <h3 className="mt-2 text-center">{book.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksCarousel1;