import axios from "axios";
import { useEffect, useState } from "react";


const MovieList = ({ title, url }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => setMovies(response.data.results));
  }, [url]);

  console.log(movies);
  return (
    <>
      <h2 className="font-nsans-bold md:text-xl p-4 capitalize">{title}</h2>

      <div id={`slider`} className="relative flexvitems-center">
        <div className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {movies.map((movie) => (
            <h1>{movie.title}</h1>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;