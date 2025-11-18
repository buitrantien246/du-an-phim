import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import Banner from "./components/Banner";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieProvider";

function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);

  //function để search
  const handleSearch = async (searchVal) => {
    setMovieSearch([]);
    try {
      const url = ` https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi&page=1`; //Api để search
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const searchMovie = await fetch(url, options);
      const data = await searchMovie.json();
      console.log("Search Movie", data);
      setMovieSearch(data.results);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        //options là tham số cấu hình được truyền vào hàm fetch() để quy định:
        //Gửi request bằng method gì
        //Gửi kèm headers (nơi khai báo thông tin kèm request) gì (ví dụ: API key, định dạng nhận dữ liệu, v.v.)
        method: "GET",
        headers: {
          accept: "application/json", //Ý là tôi muốn nhận dữ liệu dạng JSON
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, //Xác thực quyền truy cập API
        },
      };
      const url1 =
        "https://api.themoviedb.org/3/movie/popular?language=vi&page=1"; //API data của popular
      const url2 =
        "https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1"; //API data của top

      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();

      setMovie(data1.results);
      setMovieRate(data2.results);
    };
    fetchMovie();
  }, []);

  return (
    <>
      <MovieProvider>
        <div className="bg-black">
          <Header onSearch={handleSearch} />
          <Banner />
          {movieSearch.length > 0 ? (
            <MovieSearch title={"Kết quả tìm kiếm"} data={movieSearch} />
          ) : (
            <div>
              <MovieList title={"Phim Hot"} data={movie} />
              <MovieList title={"Phim Đề Cử"} data={movieRate} />
            </div>
          )}
        </div>
      </MovieProvider>
    </>
  );
}

export default App;
