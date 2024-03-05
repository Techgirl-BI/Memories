// MemoryDetails.js
import React from "react";

const MemoryDetails = ({ memory, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{memory.title}</h2>
        <p>{memory.content}</p>
        {memory.image && (
          <img src={memory.image} alt="Memory" className="mt-2 rounded-md" />
        )}
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default MemoryDetails;
