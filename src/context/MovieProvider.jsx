import { createContext, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

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
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        <YouTube videoId={trailerKey} opts={opts} />
      </Modal>
    </MovieContext.Provider>
  );
};
