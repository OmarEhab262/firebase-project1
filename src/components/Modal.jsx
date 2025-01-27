import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { updateBook } from "../firebase";

const Modal = ({ data, idBook, fetchBooks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: data.title,
    author: data.author,
    price: data.price,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setIsOpen(false);
    updateBook(idBook, formData);
    fetchBooks();
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 rounded cursor-pointer"
        type="button"
      >
        Update
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <h3 className="text-2xl font-semibold text-slate-800">
                Simple Form
              </h3>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm text-slate-600">Title</label>
              <input
                type="text"
                name="title"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="w-full mt-4">
              <label className="block mb-2 text-sm text-slate-600">
                Author
              </label>
              <input
                type="text"
                name="author"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            <div className="w-full mt-4">
              <label className="block mb-2 text-sm text-slate-600">Price</label>
              <input
                type="text"
                name="price"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 justify-end mt-6">
              <button
                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none"
                type="button"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="rounded-md bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-slate-700 transition-all shadow-md hover:shadow-lg focus:bg-slate-300 focus:shadow-none active:bg-slate-300 hover:bg-slate-300 active:shadow-none"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Define PropTypes
Modal.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  idBook: PropTypes.string.isRequired,
  fetchBooks: PropTypes.func.isRequired,
};

export default Modal;
