import React, { Component, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieList from "./movielists";
import arrowd from "../assets/arrowd.png";
import arrowu from "../assets/arrowu.png";

const FilterComponent = (props) => {
  const [showgenre, setshowgenre] = useState(false);
  const [genretext, setgenretext] = useState(props.initialtext);
  return (
    <motion.div className="flex flex-col mx-3">
      <label className="mb-1 self-center"> {props.title}</label>
      <motion.div
        className="flex flex-row self-center bg-white bg-opacity-20 hover:cursor-pointer hover:bg-opacity-40 border-2 border-white p-1 pl-2 min-w-36 w-fit h-fit rounded-lg justify-between"
        onClick={() => {
          setshowgenre(!showgenre);
        }}
      >
        <p className="text-lg self-center">{genretext}</p>
        <img
          className="lg:h-8 lg:w-8 md:h-6 md:w-6 w-4 h-4 self-center md:ml-2 "
          src={showgenre ? arrowu : arrowd}
        ></img>
      </motion.div>
      <AnimatePresence>
        {showgenre ? (
          <motion.div
            className="bg-white bg-opacity-90 text-black border-2 border-black w-36 max-h-44 h-fit self-center mt-3 rounded-lg p-1 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black text-md relative"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            key="modal"
            transition={{ ease: "easeInOut", duration: 0.2 }}
          >
            {props.data.map((item, index) => {
              return (
                <motion.div
                  className="my-1 p-1 hover:cursor-pointer border-2 rounded-lg border-black"
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => {
                    setgenretext(
                      props.title === "Language" || props.title === "Country"
                        ? item.english_name
                        : item.name
                    );
                    setshowgenre(!showgenre);
                    props.selected(
                      props.title === "Language"
                        ? item.iso_639_1
                        : props.title === "Genre"
                        ? item.id
                        : props.title === "Country"
                        ? item.iso_3166_1
                        : item.name
                    );
                  }}
                >
                  {props.title === "Genre"
                    ? item.name
                    : props.title === "Country" || props.title === "Language"
                    ? item.english_name
                    : item.name}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div></div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterComponent;
