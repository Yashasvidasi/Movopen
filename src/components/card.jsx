import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const Card = (props) => {
  const navigate = useNavigate();
  const hoverTimer = useRef(null);
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.start({
      width: "100%",
      transition: { duration: 1.2, ease: "easeInOut" },
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      width: "0%",
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  return (
    <motion.div
      ref={props.innerref}
      className="relative border-2 border-white min-h-fit min-w-fit mx-2 hover:shadow-xl hover:shadow-black hover:cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => {
        clearTimeout(hoverTimer.current);
        handleMouseEnter();
        hoverTimer.current = setTimeout(() => {
          props.handle(props.data.id, props.data.name ? false : true);
          props.handle2(props.data.backdrop_path);
          props.handle3(props.data.title || props.data.name);
          props.handle4(props.data.overview);
          props.handle5(props.data.release_date || props.data.first_air_date);
          props.handle6(props.data.vote_average);
          props.handle7(props.data.popularity);
          props.handleid(props.data.id);
          props.handlemedia(props.data.name ? "Series" : "Movie");
          props.handlecast("");
          props.handlecast(props.data.id);
          console.log(props.data);
        }, 1200);
      }}
      onMouseLeave={() => {
        handleMouseLeave();
        clearTimeout(hoverTimer.current);
      }}
      onClick={() => {
        const type = props.data.name ? "movie" : "movie";
        navigate(`/${type}/${props.data.id}`);
      }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-red-500 rounded"
        initial={{ width: 0 }}
        animate={controls}
      />

      <img
        className="text-white text-wrap text-4xl text-center "
        style={{
          width: props.self === "search" ? "110px" : "120px",
          height: props.self === "search" ? "200px" : "210px",
        }}
        src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}
        alt={`${props.data.name ? props.data.name : props.data.title}`}
      />
    </motion.div>
  );
};
export default Card;
