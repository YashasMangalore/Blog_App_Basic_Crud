import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const getData = async () => {
      const data = await fetch("http://localhost:8080/blogs");
      const json = await data.json();
      setBlogs(json);
    };
    getData();
  }, []);

  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-6">
      {blogs &&
        blogs.map((item, index) => {
          return (
            <div
              key={index}
              className="flex border border-gray-300 shadow-lg rounded-lg w-full md:w-5/12 p-6 mx-auto mt-6 bg-gradient-to-r from-blue-400 via-blue-500 to-gray-500 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-400 hover:via-yellow-500 hover:to-red-500 animate-fadeIn"
            >
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-white">{item.content}</p>
                <h3 className="mt-4 text-lg text-gray-100 italic">
                  Written by: {item.author}
                </h3>

                {/* Date Published */}
                <p className="mt-2 text-sm text-gray-200">
                  Published on: {formatDate(item.datePublished)}
                </p>
              </div>
              <div onClick=
                {
                  async () =>
                  {
                    // console.log(item.id);
                    const data = await fetch(`http://localhost:8080/delete/${item.id}`,
                      {
                        method: "DELETE",
                      }
                    );

                    const json = await data.json();
                    // console.log(json);
                    setBlogs(json);
                  }
                } className="cursor-pointer flex items-center ">🗑️
              </div>
              <div onClick={async () => {
                navigate(`/edit/${item.id}`)
              }} className="cursor-pointer flex items-center ">✏️</div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
