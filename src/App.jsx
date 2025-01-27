import { useState, useEffect } from "react";
import { getBooks, addBook, deleteBook } from "./firebase/index";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]); // State to hold books data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [addBookk, setAddBook] = useState({
    title: "",
    author: "",
    price: "",
  }); // State for new book details

  useEffect(() => {
    // Fetch books when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
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

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline">Book List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : books.length > 0 ? (
        <div className="list-disc pl-6 mt-4 flex flex-wrap justify-around gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="mb-2 flex flex-col justify-around  bg-amber-100 p-5 rounded-2xl w-[350px] h-[200px]"
            >
              <h3>ID: {book.id}</h3>
              <div className="flex justify-around items-center gap-11">
                <div>
                  <h2 className="font-bold text-2xl">Name: {book.title}</h2>
                  <p>Author: {book.author}</p>
                  <span>Price: {book.price}$</span>
                </div>
                <button
                  onClick={() => deleteBooks(book.id)}
                  className="bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No books found.</p>
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
