import { createContext, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

const opts = {
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
    rel: 0,
  },
};

//responsive modal size
const isMobile = window.innerWidth < 768;
const modalWidth = isMobile ? Math.min(window.innerWidth * 0.95, 360) : 960;
const modalHeight = Math.round((modalWidth * 9) / 16);

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const handleTrailer = async (id) => {
    setTrailerKey("");
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const movieKey = await fetch(url, options);
      const data = await movieKey.json();
      console.log("movie", data);
      setTrailerKey(data.results[0].key);
      setModalIsOpen(true);
    } catch (error) {
      setModalIsOpen(false);
      console.log(error);
    }
  };
  return (
    <MovieContext.Provider value={{handleTrailer}}>
      {children} 
      {/* Thẻ con ngoài việc nó được truyền props value. Nó còn có thêm Modal ở dưới nếu click nữa */}
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
    </MovieContext.Provider>
  );
};
