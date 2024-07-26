import React, { Component } from "react";
import { motion } from "framer-motion";

const ReviewCard = (props) => {
  return (
    <motion.div className="ml-14 m-5 bg-slate-100 bg-opacity-65 text-black p-5 rounded-xl">
      <div className="text-3xl mb-2">
        {props.data.author} - @{props.data.author_details.username}
      </div>
      <div className="text-2xl mb-7">
        Rating:-{props.data.author_details.rating}
      </div>
      <div className="text-lg">{props.data.content}</div>
    </motion.div>
  );
};

export default ReviewCard;
