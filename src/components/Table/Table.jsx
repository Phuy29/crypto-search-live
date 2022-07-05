import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const Table = () => {
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

  const setComma = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="container mx-auto pt-18 pb-48 px-2">
      <table className="table-fixed cursor-pointer">
        {/* head */}
        <thead className="bg-gray-200">
          <tr className="text-left text-gray-600 text-sm">
            <th className="w-1/4 p-4">Name</th>
            <th className="w-1/4">Price</th>
            <th className="w-1/4">24h %</th>
            <th className="w-1/4 hidden sm:table-cell">Market Cap</th>
            <th className="w-1/4 hidden sm:table-cell">Volume</th>
          </tr>
        </thead>

        {/* body */}
        <tbody className="divide-y">
          {coins.map((item) => {
            return (
              <tr
                className="text-sm hover:bg-gray-100 transition duration-300"
                key={item.id}
              >
                <td className="p-4 flex items-center">
                  <p className="mr-2">{item.market_cap_rank}</p>
                  <img
                    src={item.image}
                    alt=""
                    className="w-6 h-6 rounded-full mr-1"
                  />
                  <p className="font-bold mr-1">{item.name}</p>
                  <p className="uppercase text-gray-500 hidden sm:table-cell">
                    {item.symbol}
                  </p>
                </td>
                <td className="font-bold">${item.current_price}</td>
                <td className="font-bold">
                  {item.price_change_percentage_24h > 0 ? (
                    <p className="text-green-500 flex items-center">
                      <AiFillCaretUp className="mr-1 text-green-400" />
                      {item.price_change_percentage_24h}
                      <span>%</span>
                    </p>
                  ) : (
                    <p className="text-red-500 flex items-center">
                      <AiFillCaretDown className="mr-1 text-red-400" />
                      {item.price_change_percentage_24h}
                    </p>
                  )}
                </td>
                <td className="hidden sm:table-cell">
                  $ {setComma(item.market_cap)}
                </td>
                <td className="pr-4 hidden sm:table-cell">
                  {setComma(item.total_volume)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
