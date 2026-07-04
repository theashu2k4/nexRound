import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-[320px] w-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all duration-300 cursor-pointer">
      {/* Blog Image */}
      <div className="overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-36 object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Category */}
        <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-4 rounded-full">
          {blog.category}
        </span>

        {/* Blog Title */}
        <h2 className=" mt-2 text-xl font-semibold text-gray-800 leading-snug line-clamp-2">
          {blog.title}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm leading-6 mt-2 line-clamp-3">
          {blog.subTitle}
        </p>

        {/* Read More */}
        <button className="mt-3 text-green-600 font-medium hover:gap-3 flex items-center gap-2 transition-all">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
