import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AnimePage from "./Pages/Anime/page";
import SearchPage from "./Pages/Search/page";

function App() {
  return (
    <div className="App w-screen h-screen overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage/>} />
          <Route path="/anime" element={<AnimePage/>} />
          <Route path="/test" element={<p>Hello</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
