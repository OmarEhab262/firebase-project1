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
} from "firebase/firestore";

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

// Initialize Firestore
const db = getFirestore();
const colRef = collection(db, "books");

// Queries collection
const biggerThan100 = query(
  colRef,
  where("price", ">", 100),
  orderBy("createAt", "desc")
);
const smallerThan100 = query(
  colRef,
  where("price", "<", 100),
  orderBy("createAt", "desc")
);
const allBooksSorted = query(colRef, orderBy("createAt", "desc"));

// Function to fetch books data
export const getBooks = async (queryType) => {
  try {
    // Select query based on queryType
    const selectedQuery = !queryType
      ? allBooksSorted // All books sorted by createAt
      : queryType === "small"
      ? smallerThan100 // Books with price < 100 sorted by createAt
      : biggerThan100; // Books with price > 100 sorted by createAt

    // Fetch data
    const snapshot = await getDocs(selectedQuery);
    const books = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    console.log("books", books);
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// Function to add a new book
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

// Function to delete a book
export const deleteBook = async (bookId) => {
  try {
    await deleteDoc(doc(db, "books", bookId));
    console.log("Book deleted successfully!");
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

// Function to search books based on title
export const searchBooks = async (searchQuery) => {
  try {
    if (!searchQuery || searchQuery.trim() === "") {
      console.log("Search query is empty!");
      return [];
    }

    // Create a query to search for books where the title matches the searchQuery
    const searchTitleQuery = query(
      colRef,
      where("title", ">=", searchQuery),
      where("title", "<=", searchQuery + "\uf8ff")
    );

    // Execute the query
    const snapshot = await getDocs(searchTitleQuery);

    if (snapshot.empty) {
      console.log("No books found matching the search query.");
      return [];
    }

    // Map the results to get the book data
    const books = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    console.log("Search results:", books); // Make sure this shows in the console
    return books;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
};
