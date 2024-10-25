import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromReadingList, addToReadingList } from '../../store/readingListSlice';

const BookSearchList = ({ books }) => {
    const readingList = useSelector((state) => state.readingList.readingList); // Get the reading list from Redux store
    const dispatch = useDispatch();

    // Check if a book is already in the reading list
    const isBookInReadingList = (bookId) => {
        return readingList.some((book) => book.id === bookId);
    };

    // Handle adding/removing a book
    const handleAddOrRemove = (book) => {
        if (isBookInReadingList(book.id)) {
            dispatch(removeFromReadingList(book.id));
        } else {
            dispatch(addToReadingList(book));
        }
    };

    return (
        <ul className="space-y-4 h-[600px] overflow-scroll">
            {books.map((book) => (
                <li key={book.id} className="p-4 border border-gray-200 rounded-[20px] bg-white flex items-start">
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
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => handleAddOrRemove(book)}
                                className={`mt-2 ${isBookInReadingList(book.id) ? 'bg-gray-500' : 'bg-green-500'} text-sm text-white rounded-lg px-2 py-2 hover:bg-green-600 transition duration-300`}
                            >
                                {isBookInReadingList(book.id) ? 'Added' : 'Add'}
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BookSearchList;
