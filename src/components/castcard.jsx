import React, { Component } from "react";

const CastCard = (props) => {
  return (
    <div className="w-fit h-fit mb-0 m-4">
      <img
        className="border-2 border-white  min-w-28 min-h-40 max-h-56"
        src={`https://image.tmdb.org/t/p/w500${props.data.profile_path}`}
      />
      <p className="text-base">{props.data.name}</p>
    </div>
  );
};

export default CastCard;
