import { useContext } from "react";
import { MovieContext } from "../context/MovieProvider";

const MovieSearch = ({ title, data }) => {
  const { handleTrailer } = useContext(MovieContext);

  return (
    <section className="px-6 mb-14">
      <h2 className="uppercase text-lg font-bold text-white mb-4">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleTrailer(item.id)}
            className="
              relative aspect-[2/3]
              cursor-pointer
              rounded-lg overflow-hidden
              bg-zinc-900
              group
            "
          >
            {/* Image */}
            <img
              src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
              alt={item.title}
              className="
                w-full h-full object-cover
                group-hover:scale-105
                transition-transform duration-300
              "
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

            {/* Title */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition">
              <p className="text-sm font-semibold text-white line-clamp-2">
                {item.title || item.original_title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieSearch;
