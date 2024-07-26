import { useEffect, useState } from "react";
import Trending from "./trending";
import { useMediaQuery } from "react-responsive";
import buffer from "../ZKZg.gif";
import searchimg from "../assets/search.png";
import search1img from "../assets/search1.png";
import homeimg from "../assets/home.png";
import home1img from "../assets/logo.png";
import sliderimg from "../assets/slider.png";
import slider1img from "../assets/slider1.png";
import insta from "../assets/insta.png";
import mail from "../assets/mail.png";
import whatsapp from "../assets/whatsapp.png";
import facebook from "../assets/facebook.png";
import shareimg from "../assets/share.png";
import share1img from "../assets/share1.png";
import userimg from "../assets/user.png";
import ReactPlayer from "react-player/youtube";
import { motion } from "framer-motion";
import cross from "../assets/cross.png";
import MovieList from "./movielists";
import Filter from "./filter";
function HomePage() {
  const [starting, setstarting] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [cast, setcast] = useState([]);

  //Search variables
  const [searchval, setsearchval] = useState("");
  const [tempsearchval, settempsearchval] = useState("");

  //Handling taskbar logos
  const [searchlogo, setsearchlogo] = useState(true);
  const [sharelogo, setsharelogo] = useState(true);
  const [sliderlogo, setsliderlogo] = useState(true);

  //Pop up boxes
  const [showshare, setshowshare] = useState(0);
  const [showsearch, setshowsearch] = useState(0);
  const [showfilter, setshowfilter] = useState(0);

  //addition elements (tells infinite scrolling how many new movies are added, so to change the target element for better scrolling)
  const [newpopularadds, setnewpopularadds] = useState(0);
  const [newnewadds, setnewnewadds] = useState(0);
  const [newtopadds, setnewtopadds] = useState(0);
  const [newpopulartvadds, setnewpopulartvadds] = useState(0);
  const [newnewtvadds, setnewnewtvadds] = useState(0);
  const [newtoptvadds, setnewtoptvadds] = useState(0);
  const [newsearchadds, setnewsearchadds] = useState(0);

  //PAGE ELEMENTS (tells page number of panination combined for infinte scrolling)
  const [popularmoviepage, setpopularmoviepage] = useState(1);
  const [newmoviepage, setnewmoviepage] = useState(1);
  const [topmoviepage, settopmoviepage] = useState(1);
  const [populartvpage, setpopulartvpage] = useState(1);
  const [newtvpage, setnewtvpage] = useState(1);
  const [toptvpage, settoptvpage] = useState(1);
  const [searchpage, setsearchpage] = useState(1);

  //MOVIE ELEMENTS
  const [popularmovies, setpopularmovies] = useState([]);
  const [newmovies, setnewmovies] = useState([]);
  const [topmovies, settopmovies] = useState([]);
  const [populartv, setpopulartv] = useState([]);
  const [newtv, setnewtv] = useState([]);
  const [toptv, settoptv] = useState([]);
  const [trending, settrending] = useState([]);
  const [search, setsearch] = useState([]);
  const [watchid, setwatchid] = useState("");
  const [media, setmedia] = useState("");

  const [backd, setbackd] = useState(false);
  const [nulltrailer, setnulltrailer] = useState(false);
  const [link, setlink] = useState("");
  const [prev, setprev] = useState("");

  //DESC BOX ELEMENTS
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [year, setyear] = useState("");
  const [rating, setrating] = useState("");
  const [popularity, setpopularity] = useState("");

  const [showMore, setShowMore] = useState(false);
  const wordLimit = 70;

  // DESCRIPTION BOX>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const getDescription = () => {
    if (showMore || desc.split(" ").length <= wordLimit) {
      return desc;
    } else {
      // Shorten description to word limit
      return `${desc.split(" ").slice(0, wordLimit).join(" ")}...`;
    }
  };

  const handletitle = async (data) => {
    settitle(data);
  };
  const handledesc = async (data) => {
    setShowMore(false);
    setdesc(data);
  };
  const handleyear = async (data) => {
    setyear(data);
  };
  const handlerating = async (data) => {
    setrating(data);
  };
  const handlepopularity = async (data) => {
    setpopularity(data);
  };

  //TRAILER BOX>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const castaddition = async (id) => {
    if (id === "") {
      setcast([]);
      return;
    }
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

  const changetrailer = async (data, name) => {
    let x;

    if (data.length != 0) {
      x = await hoveraddition(data, name);
    } else {
      x = "";
    }

    if (x.length != 0) {
      setnulltrailer(false);
      let d = gettrailer(x);
      fetchVideo(d);
    } else if (x.length == 0 && data.length != 0) {
      setbackd(false);
      setnulltrailer(true);
    }
  };

  const gettrailer = (items) => {
    let trailerKey = null;
    console.log;

    items.forEach((element) => {
      if (element.type === "Trailer") {
        trailerKey = element["key"];
        return trailerKey;
      }
    });

    return trailerKey;
  };

  const changeback = async (data) => {
    if (prev != data) {
      setbackd(true);
    }
    setprev(data);
  };

  //FETCHING TRAILER DATA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  //FECTH TRAILER LINK FROM TMDB API.....................................

  const hoveraddition = async (id, name) => {
    let cmd;

    if (name === true) {
      cmd = "hover";
    } else {
      cmd = "hovertv";
    }

    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: cmd,
          id: id,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }

      return data.sol;
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //FETCH TRAILER VIDEO FROM YOUTUBE API.......................................

  const fetchVideo = async (data) => {
    const apiKey = "AIzaSyCDpATWobrYtKXlpl4E7e1lRaZv2QCXea0";
    const videoId = data;
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=player&id=${videoId}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.items.length === 0) {
        setbackd(false);
        setnulltrailer(true);
        return;
      }
      const videoSrc = data.items[0].player.embedHtml;
      setbackd(false);
      setlink(videoSrc);
      return;
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };
  //FETCHING MOVIES DATA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  //POPULAR PAGE FROM TMDB API....................................................
  const popularmoviesaddition = async (damn) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "popular",
          action: "place",
          number: damn,
        }),
      });

      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }

      setpopularmovies((prevpopularMovies) => {
        const existingIds = new Set(prevpopularMovies.map((movie) => movie.id));

        const newpopularMovies = [...prevpopularMovies];
        for (const a of data.sol) {
          if (!existingIds.has(a.id)) {
            newpopularMovies.push(a);
          }
        }
        setnewpopularadds(newpopularMovies.length - popularmovies.length);

        if (starting) {
          changetrailer(data.sol[0].id, true);
          changeback(data.sol[0].backdrop_path);
          handletitle(data.sol[0].title);
          handledesc(data.sol[0].overview);
          handleyear(data.sol[0].release_date);
          handlerating(data.sol[0].rating);
          handlepopularity(data.sol[0].popularity);
          setmedia(data.sol[0].name ? "Series" : "Movie");
          setwatchid(data.sol[0].id);
          setstarting(false);
          castaddition(data.sol[0].id);
        }
        return newpopularMovies;
      });
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //ONGOING OAGE FROM TMDB API.............................................
  const newmoviesaddition = async (damn) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "new",
          action: "place",
          number: damn,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      setnewmovies((prevnewMovies) => {
        const existingIds = new Set(prevnewMovies.map((movie) => movie.id));
        const newnewMovies = [...prevnewMovies];
        for (const a of data.sol) {
          if (!existingIds.has(a.id)) {
            newnewMovies.push(a);
          }
        }
        setnewnewadds(newnewMovies.length - newmovies.length);
        return newnewMovies;
      });
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //TOP PAGE FROM TMDB API

  //ONGOING PAGE FROM TMDB API.............................................
  const topmoviesaddition = async (damn) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "top",
          action: "place",
          number: damn,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      settopmovies((prevtopMovies) => {
        const existingIds = new Set(prevtopMovies.map((movie) => movie.id));
        const newtopMovies = [...prevtopMovies];
        for (const a of data.sol) {
          if (!existingIds.has(a.id)) {
            newtopMovies.push(a);
          }
        }
        setnewtopadds(newtopMovies.length - topmovies.length);
        return newtopMovies;
      });
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //POPULAR PAGE FROM TMDB API....................................................
  const populartvaddition = async (damn) => {
    console.log("called", damn);
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "populartv",
          action: "place",
          number: damn,
        }),
      });

      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      console.log(data.sol);
      setpopulartv((prevpopulartv) => {
        const existingIds = new Set(prevpopulartv.map((movie) => movie.id));

        const newpopulartv = [...prevpopulartv];
        for (const a of data.sol) {
          if (!existingIds.has(a.id)) {
            newpopulartv.push(a);
          }
        }
        setnewpopulartvadds(newpopulartv.length - populartv.length);
        return newpopulartv;
      });
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //ONGOING PAGE FROM TMDB API.............................................
  const toptvaddition = async (damn) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "toptv",
          action: "place",
          number: damn,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      settoptv((prevtoptv) => {
        const existingIds = new Set(prevtoptv.map((movie) => movie.id));
        const newtoptv = [...prevtoptv];
        for (const a of data.sol) {
          if (!existingIds.has(a.id)) {
            newtoptv.push(a);
          }
        }
        setnewtoptvadds(newtoptv.length - toptv.length);
        return newtoptv;
      });
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //ONGOING OAGE FROM TMDB API.............................................
  const newtvaddition = async (damn) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "newtv",
          action: "place",
          number: damn,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      setnewtv((prevnewtv) => {
        const existingIds = new Set(prevnewtv.map((movie) => movie.id));
        const newnewtv = [...prevnewtv];
        for (const a of data.sol) {
          if (!existingIds.has(a.id)) {
            newnewtv.push(a);
          }
        }
        setnewnewtvadds(newnewtv.length - newtv.length);
        return newnewtv;
      });
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //trending

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
  //searchaddition

  const searchaddition = async (name, damn) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "search",
          id: name,
          number: damn,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      console.log(data.sol);
      setsearch((prevsearchs) => {
        const existingIds = new Set(prevsearchs.map((movie) => movie.id));
        const newsearches = [...prevsearchs];
        for (const a of data.sol) {
          if (
            !existingIds.has(a.id) &&
            !(a.media_type === "person") &&
            !(a.poster_path === null)
          ) {
            console.log(a.media_type);
            newsearches.push(a);
          }
        }
        setnewsearchadds(newsearches.length - search.length);
        return newsearches;
      });
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //INFINITE SCROLLING FETCH WHEN SCROLL TARGET REACHED

  const handlefetch = async (list) => {
    console.log("called fetch", list);
    if (list === "popular") {
      setpopularmoviepage(popularmoviepage + 1);
    } else if (list === "new") {
      setnewmoviepage(newmoviepage + 1);
    } else if (list === "top") {
      settopmoviepage(topmoviepage + 1);
    } else if (list === "toptv") {
      settoptvpage(toptvpage + 1);
    } else if (list === "populartv") {
      setpopulartvpage(populartvpage + 1);
    } else if (list === "newtv") {
      setnewtvpage(newtvpage + 1);
    } else if (list === "search") {
      setsearchpage(searchpage + 1);
    }
  };
  //search

  const performsearch = () => {
    setsearchval(tempsearchval);
  };
  // CALLING API WHEN PAGE CHANGES

  useEffect(() => {
    popularmoviesaddition(popularmoviepage);
  }, [popularmoviepage]);

  useEffect(() => {
    newmoviesaddition(newmoviepage);
  }, [newmoviepage]);

  useEffect(() => {
    topmoviesaddition(topmoviepage);
  }, [topmoviepage]);

  useEffect(() => {
    populartvaddition(populartvpage);
  }, [populartvpage]);

  useEffect(() => {
    newtvaddition(newtvpage);
  }, [newtvpage]);

  useEffect(() => {
    toptvaddition(toptvpage);
  }, [toptvpage]);

  useEffect(() => {
    searchaddition(searchval, searchpage);
  }, [searchpage]);

  //searching

  useEffect(() => {
    setsearch([]);
    searchaddition(searchval, searchpage);
  }, [searchval]);

  // INITIALIZING DATA ONLOAD

  useEffect(() => {
    setpopularmoviepage(1);
    setnewmoviepage(1);
    settopmoviepage(1);
    setpopulartvpage(1);
    setnewtvpage(1);
    settoptvpage(1);
    trendingaddition();
  }, []);

  return (
    <div className=" bg-black h-screen w-screen flex flex-row ">
      <motion.div
        style={{ zIndex: 999, height: "51%", width: "94.5%", top: "47%" }}
        className={`text-black absolute max-w-11/12 ml-20 mr-12 mt-4 bg-black bg-opacity-95 flex flex-col rounded-md shadow-lg py-2 px-4 transition-opacity duration-300 ${
          showsearch ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className=" relative mx-auto mt-3 border-black border-2 rounded-lg">
          <input
            id="searchInput"
            value={tempsearchval}
            className="px-4 py-2 rounded-lg w-96 focus:shadow-md focus:shadow-black"
            type="text"
            placeholder="Search..."
            onChange={(e) => settempsearchval(e.target.value)}
          />
          <motion.button
            id="searchButton"
            className="px-4 ml-4 py-2 border-2 border-black bg-green-700 text-white rounded-lg hover:bg-green-800 mx-auto mt-3 hover:shadow-sm hover:shadow-black"
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              performsearch();
            }}
          >
            Search
          </motion.button>
        </div>
        {search.length != 0 ? (
          <MovieList
            selfid="search"
            data={search}
            style={{ zIndex: 20 }}
            fetchmore={handlefetch}
            handlehover={changetrailer}
            handleback={changeback}
            handleid={setwatchid}
            handlemedia={setmedia}
            title={"Searchs"}
            hcast={castaddition}
            htitle={handletitle}
            hdesc={handledesc}
            hyear={handleyear}
            hrating={handlerating}
            hpopularity={handlepopularity}
            adds={newsearchadds}
          ></MovieList>
        ) : (
          <div />
        )}
      </motion.div>
      <motion.div
        style={{
          zIndex: 999,
          height: !isMobile ? "51%" : "99%",
          width: "94.5%",
          top: !isMobile ? "47%" : "0%",
        }}
        className={`text-black absolute max-w-11/12 ml-20 mr-12 mt-4 bg-black bg-opacity-95 flex flex-col rounded-md shadow-lg py-2 px-4 transition-opacity duration-300 ${
          showfilter ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Filter
          changetrailer={changetrailer}
          changeback={changeback}
          handletitle={handletitle}
          handleid={setwatchid}
          handlemedia={setmedia}
          hcast={castaddition}
          handledesc={handledesc}
          handleyear={handleyear}
          handlerating={handlerating}
          handlepopularity={handlepopularity}
        />
      </motion.div>
      <motion.div
        style={{ zIndex: 999 }}
        className={`text-black absolute bottom-40 ml-2 mt-2 max-w-44 bg-slate-200 bg-opacity-90 rounded-md shadow-lg py-2 px-4 transition-opacity duration-300 ${
          showshare ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <motion.img
          className="w-8 h-8 my-3 hover:cursor-pointer"
          src={insta}
          alt="as"
          whileHover={{ scale: 1.11 }}
        ></motion.img>
        <motion.img
          className="w-8 h-8 my-3 hover:cursor-pointer"
          src={whatsapp}
          alt="as"
          whileHover={{ scale: 1.11 }}
        ></motion.img>
        <motion.img
          className="w-8 h-8 my-3 hover:cursor-pointer"
          src={mail}
          alt="as"
          whileHover={{ scale: 1.11 }}
        ></motion.img>
        <motion.img
          className="w-8 h-8 my-3 hover:cursor-pointer"
          src={facebook}
          alt="as"
          whileHover={{ scale: 1.11 }}
        ></motion.img>
      </motion.div>
      <div className="h-screen min-w-20 border-r-2 p-2 border-white flex flex-col justify-between ">
        <div>
          <motion.div
            className="w-fit mx-auto my-5 rounded-full border-2 border-white hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
          >
            <img className="w-12 h-12 " src={home1img} alt="img"></img>
          </motion.div>
          <motion.div
            className="w-fit mx-auto my-5 rounded-full border-2 border-white p-2 hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              setshowfilter(0);
              setshowsearch(!showsearch);
              setsliderlogo(true);
              setsearchlogo(!searchlogo);
            }}
          >
            <img
              className="w-7 h-7 "
              src={searchlogo ? searchimg : cross}
              alt="img"
            ></img>
          </motion.div>
          <motion.div
            className="w-fit mx-auto my-5 rounded-full border-2 border-white p-2 hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              setshowfilter(!showfilter);
              setshowsearch(0);
              setsearchlogo(true);
              setsliderlogo(!sliderlogo);
            }}
          >
            <img
              className={`w-7 h-7 `}
              src={sliderlogo ? sliderimg : cross}
              alt="img"
            ></img>
          </motion.div>
        </div>
        <div>
          <div className="relative">
            <motion.div
              className={`w-fit mx-auto my-5 rounded-full border-2 border-white p-2 hover:cursor-pointer ${
                sharelogo ? "pr-3" : ""
              } flex flex-row`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              onClick={() => {
                setshowshare(!showshare);
                setsharelogo(!sharelogo);
              }}
            >
              <img
                className="w-6 h-6"
                src={sharelogo ? shareimg : cross}
                alt="Share"
              ></img>
            </motion.div>
            {/* Tooltip */}
          </div>

          <motion.div
            className="w-fit mx-auto my-5 rounded-full border-2 border-white p-2 hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
          >
            <img className="w-7 h-7 " src={userimg} alt="img"></img>
          </motion.div>
        </div>
      </div>

      <div className="overflow-auto flex flex-col flex-grow justify-between">
        <motion.div
          className="min-h-96 flex flex-row p-5 "
          style={{ scale: 1 }}
        >
          <div
            className="lg:w-1/2 md:w-5/12 w-screen mt-1 flex flex-col  text-white px-8 overflow-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-black"
            style={{ height: "93%" }}
          >
            <div className="mx-auto lg:text-3xl md:text-2xl text-xl mt-5">
              {title}
            </div>
            <div className="flex flex-row mt-1 ">
              <div className="w-2/3 text-sm flex flex-col mt-2">
                {getDescription()}
                {desc.split(" ").length > wordLimit && (
                  <button
                    className="text-left underline font-semibold mt-1 mb-8"
                    onClick={toggleShowMore}
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              <div className="w-1/3 flex flex-col justify-start ml-7 text-md">
                <div className="my-2">RELEASE: {year}</div>
                <div className="my-2">RATING: {rating}</div>
                <div className="my-2">Popularity: {popularity}</div>
                <div className="my-2">
                  Cast:{" "}
                  {cast &&
                    cast
                      .slice(0, 4)
                      .map((item, index) => <p key={index}>{item.name}</p>)}
                </div>
              </div>
            </div>
          </div>
          {backd ? (
            <div className="w-2/3 max-h-2/3 md:flex hidden justify-center items-center">
              <img className="w-32 h-32" src={buffer} alt="img"></img>
            </div>
          ) : !isMobile && !nulltrailer ? (
            <div className="w-2/3 max-h-full flex justify-center items-center">
              <ReactPlayer
                className="overflow-hidden"
                url={`http://${link.slice(40, 73)}`}
                playing={true}
                loop={true}
                volume={0}
                muted={true} // Explicitly mute audio
                width="40%" // Ensure full width
                height="41%" // Ensure full height
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      autohide: 1,
                    },
                  },
                }}
                style={{
                  position: "absolute",
                  top: "5%",
                  right: "7%",
                  zIndex: 1,
                  transform: "scale(1.18)", // Adjust scale for desired size
                }}
              ></ReactPlayer>
            </div>
          ) : nulltrailer && !backd ? (
            <div className="md:flex hidden w-2/3 max-h-full justify-center items-center">
              <p className="text-white text-4xl font-bold text-center">
                No trailer Found
              </p>
            </div>
          ) : (
            <p></p>
          )}
        </motion.div>
        <div className="h-1/2 flex flex-row">
          <div
            className=" flex flex-col overflow-auto p-2 pl-4 pr-2 z-10 scroll-smooth bg-gradient-to-b from-black to bg-indigo-900  scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent snap-y snap-mandatory "
            style={{ zIndex: 20, width: "300%", height: "100%" }}
          >
            {popularmovies.length != 0 ? (
              <MovieList
                selfid="popular"
                style={{ zIndex: 20 }}
                data={popularmovies}
                fetchmore={handlefetch}
                hcast={castaddition}
                handleid={setwatchid}
                handlemedia={setmedia}
                title={"Popular Movies"}
                handlehover={changetrailer}
                handleback={changeback}
                htitle={handletitle}
                hdesc={handledesc}
                hyear={handleyear}
                hrating={handlerating}
                hpopularity={handlepopularity}
                adds={newpopularadds}
              ></MovieList>
            ) : (
              <div />
            )}
            {populartv.length != 0 ? (
              <MovieList
                selfid="populartv"
                data={populartv}
                style={{ zIndex: 20 }}
                fetchmore={handlefetch}
                handlehover={changetrailer}
                handleid={setwatchid}
                handlemedia={setmedia}
                handleback={changeback}
                title={"Popular Series"}
                htitle={handletitle}
                hdesc={handledesc}
                hcast={castaddition}
                hyear={handleyear}
                hrating={handlerating}
                hpopularity={handlepopularity}
                adds={newpopulartvadds}
              ></MovieList>
            ) : (
              <div />
            )}
            {newmovies.length != 0 ? (
              <MovieList
                selfid="new"
                data={newmovies}
                style={{ zIndex: 20 }}
                fetchmore={handlefetch}
                handleid={setwatchid}
                handlemedia={setmedia}
                handlehover={changetrailer}
                hcast={castaddition}
                handleback={changeback}
                title={"New Movies"}
                htitle={handletitle}
                hdesc={handledesc}
                hyear={handleyear}
                hrating={handlerating}
                hpopularity={handlepopularity}
                adds={newnewadds}
              ></MovieList>
            ) : (
              <div />
            )}
            {newtv.length != 0 ? (
              <MovieList
                selfid="newtv"
                data={newtv}
                style={{ zIndex: 20 }}
                fetchmore={handlefetch}
                handlehover={changetrailer}
                hcast={castaddition}
                handleid={setwatchid}
                handlemedia={setmedia}
                handleback={changeback}
                title={"New Series"}
                htitle={handletitle}
                hdesc={handledesc}
                hyear={handleyear}
                hrating={handlerating}
                hpopularity={handlepopularity}
                adds={newnewtvadds}
              ></MovieList>
            ) : (
              <div />
            )}
            {topmovies.length != 0 ? (
              <MovieList
                selfid="top"
                data={topmovies}
                style={{ zIndex: 20 }}
                fetchmore={handlefetch}
                handlehover={changetrailer}
                hcast={castaddition}
                handleback={changeback}
                handleid={setwatchid}
                handlemedia={setmedia}
                title={"Top IMDB Movies"}
                htitle={handletitle}
                hdesc={handledesc}
                hyear={handleyear}
                hrating={handlerating}
                hpopularity={handlepopularity}
                adds={newtopadds}
              ></MovieList>
            ) : (
              <div />
            )}
            {toptv.length != 0 ? (
              <MovieList
                selfid="toptv"
                data={toptv}
                hcast={cast}
                style={{ zIndex: 20 }}
                fetchmore={handlefetch}
                handlehover={changetrailer}
                handleback={changeback}
                handleid={setwatchid}
                handlemedia={setmedia}
                title={"Top IMDB Series"}
                htitle={handletitle}
                hdesc={handledesc}
                hyear={handleyear}
                hrating={handlerating}
                hpopularity={handlepopularity}
                adds={newtoptvadds}
              ></MovieList>
            ) : (
              <div />
            )}
          </div>
          {!isMobile ? (
            <div className="bg-gradient-to-b from-black to bg-indigo-900 h-11/12 w-full p-6 pt-0 mt-6">
              <Trending data={trending} />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
