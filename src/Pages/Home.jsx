import endpoints from "../Services/MovieServices";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";

const Home = () => {
  return (
    <>
      <Hero />
      <MovieList title="upcoming" url={endpoints.upcoming}/>
      <MovieList title="trending" url={endpoints.trending}/>
      <MovieList title="top rated" url={endpoints.topRated}/>
      <MovieList title="comedy" url={endpoints.comedy}/>
      <MovieList title="popular" url={endpoints.popular}/>
    </>
  );
};

export default Home;
