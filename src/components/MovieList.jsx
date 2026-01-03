import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "react-modal";
import YouTube from "react-youtube";
import IconPlay from "../assets/play-button.png";

const opts = {
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
    rel: 0,
  },
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1200, min: 640 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

//responsive modal size
const isMobile = window.innerWidth < 768;
const modalWidth = isMobile ? Math.min(window.innerWidth * 0.95, 360) : 960;
const modalHeight = Math.round((modalWidth * 9) / 16);

const MovieList = ({ title, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const handleTrailer = async (id) => {
    try {
      setTrailerKey("");
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });
      const json = await res.json();
      setTrailerKey(json?.results?.[0]?.key);
      setModalIsOpen(true);
    } catch (err) {
      setModalIsOpen(false);
      console.log(err);
    }
  };

  return (
    <section className="px-6 mb-12">
      <h2 className="uppercase text-lg font-bold text-white mb-4">{title}</h2>

      <Carousel responsive={responsive} itemClass="px-2">
        {data?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleTrailer(item.id)}
            className="
              relative aspect-[2/3]
              rounded-lg overflow-hidden
              bg-zinc-900
              cursor-pointer
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

            {/* Overlay */}
            <div
              className="
              absolute inset-0
              bg-gradient-to-t from-black/80 via-black/20 to-transparent
              opacity-0 group-hover:opacity-100
              transition
            "
            />

            {/* Play icon */}
            <div
              className="
              absolute inset-0
              flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition
            "
            >
              <img src={IconPlay} className="w-12 h-12" />
            </div>

            {/* Title */}
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-sm font-semibold text-white line-clamp-2">
                {item.title || item.original_title}
              </p>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Trailer modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.8)",
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            width: `${modalWidth}px`,
            height: `${modalHeight}px`,

            background: "black",
            border: "none",
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        {trailerKey && (
          <YouTube
            videoId={trailerKey}
            opts={{
              width: modalWidth,
              height: modalHeight,
              playerVars: {
                autoplay: 1,
                rel: 0,
              },
            }}
          />
        )}
      </Modal>
    </section>
  );
};

export default MovieList;
