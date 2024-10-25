import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleReadStatus, removeFromReadingList } from '../../store/readingListSlice';

const ReadingList = () => {
    const readingList = useSelector((state) => state.readingList.readingList); // Get the reading list from Redux store
    const dispatch = useDispatch(); // Use Redux dispatch to trigger actions

    // Sort the books: unread books first
    const sortedReadingList = [...readingList].sort((a, b) => a.read - b.read);

    return (
        <div className='w-full rounded-[20px] shadow-xl p-4 bg-white '>
            <h2 className="text-xl font-semibold text-[#175574] mb-2 max-lg:text-sm">Your Reading List</h2>
            <ul className="space-x-4 flex w-full overflow-x-scroll">
                {sortedReadingList.length > 0 ? (
                    sortedReadingList.map((book) => (
                        <li key={book.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-start">
                            {book.volumeInfo.imageLinks?.thumbnail ? (
                                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="w-14 h-15 max-lg:w-11 max-lg:h-11 mr-4" />
                            ) : (
                                <div className="w-24 h-36 max-lg:w-11 max-lg:h-11 mr-4 bg-gray-300 flex items-center justify-center">No Image</div>
                            )}
                            <div className='flex flex-col justify-between h-full w-[300px] max-lg:w-[220px]'>
                                <h3 className="text-md max-lg:text-sm max-sm:text-[12px] font-semibold">{book.volumeInfo.title} {book.read ? '(Finished)' : '(Unread)'}</h3>
                                <div className='space-x-5 max-lg:space-x-2'>
                                    <button
                                        onClick={() => dispatch(toggleReadStatus(book.id))} // Dispatch toggleReadStatus action
                                        className={`mt-2 text-white max-lg:text-[12px] rounded-lg max-lg:rounded-md px-2 max-lg:p-1 text-sm py-2 transition duration-300 ${book.read ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
                                    >
                                        Change Status
                                    </button>
                                    <button
                                        onClick={() => dispatch(removeFromReadingList(book.id))} // Dispatch removeFromReadingList action
                                        className="mt-2 bg-red-500 text-white max-lg:text-[12px] rounded-lg max-lg:rounded-md max-lg:p-1 px-2 text-sm py-2 hover:bg-red-600 transition duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-600">Your reading list is empty.</p>
                )}
            </ul>
        </div>
    );
};

export default ReadingList;
