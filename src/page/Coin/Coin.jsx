import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router";

const Coin = () => {
  const [coin, setCoin] = useState({});

  const params = useParams();

  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const getCoin = async () => {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.coinId}`
      );

      setCoin(res.data);
    };

    getCoin();
  });

  return (
    <div className="flex justify-center flex-col items-center px-5 z-10">
      <div>
        <button className="text-xl underline" onClick={handleReturnHome}>
          Return Home →
        </button>
      </div>

      <div className="px-10 py-5 border shadow-lg rounded-2xl text-5xl font-semibold mt-7">
        {coin.name}
      </div>

      <div className="container lg:w-[800px] mt-8 border shadow-lg rounded-2xl px-10 py-5">
        <div className="px-2 py-1 bg-black text-white inline-block rounded-md">
          Rank #{coin.market_cap_rank}
        </div>

        <div className="flex justify-between py-2">
          {/* Info */}
          <div className="flex items-center">
            {coin.image ? (
              <img
                src={coin.image.small}
                className="w-10 h-10 rounded-full mr-2"
                alt=""
              />
            ) : null}
            <p className="font-bold mr-1">{coin.name}</p>
            <p className="uppercase text-gray-500">{coin.symbol}</p>
          </div>

          {/* Price */}
          <div>
            {coin.market_data?.current_price ? (
              <h1 className="font-bold text-xl">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </h1>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container lg:w-[800px] mt-6 border shadow-lg rounded-2xl px-8 py-4 grid md:grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-x-7 gap-y-4">
        <div className="flex justify-between border-b border-gray-500">
          <p className="text-xl font-semibold">24 Hour Low</p>
          {coin.market_data?.low_24h ? (
            <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
          ) : null}
        </div>

        <div className="flex justify-between border-b border-gray-500">
          <p className="text-xl font-semibold">Market Cap</p>
          {coin.market_data?.market_cap ? (
            <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
          ) : null}
        </div>

        <div className="flex justify-between border-b border-gray-500">
          <p className="text-xl font-semibold">24 Hour High</p>
          {coin.market_data?.high_24h ? (
            <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
          ) : null}
        </div>

        <div className="flex justify-between border-b border-gray-500">
          <p className="text-xl font-semibold">Circulating Supply</p>
          {coin.market_data ? (
            <p>{coin.market_data.circulating_supply}</p>
          ) : null}
        </div>
      </div>

      <div className="container lg:w-[800px] mt-6 border shadow-lg rounded-2xl px-8 py-4">
        <div className="text-xl font-semibold">About</div>
        <p
          className="mt-2"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              coin.description ? coin.description.en : ""
            ),
          }}
        ></p>
      </div>
    </div>
  );
};

export default Coin;
