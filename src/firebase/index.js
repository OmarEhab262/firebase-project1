// Import Firebase modules
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACd-s3sFK0ROyCGxC9PJeZApQ4AKgy6MU",
  authDomain: "project1-7313d.firebaseapp.com",
  projectId: "project1-7313d",
  storageBucket: "project1-7313d.firebasestorage.app",
  messagingSenderId: "805105555062",
  appId: "1:805105555062:web:c0b4850f5044f3a7c5f157",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore();
const auth = getAuth();

// Reference to the "books" collection
const colRef = collection(db, "books");

// Query definitions
const biggerThan100 = query(
  colRef,
  where("price", ">", 100),
  orderBy("createAt", "desc")
); // Books with price > 100, sorted by createAt
const smallerThan100 = query(
  colRef,
  where("price", "<", 100),
  orderBy("createAt", "desc")
); // Books with price < 100, sorted by createAt
const allBooksSorted = query(colRef, orderBy("createAt", "desc")); // All books, sorted by createAt

/**
 * Fetch books from Firestore based on query type
 * @param {string|null} queryType - Type of query ("small" for books < 100, otherwise books > 100)
 * @returns {Promise<Array>} - Array of book objects
 */
export const getBooks = async (queryType) => {
  try {
    const selectedQuery =
      !queryType || queryType === "all"
        ? allBooksSorted
        : queryType === "small"
        ? smallerThan100
        : biggerThan100;

    const snapshot = await getDocs(selectedQuery);
    const books = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    console.log("Fetched books:", books);
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

/**
 * Add a new book to Firestore
 * @param {Object} book - Book details (title, author, price)
 */
export const addBook = async (book) => {
  try {
    await addDoc(colRef, {
      title: book.title,
      author: book.author,
      price: Number(book.price),
      createAt: serverTimestamp(),
    });
    console.log("Book added successfully!");
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

/**
 * Delete a book from Firestore
 * @param {string} bookId - ID of the book to delete
 */
export const deleteBook = async (bookId) => {
  try {
    await deleteDoc(doc(db, "books", bookId));
    console.log("Book deleted successfully!");
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

/**
 * Search for books by title
 * @param {string} searchQuery - Title to search for
 * @returns {Promise<Array>} - Array of book objects matching the query
 */
export const searchBooks = async (searchQuery) => {
  try {
    if (!searchQuery || searchQuery.trim() === "") {
      console.log("Search query is empty!");
      return [];
    }

    const searchTitleQuery = query(
      colRef,
      where("title", ">=", searchQuery),
      where("title", "<=", searchQuery + "\uf8ff")
    );

    const snapshot = await getDocs(searchTitleQuery);

    if (snapshot.empty) {
      console.log("No books found matching the search query.");
      return [];
    }

    const books = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    console.log("Search results:", books);
    return books;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
};

/**
 * Update a book in Firestore
 * @param {string} bookId - ID of the book to update
 * @param {Object} updatedBook - Updated book details (title, author, price)
 */
export const updateBook = async (bookId, updatedBook) => {
  try {
    await updateDoc(doc(db, "books", bookId), {
      title: updatedBook.title,
      author: updatedBook.author,
      price: Number(updatedBook.price),
    });
    console.log("Book updated successfully!");
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

/**
 * Sign up a new user
 * @param {string} email - User email
 * @param {string} password - User password
 */
export const signup = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up successfully!", user);
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

/**
 * Log in an existing user
 * @param {string} email - User email
 * @param {string} password - User password
 */
export const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully!", user);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

/**
 * Log out the current user
 */
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
