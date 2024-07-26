import React, { Component, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieList from "./movielists";
import arrowd from "../assets/arrowd.png";
import arrowu from "../assets/arrowu.png";
import FilterComponent from "./filtercomponent";

const Filter = (props) => {
  const [genres, setgenres] = useState([]);
  const [iyear, setiyear] = useState([]);
  const [lang, setlang] = useState([]);
  const [resultpage, setresultpage] = useState(0);
  const [results, setresults] = useState([]);
  const [showresult, setshowresult] = useState(false);

  const [resultadds, setresultadds] = useState(0);

  const [selectedgenre, setselectedgenre] = useState("Any");
  const [selectedtype, setselectedtype] = useState("Series/Movies");
  const [selectedyear, setselectedyear] = useState("Any");
  const [selectedlang, setselectedlang] = useState("Any");
  const [selectedsort, setselectedsort] = useState("Popularity");
  const [selectedorder, setselectedorder] = useState("Descending");

  const searchaddition = async (num) => {
    if (num === 0) {
      num = 1;
    }
    let sg, st, sy, sl, ss, so;
    if (selectedgenre === "Any") {
      sg = "";
    } else {
      sg = selectedgenre;
    }
    if (selectedyear === "Any") {
      sy = "";
    } else {
      sy = selectedyear;
    }
    if (selectedlang === "Any" || selectedlang === "xx") {
      sl = "";
    } else {
      sl = selectedlang;
    }

    if (selectedorder === "Ascending") {
      so = "asc";
    } else {
      so = "desc";
    }
    ss = selectedsort.toLowerCase();
    st = selectedtype;
    const d = {
      genre: sg,
      type: st,
      year: sy,
      lang: sl,
      sort: ss,
      order: so,
    };
    console.log(sg, st, sy, sl, ss, so);
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "searchgenre",
          data: d,
          id: 0,
          number: num,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      console.log(data.sol);
      setresults((prevresultss) => {
        const existingIds = new Set(prevresultss.map((movie) => movie.id));
        const newresultses = [...prevresultss];
        for (const a of data.sol) {
          if (
            !existingIds.has(a.id) &&
            !(a.media_type === "person") &&
            !(a.poster_path === null)
          ) {
            newresultses.push(a);
          }
        }
        setresultadds(newresultses.length - results.length);
        return newresultses;
      });
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const genreaddition = async (name) => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: name,
          id: 0,
          number: 0,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
      if (name === "lang") {
        data.sol.unshift({ iso_639_1: "Any", english_name: "Any" });
        setlang(data.sol);
      } else {
        data.sol.unshift({ id: "Any", name: "Any" });
        setgenres(data.sol);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    searchaddition(resultpage);
  }, [resultpage]);

  useEffect(() => {
    genreaddition("lang");
    genreaddition("Series/Movies");
  }, []);

  const mediatype = [
    { id: "mt1", name: "Series/Movies" },
    { id: "mt2", name: "Movies" },
    { id: "mt3", name: "Series" },
  ];

  const sortby = [
    { name: "Title" },
    { name: "Popularity" },
    { name: "Revenue" },
    { name: "Release Date" },
    { name: "Vote Average" },
    { name: "Vote Count" },
  ];

  const order = [{ name: "Descending" }, { name: "Ascending" }];

  const genyear = () => {
    const d = new Date();
    let year = d.getFullYear();
    let iter = year;
    let array = [{ name: "Any" }];
    while (iter !== year - 10) {
      array.push({ name: iter });
      iter -= 1;
    }
    array.push({ name: `before ${iter + 1}` });
    console.log(array);
    return array;
  };

  const handlefetch = async () => {
    setresultpage(resultpage + 1);
  };

  useEffect(() => {
    setiyear(genyear());
  }, []);

  useEffect(() => {
    genreaddition(selectedtype);
  }, [selectedtype]);

  useEffect(() => {
    if (selectedorder === "") {
      setselectedorder("Ascending");
    }
  }, [selectedsort]);

  return (
    <motion.div className="flex flex-col justify-start">
      <motion.div className="flex flex-col md:flex-row md:justify-center text-white text-center text-lg mt-1">
        <motion.div className="flex flex-row mb-2 justify-start">
          <FilterComponent
            data={mediatype}
            title="Type"
            selected={setselectedtype}
            initialtext={selectedtype}
          />
          <FilterComponent
            data={genres}
            title="Genre"
            selected={setselectedgenre}
            initialtext={selectedgenre}
          />
        </motion.div>
        <motion.div className="flex flex-row mb-2 justify-start">
          <FilterComponent
            data={iyear}
            title="Release Year"
            selected={setselectedyear}
            initialtext={selectedyear}
          />
          <FilterComponent
            data={lang}
            title="Language"
            selected={setselectedlang}
            initialtext={selectedlang}
          />
        </motion.div>
        <motion.div className="flex flex-row mb-2 justify-start">
          <FilterComponent
            data={sortby}
            title="Sort By"
            selected={setselectedsort}
            initialtext={selectedsort}
          />
          <FilterComponent
            data={order}
            title="Order"
            selected={setselectedorder}
            initialtext={selectedorder}
          />
          <motion.button
            id="searchButton"
            className="w-24 ml-6 h-11 mt-5 text-center border-2 border-black bg-green-700 text-white rounded-lg hover:bg-green-800 mx-auto hover:shadow-sm hover:shadow-black"
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              setresults([]);
              setshowresult(true);
              if (resultpage === 1) {
                searchaddition(resultpage);
              } else {
                setresultpage(1);
              }

              console.log("clicked");
            }}
          >
            Search
          </motion.button>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-1" style={{ zIndex: -999, width: "96%" }}>
        {showresult ? (
          <MovieList
            selfid="search"
            data={results}
            style={{ zIndex: 20 }}
            fetchmore={handlefetch}
            handlehover={props.changetrailer}
            handleback={props.changeback}
            handleid={props.handleid}
            handlemedia={props.handlemedia}
            hcast={props.hcast}
            title={"Filters"}
            htitle={props.handletitle}
            hdesc={props.handledesc}
            hyear={props.handleyear}
            hrating={props.handlerating}
            hpopularity={props.handlepopularity}
            adds={resultadds}
          ></MovieList>
        ) : null}
      </div>
    </motion.div>
  );
};

export default Filter;
