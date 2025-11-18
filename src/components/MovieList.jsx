import { useState } from "react";
import ImgTemp from "../assets/temp-1.jpeg";
//Import của Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//Import của Modal
import Modal from "react-modal"; //Dùng để tạo 1 popup trailer phim xuất hiện giữa màn hình
import YouTube from "react-youtube"; //Dùng để nhúng video YouTube vào React

//Cấu hình hiển thị (player) cho component youtube ở dưới
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  //1 = auto play video khi click vào; 0 = không tự chạy
  },
};

//Đối tượng responsive để cấu hình breakpoints
//breakpoint.max: chiều rộng tối đa (px)
//breakpoint.min: chiều rộng tối thiểu (px)
//items: số lượng item được hiển thị trong carousel ở mức kích thước đó
const responsive = {
  //superLargeDesktop là kích thước TV
  //Khi màn hình rộng từ 3000px đến 4000px
  //→ Hiện 10 item cùng lúc.
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(""); //Truyền key xuống cho youtube để nó biết nó sẽ phát video trailer nào
  const handleTrailer = async (id) => {
    setTrailerKey("");
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`; //API lấy data từ youtube
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
      setTrailerKey(data.results[0].key); //Trong mỗi results trả về sẽ có key
      setModalIsOpen(true);
    } catch (error) {
      setModalIsOpen(false);
      console.log(error);
    }
  };

  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-xl font-bold mb-2">{title}</h2>
      <Carousel responsive={responsive} className="flex items-center space-x-4">
        {/* Carousel nó dùng để thay thế cái thẻ div bên dưới để tạo flex */}
        {/* <div className="flex items-center space-x-4"> */}
        {data?.length > 0 &&
          data.map((item) => (
            <div
              key={item.id}
              className="w-[200px] h-[300px] bg-red-500 relative group"
              onClick={() => handleTrailer(item.id)}
            >
              <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25"></div>
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${item.backdrop_path}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-2">
                  <p className="uppercase text-md">
                    {item.title || item.original_title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        {/* </div> */}
      </Carousel>
      <Modal
        isOpen={modalIsOpen} //hiện modal khi click -true=hiện, false=đóng
        onRequestClose={() => setModalIsOpen(false)} //bấm nút ESC hoặc click ra ngoài overlay để đóng pop up
        style={{
          overlay: { //Lớp nền che mờ phía sau popup.
            position: "fixed",
            zIndex: 9999,
          },
          content: { //Box popup chứa player YouTube
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
    </div>
  );
};

export default MovieList;
