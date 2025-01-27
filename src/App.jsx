import { useState, useEffect } from "react";
import { getBooks, addBook, deleteBook, searchBooks } from "./firebase/index";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [books, setBooks] = useState([]); // State to hold books data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [searchBook, setSearchBook] = useState("");
  const [addBookk, setAddBook] = useState({
    title: "",
    author: "",
    price: "",
  }); // State for new book details

  useEffect(() => {
    // Fetch books when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async (query) => {
    setLoading(true);
    try {
      const data = await getBooks(query);
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddBook((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addBooks = async (e) => {
    e.preventDefault();
    try {
      await addBook(addBookk);
      setAddBook({ title: "", author: "", price: "" }); // Clear form fields
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  const deleteBooks = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const searchTitle = async (e) => {
    e.preventDefault();
    try {
      const searchResults = await searchBooks(searchBook); // Get search results
      setBooks(searchResults); // Update the books state with the search results
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setSearchBook("");
    }
  };

  return (
    <div className="p-4 ">
      <h1 className="text-3xl font-bold underline">Book List</h1>

      <form className="max-w-md m-5" onSubmit={searchTitle}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by title"
            required
            onChange={(e) => setSearchBook(e.target.value)}
            value={searchBook}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="grid min-h-[140px] w-full place-items-center  rounded-lg p-6 lg:overflow-visible">
          <svg
            className="text-gray-300 animate-spin"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-900"
            ></path>
          </svg>
        </div>
      ) : books.length > 0 ? (
        <>
          <div>
            <h2 className="text-2xl font-bold underline  text-center">Sort</h2>
            <div className="flex justify-around flex-wrap gap-4 m-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => fetchBooks("big")}
              >
                Price {">"} 100
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => fetchBooks()}
              >
                All Books
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => fetchBooks("small")}
              >
                Price {"<"} 100
              </button>
            </div>
          </div>
          <div className="list-disc pl-6 mt-4 flex flex-wrap justify-around gap-4">
            {books.map((book, index) => (
              <div
                key={book.id}
                className="mb-2 flex flex-col justify-around  bg-amber-100 p-5 rounded-2xl w-[350px] h-[200px]"
              >
                <p>
                  <span className="font-bold"> {index + 1}-</span> {book.id}
                </p>
                <div className="flex justify-around items-center gap-11">
                  <div>
                    <h2 className="font-bold text-2xl">Name: {book.title}</h2>
                    <p>Author: {book.author}</p>
                    <p>
                      Price:{" "}
                      <span className="text-green-500 font-semibold">
                        {book.price}$
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {" "}
                    <button
                      onClick={() => deleteBooks(book.id)}
                      className="bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                    <Modal data={book} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>No books found.</p>

          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reload Page
          </button>
        </>
      )}

      <h1 className="text-3xl font-bold underline mt-10">Add New Book</h1>
      <form
        className="flex flex-col gap-4 p-5 w-[300px] bg-blue-200 rounded-[10px] m-5"
        onSubmit={addBooks}
      >
        <input
          className="border border-gray-500 p-2 rounded-[5px]"
          type="text"
          name="title"
          placeholder="Title"
          value={addBookk.title}
          onChange={handleChange}
        />
        <input
          className="border border-gray-500 p-2 rounded-[5px]"
          type="text"
          name="author"
          placeholder="Author"
          value={addBookk.author}
          onChange={handleChange}
        />
        <input
          className="border border-gray-500 p-2 rounded-[5px]"
          type="number"
          name="price"
          placeholder="Price"
          value={addBookk.price}
          onChange={handleChange}
        />
        <button
          className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded cursor-pointer"
          type="submit"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default App;
