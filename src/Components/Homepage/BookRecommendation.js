import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BookRecommendation = () => {
    const readingList = useSelector((state) => state.readingList.readingList); // Access reading list from Redux
    const [recommendedBooks, setRecommendedBooks] = useState([]);

    useEffect(() => {
        const fetchRecommendedBooks = async () => {
            const authorsSet = new Set();
            const genresSet = new Set();

            // Collect author names and genres from the reading list
            readingList.forEach((book) => {
                const authors = book.volumeInfo.authors;
                const categories = book.volumeInfo.categories;

                if (authors) {
                    authors.forEach(author => authorsSet.add(author));
                }

                if (categories) {
                    categories.forEach(genre => genresSet.add(genre));
                }
            });

            const authorQuery = Array.from(authorsSet).map(author => `inauthor:${author}`).join(' OR ');
            const genreQuery = Array.from(genresSet).map(genre => `subject:${genre}`).join(' OR ');

            try {
                let books = [];
                // Fetch books by authors
                if (authorQuery) {
                    const authorResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(authorQuery)}`);
                    books = [...(authorResponse.data.items || [])];
                }

                // Fetch books by genres
                if (genreQuery) {
                    const genreResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(genreQuery)}`);
                    books = [...books, ...(genreResponse.data.items || [])];
                }

                setRecommendedBooks(books);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        if (readingList.length > 0) {
            fetchRecommendedBooks();
        }
    }, [readingList]);

    return (
        <div className="w-[500px] rounded-[20px] shadow-xl p-4 bg-white h-[600px] overflow-scroll">
            <h2 className="text-xl font-semibold text-[#175574] mb-4">Recommended Books</h2>
            {recommendedBooks.length > 0 ? (
                <ul className="space-y-4">
                    {recommendedBooks.map((book) => (
                        <li key={book.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-start">
                            {book.volumeInfo.imageLinks?.thumbnail ? (
                                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="w-14 h-15 mr-4" />
                            ) : (
                                <div className="w-14 h-15 mr-4 bg-gray-300 flex items-center justify-center">No Image</div>
                            )}
                            <div className="flex justify-between w-full">
                                <div>
                                    <h3 className="text-md font-semibold">{book.volumeInfo.title}</h3>
                                    <p className="text-gray-600 text-sm">{book.volumeInfo.authors?.join(', ')}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No recommendations available yet. Add some books to your reading list to get recommendations.</p>
            )}
        </div>
    );
};

export default BookRecommendation;
