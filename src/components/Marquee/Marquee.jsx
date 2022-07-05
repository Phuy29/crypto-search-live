import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const Marquee = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );

      setCoins(res.data);
    };

    const timerId = setTimeout(() => {
      fetchApi();
    }, 2000);

    return () => clearTimeout(timerId);
  }, [coins]);

  const tenItems = [...coins].splice(0, 10);

  const setTruncateString = (value, size) => {
    if (!value) return "";
    value = value.toString();

    if (value.length <= size) {
      return value;
    }
    return value.substr(0, size);
  };

  return (
    <div className="marquee w-full h-12 overflow-hidden bg-black relative">
      <ul className="marquee-content h-full flex">
        {/* main */}
        {tenItems.map((item) => {
          return (
            <li
              key={item.id}
              className="flex justify-between items-center flex-shrink-0 text-white transform scale-75 lg:scale-100"
            >
              <div className="flex justify-between w-3/4">
                {/* ticket */}
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt=""
                    className="w-4 h-4 lg:w-6 lg:h-6 rounded-full mr-4 object-cover"
                  />
                  <div className="hidden lg:block">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs uppercase tracking-widest">
                      {item.symbol}
                    </p>
                  </div>

                  {/* price */}
                  <div className="pl-8">
                    <p className="font-bold text-xs lg:text-base flex justify-end items-center">
                      {item.current_price}
                    </p>

                    {item.price_change_percentage_24h > 0 ? (
                      <p className="text-green-400 font-bold text-xs flex justify-end items-center">
                        <AiFillCaretUp className="mr-1 text-green-400" />
                        {setTruncateString(item.price_change_percentage_24h, 5)}
                        <span>%</span>
                      </p>
                    ) : (
                      <p className="text-red-400 font-bold text-xs flex justify-end items-center">
                        <AiFillCaretDown className="mr-1 text-red-400" />
                        {setTruncateString(item.price_change_percentage_24h, 5)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}

        {/* clones */}
        {tenItems.map((item) => {
          return (
            <li
              key={item.id}
              className="flex justify-between items-center flex-shrink-0 text-white transform scale-75 lg:scale-100"
            >
              <div className="flex justify-between w-3/4">
                {/* ticket */}
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt=""
                    className="w-4 h-4 lg:w-6 lg:h-6 rounded-full mr-4 object-cover"
                  />
                  <div className="hidden lg:block">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs uppercase tracking-widest">
                      {item.symbol}
                    </p>
                  </div>

                  {/* price */}
                  <div className="md:pl-8">
                    <p className="font-bold text-xs lg:text-base flex justify-end items-center">
                      {item.current_price}
                    </p>

                    {item.price_change_percentage_24h > 0 ? (
                      <p className="text-green-400 font-bold text-xs flex justify-end items-center">
                        <AiFillCaretUp className="mr-1 text-green-400" />
                        {setTruncateString(item.price_change_percentage_24h, 5)}
                      </p>
                    ) : (
                      <p className="text-red-400 font-bold text-xs flex justify-end items-center">
                        <AiFillCaretDown className="mr-1 text-red-400" />
                        {setTruncateString(item.price_change_percentage_24h, 5)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Marquee;
