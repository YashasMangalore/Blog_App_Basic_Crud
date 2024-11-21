import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home';
import Form from './Components/Form';
import Edit from './Components/Edit';

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true, // Opt into React.startTransition wrapping state updates
        v7_relativeSplatPath: true, // Opt into new behavior for relative splat routes
      }}
    >
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex space-x-6">
            <Link
              to="/new"
              className="text-lg font-semibold hover:text-blue-400 transition-all duration-300"
            >
              New
            </Link>
            <Link
              to="/home"
              className="text-lg font-semibold hover:text-blue-400 transition-all duration-300"
            >
              Home
            </Link>
          </div>

          {/* Optional: You can add a logo or site name in the center */}
          <div className="text-2xl font-bold">My Blogs</div>

          {/* Optional: Right side links or actions */}
          <div></div>
        </div>
      </div>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<Form />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App