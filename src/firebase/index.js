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
//queries collection

const biggerThan100 = query(colRef, where("price", ">", 100));
const smallerThan100 = query(colRef, where("price", "<", 100));

// Function to fetch books data
export const getBooks = async (queryType) => {
  try {
    let selectedQuery;

    // Determine which query to use based on queryType
    if (!queryType) {
      selectedQuery = colRef; // Fetch all books
    } else if (queryType === "big") {
      selectedQuery = biggerThan100; // Fetch books with price > 100
    } else if (queryType === "small") {
      selectedQuery = smallerThan100; // Fetch books with price < 100
    } else {
      throw new Error(
        "Invalid query type. Use 'big', 'small', or leave blank for all books."
      );
    }

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
