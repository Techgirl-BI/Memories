import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemory, setSelectedMemory] = useState(null);

  const [editingMemoryId, setEditingMemoryId] = useState(null);
  const [updatedMemory, setUpdatedMemory] = useState({
    title: "",
    content: "",
    image: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchMemories = async (page) => {
      try {
        const response = await axios.get(
          `https://memories-3.onrender.com/posts?page=${page}`
        );
        setMemories(response.data.data.docs);
      } catch (error) {
        console.error("Error fetching memories:", error);
      }
    };
    fetchMemories(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleMemoryClick = (id) => {
    navigate(`/memory/:${id}`);
    setSelectedMemory(memory);
  };

  const handleCloseDetails = () => {
    setSelectedMemory(null);
  };
  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "ug9gdloy");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dos7rwt0i/image/upload",
        formData
      );
      console.log("Image uploaded successfully:", response.data.secure_url);
      if (editingMemoryId !== null) {
        setUpdatedMemory((prevMemory) => ({
          ...prevMemory,
          image: response.data.secure_url,
        }));
      } else {
        setNewMemory((prevMemory) => ({
          ...prevMemory,
          image: response.data.secure_url,
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMemory((prevMemory) => ({
      ...prevMemory,
      [name]: value,
    }));
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMemory((prevMemory) => ({
      ...prevMemory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, page) => {
    e.preventDefault();
    try {
      await axios
        .post("https://memories-3.onrender.com/posts", newMemory)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setNewMemory({
        title: "",
        content: "",
        image: null,
      });
      const response = await axios.get(
        `https://memories-3.onrender.com/posts?page=${page}`
      );
      setMemories(response.data.data.docs);
    } catch (error) {
      console.error("Error adding new memory:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://memories-3.onrender.com/posts/${id}`);
      setMemories((prevMemories) =>
        prevMemories.filter((memory) => memory._id !== id)
      );
    } catch (error) {
      console.error("Error deleting memory:", error);
    }
  };

  const handleUpdate = async (id) => {
    setEditingMemoryId(id);
    const memoryToEdit = memories.find((memory) => memory._id === id);
    if (memoryToEdit) {
      setUpdatedMemory({
        title: memoryToEdit.title,
        content: memoryToEdit.content,
        image: memoryToEdit.image,
      });
    }
  };

  const handleEditSubmit = async (id, page) => {
    try {
      let imageToUpdate = updatedMemory.image;
      if (imageToUpdate === "" && editingMemoryId !== null) {
        const memoryToEdit = memories.find(
          (memory) => memory._id === editingMemoryId
        );
        if (memoryToEdit) {
          imageToUpdate = memoryToEdit.image;
        }
      }

      const memoryData = {
        title: updatedMemory.title,
        content: updatedMemory.content,
        image: imageToUpdate,
      };

      await axios.patch(`https://memories-3.onrender.com/posts/${id}`, memoryData);
      const response = await axios.get(
        `https://memories-3.onrender.com/posts?page=${page}`
      );
      setMemories(response.data.data.docs);
      setEditingMemoryId(null);
      setUpdatedMemory({
        title: "",
        content: "",
        image: "",
      });
    } catch (error) {
      console.error("Error updating memory:", error);
    }
  };

  const filteredMemories = memories.filter((memory) =>
    memory.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xlpy-8 px-4 flex justify-around">
        <div className="w-full md:w-1/3 pr-4 mb-8 md:mb-0 ml-10">
          <h1 className="text-3xl font-bold mb-8 mt-6">Add New Memory</h1>

          <form onSubmit={handleSubmit} className="max-w-lg">
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Title:</label>
              <input
                type="text"
                name="title"
                value={newMemory.title}
                onChange={handleInputChange}
                placeholder="E.g Vacation at Seychelles"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Content:
              </label>
              <textarea
                name="content"
                value={newMemory.content}
                onChange={handleInputChange}
                placeholder="Enter content"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Image:</label>
              <input
                type="file"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => uploadImage(e.target.files)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add Memory
            </button>
          </form>
          {newMemory.image && (
            <img
              src={newMemory.image}
              alt="Uploaded"
              style={{ width: "200px" }}
            />
          )}
        </div>
        <div className="w-full md:w-2/3 pl-4 ">
          <h1 className="text-3xl font-bold mb-8 mt-6">
            See All Your Memories Here
          </h1>
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full my-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredMemories.map((memory) => (
              <div
                key={memory._id}
                className="bg-white shadow-md rounded-md p-4 mb-4"
              >
                {editingMemoryId === memory._id ? (
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={updatedMemory.title}
                      onChange={handleUpdateInputChange}
                      required
                      className="border border-blue-400 rounded"
                    />
                    <textarea
                      name="content"
                      value={updatedMemory.content}
                      onChange={handleUpdateInputChange}
                      required
                      className="border border-yellow-400 rounded"
                    />
                    <input
                      type="file"
                      onChange={(e) => {
                        setUpdatedMemory((prevMemory) => ({
                          ...prevMemory,
                          image: URL.createObjectURL(e.target.files[0]),
                        }));
                      }}
                    />
                    <button
                      onClick={() => handleEditSubmit(memory._id, currentPage)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold mb-2">{memory.title}</h3>
                    <p>{memory.content}</p>
                    {memory.image && (
                      <img
                        src={memory.image}
                        alt="Memory"
                        className="mt-2 rounded-md"
                      />
                    )}
                    <button
                      onClick={() => handleDelete(memory._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(memory._id)}
                      className="bg-yellow-500 text-white px-4 ml-2 py-2 rounded-md mt-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleMemoryClick(memory._id)}
                      className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md mt-2"
                    >
                      See more
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center">
          <AiFillCaretLeft className="text-xl" />
          <button
            className=" mr ml-2 px-4 py-2 rounded-md text-lg bg-white hover:bg-green-100"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </div>
        <div className="flex items-center">
          <button
            className="px-4 py-2 rounded-md text-lg bg-white hover:bg-green-100"
            onClick={nextPage}
          >
            Next
          </button>
          <AiFillCaretRight className="text-xl ml-2" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
