import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToReadingList } from '../../store/readingListSlice';
import ReadingList from './ReadingList';
import Logout from '../Login&Signup/Logout';
import axios from 'axios';
import BookSearchList from './BookSearchList'; 
import BookRecommendation from './BookRecommendation';

const Hero = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const dispatch = useDispatch();

    const fetchBooks = async () => {
        if (searchTerm) {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
            setBooks(response.data.items || []);
        } else {
            setBooks([]);
        }
    };

    const addToList = (book) => {
        dispatch(addToReadingList(book));
    };

    const clearSearch = () => {
        setSearchTerm('');
        setBooks([]);
    };

    return (
        <div className='flex flex-col items-center w-full gap-5 mt-5 '>
            <div className='w-[90%] flex justify-between items-center'>
                <h1 className="text-[36px] max-xl:text-[26px] tracking-tight font-semibold text-[#175574]">&quot;Book Recommendation System&quot;</h1>
                <form onSubmit={(e) => { e.preventDefault(); fetchBooks(); }} className="flex items-center space-x-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search by title, author, or genre"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-[350px] max-xl:w-[250px] focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full px-3 py-1"
                            >
                                X
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-lg px-4 py-2 max-xl:px-2 hover:bg-blue-600 transition duration-300"
                    >
                        Search
                    </button>
                </form>
                <Logout />
            </div>
            <div className="w-[90%] flex justify-center gap-10 p-6">
                <ReadingList />
                {/* Use the BookList component here */}
                <BookSearchList books={books} addToList={addToList} />
                <BookRecommendation/>
            </div>
        </div>
    );
};

export default Hero;
