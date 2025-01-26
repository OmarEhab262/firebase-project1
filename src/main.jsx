import { createRoot } from "react-dom/client";
import "./index.css";
import "./firebase/index";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
