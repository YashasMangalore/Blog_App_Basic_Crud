import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
    const [datePublished, setDatePublished] = useState("");
   const navigate=useNavigate()

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Add a New Blog
      </h2>

      {/* Title Input */}
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        type="text"
        name="title"
        id="title"
        placeholder="Enter the blog title"
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Author Input */}
      <input
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
        value={author}
        type="text"
        name="author"
        id="author"
        placeholder="Enter the blog author name"
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Content Textarea */}
      <textarea
        onChange={(e) => {
          setContent(e.target.value);
        }}
        value={content}
        name="content"
        id="content"
        placeholder="Enter the blog content"
        rows="6" // Adds height to the textarea
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      {/* Date Published Input */}
      <input
        onChange={(e) => setDatePublished(e.target.value)}
        value={datePublished}
        type="date" // Use date type for date input
        name="datePublished"
        id="datePublished"
        placeholder="Enter the blog published date"
        className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit Button */}
      <button
        onClick={async () => {
          const data = await fetch("http://localhost:8080/newBlogs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              author: author,
              content: content,
              title: title,
              datePublished: datePublished,
            })
          })
        navigate("/home")
          // console.log(data);
        }}
        className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Blog
      </button>
    </div>
  );
};

export default Form;
