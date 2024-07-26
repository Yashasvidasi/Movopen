import React, { Component } from "react";
import FilterComponent from "./filtercomponent";

const ProviderCard = (props) => {
  return (
    <div className="mt-20 text-md flex flex-row text-center border-2 border-transparent justify-center min-w-fit">
      <div className="mx-5  min-w-fit overflow-auto max-h-56 min-h-40  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white pr-2">
        <p className="font-semibold text-lg mx-2">Available to Buy at</p>
        {props.data && props.data.buy ? (
          props.data.buy.map((item, index) => {
            return (
              <div key={index} className="flex flex-row my-5 ">
                <img
                  className="w-9 h-9 rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                  alt="Logo"
                />
                <p className="self-center ml-2 max-w-20">
                  {item.provider_name}
                </p>
              </div>
            );
          })
        ) : (
          <p className="my-3">None</p>
        )}
      </div>
      <div className="mx-5 min-w-fit overflow-auto max-h-56 min-h-40  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white pr-2">
        <p className="font-semibold mx-2 text-lg">Available to Rent at</p>
        {props.data && props.data.rent ? (
          props.data.rent.map((item, index) => {
            return (
              <div key={index} className="flex flex-row my-5 ">
                <img
                  className="w-9 h-9 rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                  alt="Logo"
                />
                <p className="self-center ml-2 max-w-20">
                  {item.provider_name}
                </p>
              </div>
            );
          })
        ) : (
          <p className="my-3">None</p>
        )}
      </div>
      <div className="mx-5 min-w-fit overflow-auto max-h-56 min-h-40 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white pr-2 ">
        <p className="font-semibold mx-2 text-lg">Streaming on:</p>
        {props.data && props.data.flatrate ? (
          props.data.flatrate.map((item, index) => {
            return (
              <div key={index} className="flex flex-row my-5 ">
                <img
                  className="w-9 h-9 rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                  alt="Logo"
                />
                <p className="self-center ml-2 max-w-20">
                  {item.provider_name}
                </p>
              </div>
            );
          })
        ) : (
          <p className="my-3">None</p>
        )}
      </div>
    </div>
  );
};

export default ProviderCard;
