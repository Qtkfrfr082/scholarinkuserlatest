import React, { useState } from 'react';

const BookCategories = () => {
  const categories = ['All', 'Fiction', 'Non-Fiction', 'Science', 'Romance', 'Mystery', 'Fantasy', 'History', 'Biography', 'Young Adult', 'Children'];

  const books = [
    { id: 1, title: 'The Great Gatsby', category: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'To Kill a Mockingbird', category: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: 3, title: '1984', category: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: 4, title: 'The Catcher in the Rye', category: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: 5, title: 'The Road', category: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: 6, title: 'Brave New World', category: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: 7, title: 'Fahrenheit 451', category: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: 8, title: 'The Grapes of Wrath', category: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: 9, title: 'Catch-22', category: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: 10, title: 'Animal Farm', category: 'Fiction', image: 'https://via.placeholder.com/150' },

  // Non-Fiction
  { id: 11, title: 'Sapiens', category: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: 12, title: 'Educated', category: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: 13, title: 'Becoming', category: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: 14, title: 'The Immortal Life of Henrietta Lacks', category: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: 15, title: 'Unbroken', category: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: 16, title: 'The Wright Brothers', category: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: 17, title: 'Into the Wild', category: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: 18, title: 'The Glass Castle', category: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: 19, title: 'The Diary of a Young Girl', category: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: 20, title: 'Born a Crime', category: 'Non-Fiction', image: 'https://via.placeholder.com/150' },

  // Science
  { id: 21, title: 'A Brief History of Time', category: 'Science', image: 'https://via.placeholder.com/150' },
  { id: 22, title: 'The Selfish Gene', category: 'Science', image: 'https://via.placeholder.com/150' },
  { id: 23, title: 'Astrophysics for People in a Hurry', category: 'Science', image: 'https://via.placeholder.com/150' },
  { id: 24, title: 'The Gene: An Intimate History', category: 'Science', image: 'https://via.placeholder.com/150' },
  { id: 25, title: 'Cosmos', category: 'Science', image: 'https://via.placeholder.com/150' },
  { id: 26, title: 'The Structure of Scientific Revolutions', category: 'Science', image: 'https://via.placeholder.com/150' },
  { id: 27, title: 'The Man Who Knew Infinity', category: 'Science', image: 'https://via.placeholder.com/150' },
  { id: 28, title: 'Silent Spring', category: 'Science', image: 'https://via.placeholder.com/150' },
  { id: 29, title: 'The Double Helix', category: 'Science', image: 'https://via.placeholder.com/150' },
  { id: 30, title: 'What If? Serious Scientific Answers to Absurd Hypothetical Questions', category: 'Science', image: 'https://via.placeholder.com/150' },

  // Romance
  { id: 31, title: 'Pride and Prejudice', category: 'Romance', image: 'https://via.placeholder.com/150' },
  { id: 32, title: 'The Fault in Our Stars', category: 'Romance', image: 'https://via.placeholder.com/150' },
  { id: 33, title: 'Outlander', category: 'Romance', image: 'https://via.placeholder.com/150' },
  { id: 34, title: 'The Notebook', category: 'Romance', image: 'https://via.placeholder.com/150' },
  { id: 35, title: 'Me Before You', category: 'Romance', image: 'https://via.placeholder.com/150' },
  { id: 36, title: 'It Ends with Us', category: 'Romance', image: 'https://via.placeholder.com/150' },
  { id: 37, title: '50 Shades of Grey', category: 'Romance', image: 'https://via.placeholder.com/150' },
  { id: 38, title: 'The Hating Game', category: 'Romance', image: 'https://via.placeholder.com/150' },
  { id: 39, title: 'Red, White & Royal Blue', category: 'Romance', image: 'https://via.placeholder.com/150' },
  { id: 40, title: 'Beach Read', category: 'Romance', image: 'https://via.placeholder.com/150' },

  // Mystery
  { id: 41, title: 'Sherlock Holmes', category: 'Mystery', image: 'https://via.placeholder.com/150' },
  { id: 42, title: 'Gone Girl', category: 'Mystery', image: 'https://via.placeholder.com/150' },
  { id: 43, title: 'The Girl with the Dragon Tattoo', category: 'Mystery', image: 'https://via.placeholder.com/150' },
  { id: 44, title: 'Big Little Lies', category: 'Mystery', image: 'https://via.placeholder.com/150' },
  { id: 45, title: 'The Woman in the Window', category: 'Mystery', image: 'https://via.placeholder.com/150' },
  { id: 46, title: 'The Da Vinci Code', category: 'Mystery', image: 'https://via.placeholder.com/150' },
  { id: 47, title: 'The Cuckoo\'s Calling', category: 'Mystery', image: 'https://via.placeholder.com/150' },
  { id: 48, title: 'The Silent Patient', category: 'Mystery', image: 'https://via.placeholder.com/150' },
  { id: 49, title: 'Sharp Objects', category: 'Mystery', image: 'https://via.placeholder.com/150' },
  { id: 50, title: 'The No. 1 Ladies\' Detective Agency', category: 'Mystery', image: 'https://via.placeholder.com/150' },

  // Fantasy
  { id: 51, title: 'Harry Potter and the Sorcerer\'s Stone', category: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: 52, title: 'The Hobbit', category: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: 53, title: 'A Game of Thrones', category: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: 54, title: 'The Name of the Wind', category: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: 55, title: 'Mistborn', category: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: 56, title: 'The Way of Kings', category: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: 57, title: 'American Gods', category: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: 58, title: 'The Night Circus', category: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: 59, title: 'Good Omens', category: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: 60, title: 'The Lies of Locke Lamora', category: 'Fantasy', image: 'https://via.placeholder.com/150' },

  // History
  { id: 61, title: 'World War II', category: 'History', image: 'https://via.placeholder.com/150' },
  { id: 62, title: 'The Diary of a Young Girl', category: 'History', image: 'https://via.placeholder.com/150' },
  { id: 63, title: 'A People\'s History of the United States', category: 'History', image: 'https://via.placeholder.com/150' },
  { id: 64, title: 'The History of the Ancient World', category: 'History', image: 'https://via.placeholder.com/150' },
  { id: 65, title: 'Guns, Germs, and Steel', category: 'History', image: 'https://via.placeholder.com/150' },
  { id: 66, title: 'The Wright Brothers', category: 'History', image: 'https://via.placeholder.com/150' },
  { id: 67, title: 'The Immortal Life of Henrietta Lacks', category: 'History', image: 'https://via.placeholder.com/150' },
  { id: 68, title: 'The Great War', category: 'History', image: 'https://via.placeholder.com/150' },
  { id: 69, title: 'Alexander Hamilton', category: 'History', image: 'https://via.placeholder.com/150' },
  { id: 70, title: 'The History of the Peloponnesian War', category: 'History', image: 'https://via.placeholder.com/150' },

  // Biography
  { id: 71, title: 'Steve Jobs', category: 'Biography', image: 'https://via.placeholder.com/150' },
  { id: 72, title: 'Becoming', category: 'Biography', image: 'https://via.placeholder.com/150' },
  { id: 73, title: 'The Story of My Life', category: 'Biography', image: 'https://via.placeholder.com/150' },
  { id: 74, title: 'I Am Malala', category: 'Biography', image: 'https://via.placeholder.com/150' },
  { id: 75, title: 'When Breath Becomes Air', category: 'Biography', image: 'https://via.placeholder.com/150' },
  { id: 76, title: 'The Glass Castle', category: 'Biography', image: 'https://via.placeholder.com/150' },
  { id: 77, title: 'The Immortal Life of Henrietta Lacks', category: 'Biography', image: 'https://via.placeholder.com/150' },
  { id: 78, title: 'Educated', category: 'Biography', image: 'https://via.placeholder.com/150' },
  { id: 79, title: 'Becoming', category: 'Biography', image: 'https://via.placeholder.com/150' },
  { id: 80, title: 'Just as I Am', category: 'Biography', image: 'https://via.placeholder.com/150' },

  // Young Adult
  { id: 81, title: 'The Hunger Games', category: 'Young Adult', image: 'https://via.placeholder.com/150' },
  { id: 82, title: 'The Fault in Our Stars', category: 'Young Adult', image: 'https://via.placeholder.com/150' },
  { id: 83, title: 'Looking for Alaska', category: 'Young Adult', image: 'https://via.placeholder.com/150' },
  { id: 84, title: 'Eleanor & Park', category: 'Young Adult', image: 'https://via.placeholder.com/150' },
  { id: 85, title: 'Six of Crows', category: 'Young Adult', image: 'https://via.placeholder.com/150' },
  { id: 86, title: 'The Perks of Being a Wallflower', category: 'Young Adult', image: 'https://via.placeholder.com/150' },
  { id: 87, title: 'Cinder', category: 'Young Adult', image: 'https://via.placeholder.com/150' },
  { id: 88, title: 'The Hate U Give', category: 'Young Adult', image: 'https://via.placeholder.com/150' },
  { id: 89, title: 'The Sun is Also a Star', category: 'Young Adult', image: 'https://via.placeholder.com/150' },
  { id: 90, title: 'They Both Die at the End', category: 'Young Adult', image: 'https://via.placeholder.com/150' },

  // Children
  { id: 91, title: 'Charlotte\'s Web', category: 'Children', image: 'https://via.placeholder.com/150' },
  { id: 92, title: 'Harry Potter and the Sorcerer\'s Stone', category: 'Children', image: 'https://via.placeholder.com/150' },
  { id: 93, title: 'The Very Hungry Caterpillar', category: 'Children', image: 'https://via.placeholder.com/150' },
  { id: 94, title: 'Where the Wild Things Are', category: 'Children', image: 'https://via.placeholder.com/150' },
  { id: 95, title: 'Goodnight Moon', category: 'Children', image: 'https://via.placeholder.com/150' },
  { id: 96, title: 'The Gruffalo', category: 'Children', image: 'https://via.placeholder.com/150' },
  { id: 97, title: 'Brown Bear, Brown Bear, What Do You See?', category: 'Children', image: 'https://via.placeholder.com/150' },
  { id: 98, title: 'The Cat in the Hat', category: 'Children', image: 'https://via.placeholder.com/150' },
  { id: 99, title: 'The Snowy Day', category: 'Children', image: 'https://via.placeholder.com/150' },
  { id: 100, title: 'Oh, the Places You\'ll Go!', category: 'Children', image: 'https://via.placeholder.com/150' },
];

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter books based on selected category
  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(book => book.category === selectedCategory);

  return (
    <div>
      {/* Scrollable Categories */}
      <div className="w-full overflow-x-scroll mt-4 scrollbar-hide">
        <div className="flex space-x-4 p-2">
          {categories.map((category, index) => (
            <button 
              key={index}
              onClick={() => setSelectedCategory(category)} // Set selected category
              className={`inline-flex items-center justify-center px-6 py-2 rounded-full transition-all whitespace-nowrap  ${
                selectedCategory === category ? 'bg-emerald-600 text-black focus:outline-none' : 'bg-emerald-500 text-black hover:bg-emerald-800'
              }`}
              style={{ border: 'none' }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Books */}
      <div className="w-full overflow-x-scroll mt-6 scrollbar-hide">
        <div className="flex space-x-4 pl-4 pr-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="min-w-[110px]">
              <img src={book.image} alt={book.title} className="w-full h-44  rounded-lg shadow-lg" />
              <h3 className="mt-2 text-center text-black">{book.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCategories;
