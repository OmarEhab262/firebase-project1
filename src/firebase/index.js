import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
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

// Function to fetch books data
export const getBooks = async () => {
  try {
    const snapshot = await getDocs(colRef);
    const books = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
