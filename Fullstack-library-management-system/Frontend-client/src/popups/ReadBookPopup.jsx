import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { closeAllPopup, toggleRecordBookPopup } from "../store/slices/popUpSlice";

const ReadBookPopup = () => {
  const dispatch = useDispatch();
  const { selectedBook } = useSelector((state) => state.popup);

  if (!selectedBook) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        {/* Cross Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={() => dispatch(closeAllPopup())}
        >
          <X size={22} />
        </button>

        {/* Book Details */}
        <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
        <p className="text-gray-600 mb-4">By {selectedBook.author}</p>
        <p className="mb-4 text-gray-700">{selectedBook.description}</p>
        <p className="font-semibold">₹{selectedBook.price}</p>
        <p className="text-sm text-gray-500">Available: {selectedBook.quantity}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
        </div>
      </div>
    </div>
  );
};

export default ReadBookPopup;
