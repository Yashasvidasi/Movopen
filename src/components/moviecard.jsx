import React, { Component } from "react";
import { motion } from "framer-motion";

const MovieCard = (props) => {
  return (
    <motion.div
      className="h-fit m-3 flex flex-col hover:cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        className="border-2 border-white h-56 w-36"
        src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}
        alt={props.data.title || props.data.name}
      />
      <p className="h-fit w-36 text-center">
        {props.data.title || props.data.name}
      </p>
    </motion.div>
  );
};

export default MovieCard;
