import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import MovieList from "./movielists";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import ProviderCard from "./providercard";
import userimg from "../assets/user.png";
import CastCard from "./castcard";
import ReactPlayer from "react-player";
import Trending from "./trending";
import buffer from "../ZKZg.gif";
import cross from "../assets/cross.png";
import searchimg from "../assets/search.png";
import search1img from "../assets/search1.png";
import homeimg from "../assets/home.png";
import home1img from "../assets/logo.png";
import sliderimg from "../assets/slider.png";
import slider1img from "../assets/slider1.png";
import Card from "./card";
import ReviewCard from "./reviewcard";
import MovieCard from "./moviecard";
import FilterComponent from "./filtercomponent";

const MoviePage = ({ mainid }) => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [selectedcountry, setselectedcountry] = useState("IN");
  const [country, setcountry] = useState([]);
  const [recc, setrecc] = useState([]);
  const [cast, setcast] = useState([]);
  const [providers, setproviders] = useState([]);
  const [details, setdetails] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [server, setserver] = useState(1);
  const [trending, settrending] = useState([]);
  const [loading, setloading] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [showsearch, setshowsearch] = useState(false);

  const reviewaddition = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "review",
          action: "place",
          id: id,
          number: 0,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      console.log(data.sol);
      setreviews(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const recommendationaddition = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "recc",
          action: "place",
          id: id,
          number: 0,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      console.log(data.sol);
      setrecc(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const trendingaddition = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "trending",
          action: "place",
          number: 0,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      console.log(data.sol);
      settrending(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const dataaddition = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "getdetails",
          id: id,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      setdetails(data.sol);
      console.log(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const provideraddition = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "getproviders",
          id: id,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      setproviders(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const countryaddition = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "country",
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      setcountry(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const castaddition = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "getcast",
          id: id,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      setcast(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleClick = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    castaddition(mainid);
    dataaddition(mainid);
    provideraddition(mainid);
    reviewaddition(mainid);
    recommendationaddition(mainid);
    trendingaddition();
    countryaddition();
  }, []);
  return (
    <div className="bg-black bg-opacity-85 w-screen h-screen text-white flex flex-col overflow-y-auto overflow-x-hidden scrollbar scrollbar-track-transparent scrollbar-thumb-white">
      <img
        className="absolute h-screen w-screen -z-10 object-fill"
        src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
        alt="Fallback image description"
      />
      <div className="w-screen  h-20 flex flex-row justify-between p-3 hover:cursor-pointer bg-black bg-opacity-50">
        <div className="flex flex-row">
          <motion.div
            className=" rounded-full w-11 h-11 overflow-hidden mx-2 opacity-50 hover:opacity-100"
            whileHover={{ scale: 1.11 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img className=" h-full w-full" src={home1img} />
          </motion.div>

          <motion.div
            className="h-11 w-11 mr-4 opacity-50 hover:opacity-100"
            whileHover={{ scale: 1.11 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setshowsearch(!showsearch);
            }}
          >
            <img
              className="w-12 h-full rounded-full border-2 border-white p-1"
              src={!showsearch ? searchimg : cross}
              alt="aa"
            />
          </motion.div>
          <AnimatePresence>
            {showsearch && (
              <motion.div
                key="modal"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
              >
                <input
                  key="inp"
                  id="searchInput"
                  className=" px-4 h-10 w-80 self-center mt-1 rounded-md focus:shadow-md focus:shadow-black ml-4 opacity-50 hover:opacity-100"
                  type="text"
                  placeholder="Search..."
                />
                <motion.button
                  key="btn  "
                  id="searchButton"
                  className="opacity-50 hover:opacity-100 border-2 mr-9 p-1 self-center mt-1 h-10 w-20 ml-3 border-black bg-green-700 text-white rounded-md hover:bg-green-800 hover:shadow-sm hover:shadow-black"
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 1 }}
                >
                  Search
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-row">
          <motion.div
            whileHover={{ scale: 1.11 }}
            whileTap={{ scale: 0.98 }}
            className="w-fit mx-2 h-12 p-0.5 px-2 bg-slate-900 text-lg rounded-lg border-2 border-white opacity-50 hover:opacity-100 text-center flex flex-col justify-center"
          >
            Popular Movies
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.11 }}
            whileTap={{ scale: 0.98 }}
            className="w-fit mx-2 h-12 p-0.5 px-2 bg-slate-900 text-lg rounded-lg border-2 border-white opacity-50 hover:opacity-100 text-center flex flex-col justify-center"
          >
            Popular TV
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.11 }}
            whileTap={{ scale: 0.98 }}
            className="w-fit mx-2 h-12 p-0.5 px-2 bg-slate-900 text-lg rounded-lg border-2 border-white opacity-50 hover:opacity-100 text-center flex flex-col justify-center"
          >
            New Movie
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.11 }}
            whileTap={{ scale: 0.98 }}
            className="w-fit mx-2 h-12 p-0.5 px-2 bg-slate-900 text-lg rounded-lg border-2 border-white opacity-50 hover:opacity-100 text-center flex flex-col justify-center"
          >
            New TV
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.11 }}
            whileTap={{ scale: 0.98 }}
            className="w-fit mx-2 h-12 p-0.5 px-2 bg-slate-900 text-lg rounded-lg border-2 border-white opacity-50 hover:opacity-100 text-center flex flex-col justify-center"
          >
            Top Movies
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.11 }}
            whileTap={{ scale: 0.98 }}
            className="w-fit mx-2 h-12 p-0.5 px-2 bg-slate-900 text-lg rounded-lg border-2 border-white opacity-50 hover:opacity-100 text-center flex flex-col justify-center"
          >
            Top TV
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.11 }}
            whileTap={{ scale: 0.98 }}
            className="h-12 w-12 mr-4 opacity-50 hover:opacity-100"
          >
            <img
              className="w-12 h-full rounded-full border-2 border-white "
              src={userimg}
              alt="aa"
            />
          </motion.div>
        </div>
      </div>

      <div className="flex flex-row justify-start ml-12 pb-12 mt-7 h-fit">
        {!isMobile ? (
          <div className="h-fit w-4/12 mx-4 mb-5 mt-2 flex flex-col ">
            <img
              className="rounded-2xl border-2 "
              style={{ height: "640px" }}
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            />
          </div>
        ) : null}
        <div className="w-8/12 flex flex-col p-2 ml-8 flex-nowrap  ">
          <div className="flex flex-row">
            <div className="flex flex-col min-w-fit">
              <div className="text-md mt-3 flex flex-row">
                <p className="mr-2 font-bold">Runtime:</p>
                {(details.runtime / 60).toFixed(0)} Hours {details.runtime % 60}{" "}
                Minutes
              </div>
              <div className="text-md mt-2 flex flex-row">
                <p className="mr-2 font-bold">Status:</p>
                {details.status}
              </div>
              <div className="text-md mt-2 flex flex-row">
                <p className="mr-2 font-bold">Languages:</p>
                <div className="flex flex-col">
                  {details.length !== 0
                    ? details.spoken_languages.map((item, index) => {
                        return <p key={index}>{item.english_name}</p>;
                      })
                    : null}
                </div>
              </div>
              <div className="text-md mt-2 flex flex-row">
                <p className="mr-2 font-bold">Country:</p>
                <div className="flex flex-col">
                  {details.length !== 0
                    ? details.production_countries.map((item, index) => {
                        return <p key={index}>{item.name}</p>;
                      })
                    : null}
                </div>
              </div>
              <div className="text-md mt-2 flex flex-row">
                <p className="mr-2 font-bold">Release Date:</p>
                <div className="flex flex-col">{details.release_date}</div>
              </div>
              <div className="text-md mt-2 flex flex-row">
                <p className="mr-2 font-bold">Genres:</p>
                <div className="flex flex-col">
                  {details.length !== 0
                    ? details.genres.slice(0, 3).map((item, index) => {
                        return <p key={index}>{item.name}</p>;
                      })
                    : null}
                </div>
              </div>
              <div
                className="mt-6 w-fit px-3 hover:cursor-pointer bg-green-700 text-xl border-2 border-white h-10 pb-2 p-1 rounded-xl text-center flex flex-row"
                onClick={handleClick}
              >
                <p className="">Watch Now</p>
              </div>
            </div>
            <div className="relative flex flex-col justify-start ml-6">
              <div className="flex flex-row justify-start z-20">
                {
                  <FilterComponent
                    data={country}
                    title="Country"
                    selected={setselectedcountry}
                    initialtext={"India"}
                  />
                }
              </div>
              <div className="absolute mt-6 ml-20">
                {<ProviderCard data={providers[selectedcountry]} />}
              </div>
            </div>
          </div>
          <p className="mt-9 text-md font-bold">Cast:</p>
          <div className="p-2 rounded-md scrollbar-thin scrollbar-track-transparent border-white  flex flex-row flex-nowrap overflow-auto w-full min-h-fit">
            {cast.map((item, index) => {
              if (item.profile_path)
                return <CastCard key={index} data={item} />;
            })}
          </div>
        </div>
      </div>
      <div ref={targetRef}>
        <div className="flex flex-row justify-start mt-10">
          <div
            className=" mx-3 flex flex-col"
            style={{
              height: isMobile ? "300px" : "700px",
              width: isMobile ? "410px" : "950px",
            }}
          >
            {loading ? (
              <div className="w-full bg-black h-full hover:cursor-pointer border-2 border-white rounded-md py-2 ml-8 mb-3 flex flex-col justify-center">
                <img className="mx-auto h-40 w-40" src={buffer} />
              </div>
            ) : (
              <iframe
                className="w-full h-full hover:cursor-pointer border-2 border-white rounded-md py-2 ml-8 mb-3"
                src={
                  server === 2
                    ? `https://multiembed.mov/?video_id=${mainid}&tmdb=1`
                    : `https://vidsrc.to/embed/movie/${mainid}`
                }
                allowFullScreen
              ></iframe>
            )}
            <div className="flex flex-row  ml-8 bg-transparent justify-center">
              <div className="flex flex-row border-white bg-transparent p-2 rounded-md ">
                <p className="self-center text-xl mb-1">Servers:</p>
                <div
                  className={`p-1 text-base border-2 border-white rounded-md  mx-2 hover:cursor-pointer ${
                    server == 1 ? "bg-slate-700" : null
                  }`}
                  onClick={() => {
                    setserver(1);
                    setloading(true);
                    setTimeout(() => {
                      setloading(false);
                    }, 6000);
                  }}
                >
                  VidSrc
                </div>
                <div
                  className={`p-1 text-base border-2 border-white rounded-md  mx-2 hover:cursor-pointer ${
                    server == 2 ? "bg-slate-700" : null
                  }`}
                  onClick={() => {
                    setserver(2);
                    setloading(true);
                    setTimeout(() => {
                      setloading(false);
                    }, 6000);
                  }}
                >
                  SuperEmbed
                </div>
              </div>
            </div>
          </div>
          {!isMobile ? (
            <div className=" ml-16 mr-5 w-96" style={{ height: "675px" }}>
              <Trending data={trending} />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
      <div className="ml-14 text-4xl mt-20">Summary:</div>
      <div className="ml-14 text-xl mt-5">{details.overview}</div>
      <div className="ml-14 text-4xl mt-20">
        If you liked {details.title || details.name} Then you may like:
      </div>
      <div className="w-full h-fit flex flex-row flex-wrap p-5  mx-auto ml-7">
        {recc ? (
          recc.length === 0 ? (
            <p className="ml-2">Sorry Couldnt find any similar movies</p>
          ) : null
        ) : null}
        {recc
          ? recc.map((item, index) => {
              if (item.poster_path)
                return <MovieCard key={index} data={item} />;
            })
          : null}
      </div>
      <div className="ml-14 text-4xl mt-12">Reviews:</div>
      <div className="w-fit h-fit flex flex-col mb-12">
        {reviews ? (
          reviews.length === 0 ? (
            <p className="ml-14 mt-4 ">Sorry Couldnt find any Reviews</p>
          ) : null
        ) : null}
        {reviews
          ? reviews.map((item, index) => {
              return <ReviewCard key={index} data={item} />;
            })
          : null}
      </div>
    </div>
  );
};

export default MoviePage;
