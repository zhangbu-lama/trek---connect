import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../api/Category";

const BASE_URL = 'http://localhost:8000'; 

const Activities = () => {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const data = await fetchCategories();
        const list = Array.isArray(data) ? data : [];
        const formatted = list.map((category) => ({
          ...category,
          image: category.image
            ? `${BASE_URL}/uploads/${category.image}`
            : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
        }));
        setCategories(formatted);
        setActiveIndex(0);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setFetchError("Could not load activities. Make sure the API server is running.");
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  const handleCarouselTransition = (direction) => {
    if (categories.length === 0) return;
    const newIndex =
      (activeIndex + direction + categories.length) % categories.length;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (categories.length <= 1) return;
    const interval = setInterval(() => {
      handleCarouselTransition(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, categories.length]);

  return (
    <div className="bg-[url('./res/mountains.webp')] bg-cover bg-center">
      <div className="pb-12 bg-[linear-gradient(0deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.3)_50%,_rgba(255,255,255,1)_100%)]">
        <section className="mt-12 pt-12 px-6 max-w-screen-lg mx-auto space-y-4 text-xl text-justify">
          <p>
            <span className="font-bold text-red-600">Lorem</span> ipsum dolor sit amet consectetur adipisicing elit. Autem alias fugiat velit harum quia corporis nemo...
          </p>
        </section>

        <section className="mt-12 pt-12 px-6 max-w-screen-lg mx-auto">
          <h2 className="text-5xl font-bold mb-4 uppercase font-oswald w-fit">
            <span className="text-brand">Choose</span> your activity
            <hr className="border-0 w-full h-1 bg-brand mt-2" />
          </h2>

          <div className="w-full h-[60vh] relative overflow-hidden rounded-xl bg-gray-100">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                Loading activities…
              </div>
            )}
            {!loading && fetchError && (
              <div className="absolute inset-0 flex items-center justify-center text-red-600 px-6 text-center">
                {fetchError}
              </div>
            )}
            {!loading && !fetchError && categories.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 px-6 text-center gap-2">
                <p>No activities yet.</p>
                <p className="text-sm">
                  Sign in as admin and add categories under{" "}
                  <span className="font-semibold">Add Category</span>.
                </p>
              </div>
            )}
            <div className="shadow-lg h-full">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 absolute w-full h-full bg-cover bg-center flex items-end rounded-xl ${
                    activeIndex === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  style={{ backgroundImage: `url(${cat.image})` }}
                >
                  <div className="px-4 pb-8 pt-16 w-full bg-gradient-to-t from-[rgba(255,255,255,0.7)] to-transparent">
                    <h3
                      className="text-3xl text-brand font-bold cursor-pointer hover:underline"
                      onClick={() => navigate(`/trek?category=${cat._id}`)}
                    >
                      {cat.name}
                    </h3>
                    <hr className="border-0 bg-brand w-full h-0.5 mt-0.5" />
                    <p className="mt-2 max-w-screen-md">{cat.description}</p>
                    <button
                      onClick={() => navigate(`/places?category=${cat._id}`)}
                      className="text-sm hover:text-brand transition-colors"
                    >
                      Learn more...
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {categories.length > 1 && (
              <div className="text-4xl absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2">
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-600 p-2 rounded-full"
                  onClick={() => handleCarouselTransition(-1)}
                  aria-label="Previous activity"
                >
                  &laquo;
                </button>
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-600 p-2 rounded-full"
                  onClick={() => handleCarouselTransition(1)}
                  aria-label="Next activity"
                >
                  &raquo;
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Activities;
