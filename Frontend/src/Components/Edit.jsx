import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // To navigate after successful submission

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [datePublished, setDatePublished] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`http://localhost:8080/edit/${id}`);
      const json = await data.json();
      const { author, title, content, datePublished } = json;

      setAuthor(author);
      setContent(content);
      setDatePublished(datePublished);
      setTitle(title);
    };
    getData();
  }, [id]); // Corrected to trigger when 'id' changes

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated blog data
    const updatedBlog = {
      author,
      title,
      content,
      datePublished,
    };

    try {
      const response = await fetch(`http://localhost:8080/edit/${id}`, {
        method: "POST", // Using PUT to update the resource
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });

      if (response.ok) {
        // If the update is successful, redirect to the home page or blog page
        alert("Blog updated successfully!");
        navigate("/"); // Redirect to the home page after successful update
      } else {
        alert("Failed to update the blog");
      }
    } catch (error) {
      console.error("Error updating the blog:", error);
      alert("An error occurred while updating the blog");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Blog</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="datePublished"
            className="block text-sm font-medium text-gray-700"
          >
            Date Published
          </label>
          <input
            type="date"
            name="datePublished"
            id="datePublished"
            value={datePublished}
            onChange={(e) => setDatePublished(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button onClick={async() => {
            await fetch(`http://localhost:8080/edit/${id}`, {
              method: "POST", // Using PUT to update the resource
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                author: author,
                content: content,
                datePublished: datePublished,
                title:title
              })
            })
            navigate("/")
          }}
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
