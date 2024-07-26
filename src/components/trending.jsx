import React, { Component } from "react";
import { motion } from "framer-motion";

const Trending = (props) => {
  return (
    <div
      className=" text-white  bg-transparent w-full rounded-lg p-5 flex flex-col overflow-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent border-2 border-white"
      style={{ height: "94%", boxShadow: "0px 20px 10px -10px #000000" }}
    >
      <p className="text-2xl mx-auto mb-4 font-semibold p-1 rounded-lg">
        TODAY'S PICKS
      </p>
      {props.data.map((item, index) => {
        return (
          <motion.p
            className=" mb-2 text-center hover:font-semibold hover:cursor-pointer p-1 rounded-xl"
            whileHover={{ scale: 1.07 }}
            key={index}
          >
            {item.title || item.name} (
            {item.release_date
              ? item.release_date.slice(0, 4)
              : "" || item.first_air_date
              ? item.first_air_date.slice(0, 4)
              : ""}
            )
          </motion.p>
        );
      })}
    </div>
  );
};

export default Trending;
