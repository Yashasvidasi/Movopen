import React, { useEffect, useRef, useCallback, useState } from "react";
import buffer from "../ZKZg.gif";
import Card from "./card";
import arrowl from "../assets/arrowl.png";
import arrowr from "../assets/arrowr.png";
import { motion } from "framer-motion";

const MovieList = (props) => {
  const listRef = useRef(null);
  const observer = useRef(null);
  const [showbuffer, setshowbuffer] = useState(false);
  const [shownodata, setshownodata] = useState(false);

  const lastref = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log("visible");
            setshowbuffer(true);
            props.fetchmore(props.selfid);

            observer.current.disconnect(); // Disconnect after the function is called
          }
        },
        {
          root: null, // Use the viewport as the root
          rootMargin: "0px",
          threshold: 0.1, // Adjust as needed (0.1 means 10% of the element must be visible)
        }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [props]
  );

  useEffect(() => {
    setshowbuffer(false);
  }, [props.data]);

  useEffect(() => {
    // Cleanup observer on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const scrollLeft = () => {
    if (listRef.current) {
      const element = listRef.current;
      const targetPosition = element.scrollLeft - 600;
      const startPosition = element.scrollLeft;
      const distance = targetPosition - startPosition;
      const duration = 500; // Duration of the scroll animation in milliseconds
      let startTime = null;

      const smoothScroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        element.scrollLeft = run;
        if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
      };

      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(smoothScroll);
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      const element = listRef.current;
      const targetPosition = element.scrollLeft + 600;
      const startPosition = element.scrollLeft;
      const distance = targetPosition - startPosition;
      const duration = 500; // Duration of the scroll animation in milliseconds
      let startTime = null;

      const smoothScroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        element.scrollLeft = run;
        if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
      };

      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(smoothScroll);
    }
  };
  return (
    <motion.div
      className={` hover:cursor-pointer bg-transparent${
        props.selfid === "search" ? "border-2" : ""
      } border-white my-6 rounded-3xl shadow-black snap-center snap-always scroll-smooth px-2`}
      style={{ scale: 0.5, boxShadow: "0px 20px 10px -10px #000000" }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.1 }} // Adjust duration as needed
    >
      <div
        className={`text-white  flex items-center justify-start ${
          props.selfid === "search" ? "mt-1 ml-7 text-lg" : "mt-4 ml-7 text-2xl"
        }mt-4 ml-7`}
      >
        <div
          className={`${
            props.selfid === "search"
              ? "text-2xl  my-3"
              : "text-3xl font-semibold my-3"
          }`}
        >
          {props.title}
        </div>
        <div className="flex items-center">
          <motion.div
            onClick={scrollLeft}
            whileHover={{ scale: [null, 1.1] }}
            whileTap={{ scale: [null, 0.9] }}
            className="text-white text-lg mr-2 bg-transparent border-none cursor-pointer"
          >
            <img
              className={`${
                props.selfid === "search" ? "w-11 h-9" : "w-16 h-12"
              }`}
              src={arrowl}
              alt="img"
            ></img>
          </motion.div>
          <motion.div
            onClick={scrollRight}
            whileHover={{ scale: [null, 1.1] }}
            whileTap={{ scale: [null, 0.9] }}
            className="text-white text-lg bg-transparent border-none cursor-pointer"
          >
            <img
              className={`${
                props.selfid === "search" ? "w-11 h-9" : "w-16 h-12"
              }`}
              src={arrowr}
              alt="img"
            ></img>
          </motion.div>
        </div>
      </div>
      <div
        className={` items-center flex flex-row ${
          props.selfid === "search" ? "p-2 mb-3 min-h-52" : "p-5 mb-3 min-h-64"
        } min-w-full overflow-x-auto scrollbar-hide`}
        ref={listRef}
      >
        {props.data.map((item, index) => {
          return (
            <Card
              key={index}
              innerref={index % props.adds === 5 ? lastref : null}
              slotlocation={index}
              data={item}
              self={props.selfid}
              fetch={props.fetchmore}
              handle={props.handlehover}
              handle2={props.handleback}
              handle3={props.htitle}
              handle4={props.hdesc}
              handle5={props.hyear}
              handle6={props.hrating}
              handle7={props.hpopularity}
              handleid={props.handleid}
              handlemedia={props.handlemedia}
              handlecast={props.hcast}
            />
          );
        })}
        {showbuffer ? (
          <motion.div
            className="relative border-2 border-white min-h-fit min-w-fit mx-2 hover:shadow-xl hover:shadow-black hover:cursor-pointer h-52 w-24"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              className="text-white text-wrap text-4xl text-center h-24 w-124 mt-10"
              src={buffer}
              alt="img"
            />
          </motion.div>
        ) : null}
        {props.data.length === 0 ? (
          <motion.div
            className="relative text-2xl text-white  min-h-fit min-w-fit mx-2 hover:shadow-xl hover:shadow-black hover:cursor-pointer h-52 w-24"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <p className="mt-12">NO Results</p>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default MovieList;
