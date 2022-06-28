import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useOnClickOutside from "../../hooks/useClickOutSide";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, () => setShowResult(false));

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }

    const getCoins = async () => {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${searchValue}`
      );

      setSearchResult(res.data.coins);
    };

    getCoins();
  }, [searchValue]);

  console.log(searchResult);

  return (
    <div className="flex flex-col justify-center items-center mt-14 relative pb-20">
      {/* search */}
      <div className="pb-2">
        <div className="relative">
          <input
            value={searchValue}
            type="text"
            placeholder="Search ..."
            className="border w-[350px] border-gray-500 rounded py-2 pl-2 pr-8 focus:outline-none focus:shadow-lg"
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          <AiOutlineSearch className="text-gray-500 absolute right-2 top-2/4 transform -translate-y-1/2" />
        </div>
      </div>

      {searchResult.length > 0 && showResult && (
        <div
          ref={ref}
          className="w-[350px] h-[300px] rounded bg-white absolute top-12 z-9 overflow-y-scroll z-10"
        >
          <div className="flex justify-between w-full">
            <ul className="py-1 w-full">
              {searchResult.map((item) => {
                return (
                  <a href={`/coin/${item.id}`} key={item.id}>
                    <li className="text-sm flex justify-between items-center font-medium w-full py-2 text-gray-700 cursor-pointer px-2 hover:bg-gray-100">
                      <div className="flex items-center">
                        <img src={item.thumb} className="w-4 h-4" alt="" />
                        <p className="pl-2">{item.name}</p>
                      </div>
                      <div className="text-gray-400">
                        #{item.market_cap_rank}
                      </div>
                    </li>
                  </a>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
