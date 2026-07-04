import React from "react";
import { blogCategories, blog_data } from "../assets/assets";
import { useState } from "react";
import BlogCard from "./BlogCard";

const BlogList = () => {
  /* Creating a state to show bg color only on the selected category among the blog categories */
  const [menu, setMenu] = useState("All");

  return (
    <div className="max-w-6xl mx-auto mt-15">
      {/* Categories Section */}
      <div className="w-full flex justify-center">
        {/* Container for all category buttons */}
        <div className="flex flex-wrap justify-center gap-3 bg-gray-100 p-2 rounded-full">
          {blogCategories.map(
            (
              item, // This shows all categories of blogs at the top of the page
            ) => (
              <button
                key={item}
                onClick={() =>
                  setMenu(item)
                } /* Setting the selected category when clicked */
                className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300
              
                ${
                  menu === item
                    ? "bg-green-500 text-white shadow-md scale-105" // Active category styling
                    : "text-gray-600 hover:bg-white hover:shadow-sm" // Hover effect for inactive categories
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Blog Cards */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 px-6">
        {blog_data.map(
          (
            blog, // Mapping through the blog data to display each blog as a card
          ) => (
            <BlogCard key={blog._id} blog={blog} />
          ),
        )}
      </div>
    </div>
  );
};

export default BlogList;

/* bg-gray-100 p-2 rounded-full
Creates a soft pill-shaped background behind all categories. */
