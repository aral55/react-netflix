import axios from "axios";
import { useEffect, useState, useRef } from "react";
import MovieItem from "./MovieItem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MovieList = ({ title, url }) => {
  const rowId = Math.floor(Math.random() * 1000);
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios.get(url).then((response) => setMovies(response.data.results));
  }, [url]);

  const slide = (offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };

  return (
    <>
      <h2 className="font-nsans-bold md:text-xl p-4 capitalize">{title}</h2>

      <div id={"slider" + rowId} className="relative flex items-center group">
        <div className="absolute left-0 top-0 h-full w-full -z-10" />
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </>
  );
};

export default MovieList;