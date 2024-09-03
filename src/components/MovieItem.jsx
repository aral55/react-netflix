import { useState, useEffect } from "react";
import { createImageUrl } from "../Services/MovieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Services/firebase";
import { UserAuth } from "../context/AuthContext";

const MovieItem = ({ movie }) => {
  const [like, setLike] = useState(false);
  const { user } = UserAuth();

  const { title, backdrop_path, poster_path } = movie;

  const markFavShow = async () => {
    try {
      const userId = user?.uid;

      if (userId) {
        const userDoc = doc(db, "users", userId);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const existingFavShows = docSnap.data().favShows;
          if (existingFavShows) {
            const existingMovie = existingFavShows.find((m) => m.id === movie.id);

            if (existingMovie) {
              // Remove the movie from the favorite list
              const updatedFavShows = existingFavShows.filter((m) => m.id !== movie.id);
              await updateDoc(userDoc, {
                favShows: updatedFavShows,
              });
              setLike(false);
            } else {
              // Add the movie to the favorite list
              await updateDoc(userDoc, {
                favShows: arrayUnion({ ...movie }),
              });
              setLike(true);
            }
          } else {
            // Create a new favorite shows array
            await updateDoc(userDoc, {
              favShows: [{ ...movie }],
            });
            setLike(true);
          }
        } else {
          // Create a new document for the user
          await setDoc(userDoc, {
            favShows: [{ ...movie }],
          });
          setLike(true);
        }
      } else {
        alert("Login to save movie");
      }
    } catch (error) {
      console.error("Error marking favorite show:", error);
    }
  };

  useEffect(() => {
    if (user && user.uid && movie) {
      const checkIfMovieIsFavorite = async () => {
        try {
          const userId = user.uid;
          const userDoc = doc(db, "users", userId);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            const existingFavShows = docSnap.data().favShows;
            if (existingFavShows) {
              const existingMovie = existingFavShows.find((m) => m.id === movie.id);

              if (existingMovie) {
                setLike(true);
              } else {
                setLike(false);
              }
            } else {
              console.log("No favorite shows found");
            }
          }
        } catch (error) {
          console.error("Error checking favorite show:", error);
        }
      };

      checkIfMovieIsFavorite();
    }
  }, [user, movie]);

  return (
    <div
      className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block 
    rounded-lg overflow-hidden cursor-pointer m-2"
    >
      <img
        className="w-full h-40 block object-cover object-top"
        src={createImageUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
      />
      <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
          {title}
        </p>

        <p onClick={markFavShow} className="cursor-pointer">
          {like ? (
            <FaHeart
              size={20}
              className="absolute top-2 left-2 text-gray-300"
            />
          ) : (
            <FaRegHeart
              size={20}
              className="absolute top-2 left-2 text-gray-300"
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieItem;