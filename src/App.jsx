import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import HomePage from "./components/homepage";
import MoviePage from "./components/moviepage";

const MovieRoute = () => {
  let { id } = useParams();
  return <MoviePage mainid={id} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieRoute />} />
      </Routes>
    </Router>
  );
};

export default App;
