import React from 'react'
import { useNavigate } from 'react-router-dom';

const Features = () => {
      const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6 py-10 max-w-6xl mx-auto border-b-2 border-gray-50">
      <div className="text-center py-4 px-8 max-w-sm mx-auto border-2 rounded-2xl hover:shadow-xl border-gray-50 ">
        <div className="mb-6 text-4xl"> 💼 </div>
        <h1 className="text-xl font-bold"> Explore Experiences </h1>
        <p className="mb-6 text-gray-400">
          {" "}
          Real Interview Stories and Insights
        </p>
        <button
          onClick={() => navigate("/experiences")}
          className="text-green-700 font-bold"
        >
          {" "}
          Explore Now →
        </button>
      </div>
      {/* <div className="text-center py-4 px-8 max-w-sm mx-auto border-2 rounded-2xl hover:shadow-xl border-gray-50 ">
        <div className="mb-6 text-4xl"> 🎓 </div>
        <h1 className="text-xl font-bold"> Career Guidance</h1>
        <p className="mb-6 text-gray-400"> 1:1 mentorship sessions</p>
        <button
          onClick={() => navigate("/experiences")}
          className="text-green-700 font-bold">Learn More →
        </button>
      </div> */}
      <div className="text-center py-4 px-8 max-w-sm mx-auto border-2 rounded-2xl hover:shadow-xl border-gray-50 ">
        <div className="mb-6 text-4xl"> 📊 </div>
        <h1 className="text-xl font-bold"> Interview Analytics</h1>
        <p className="mb-6 text-gray-400"> Community-driven insights</p>
        <button
          onClick={() => navigate("/experiences")}
          className="text-green-700 font-bold"
        >
          {" "}
          Explore Insights →
        </button>
      </div>
      {/* <div className="text-center py-4 px-8 max-w-sm mx-auto border-2 rounded-2xl hover:shadow-xl border-gray-50 ">
        <div className="mb-6 text-4xl"> 🎯 </div>
        <h1 className="text-xl font-bold"> Mock Interview</h1>
        <p className="mb-6 text-gray-400"> Practice with industry experts</p>
        <button
          onClick={() => navigate("/experiences")}
          className="text-green-700 font-bold"
        >
          {" "}
          Book Now →
        </button>
      </div> */}
    </div>
  );
}

export default Features