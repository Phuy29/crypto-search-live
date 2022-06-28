import "./App.css";
import Marquee from "./components/Marquee/Marquee";
import Search from "./components/Search/Search";
import logo from "./asset/logo.png";
import Coin from "./page/Coin/Coin";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home/Home";

function App() {
  return (
    <div className="App">
      <div className="event">
        {/* Marquee */}
        <Marquee />

        {/* Logo */}
        <div className="logo flex justify-center flex-col items-center">
          <Link to="/">
            <div className="flex items-center mt-10 uppercase text-4xl font-semibold">
              <img src={logo} alt="" className="w-20 h-20 mr-2" />
              <span className="text-gray-800 mr-2">Crypto</span>
              <span className="text-gray-400">Search</span>
            </div>
          </Link>
          <div className="mt-3 text-sm md:text-2xl">
            <p>Be always updated with the lastest crypto news</p>
          </div>
          <div className="border-b-2 border-gray-600 w-16 mt-8"></div>
        </div>

        {/* Search */}
        <Search />
      </div>

      {/* Table */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/" element={<Coin />}>
          <Route path=":coinId" element={<Coin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
