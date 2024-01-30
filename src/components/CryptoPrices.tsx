// src/components/CryptoPrices.tsx
import React, { useEffect, useState } from "react";
import { webSocketService } from "../services/WebSocketService";

type CryptoData = {
  ev: string;
  pair: string;
  o: number;
  c: number;
  h: number;
  l: number;
  v: number;
  s: number;
  e: number;
  vw: number;
  z: number;
};

const CryptoPrices: React.FC = () => {
  const [prices, setPrices] = useState<CryptoData[]>([]);

  useEffect(() => {
    setTimeout(() => webSocketService.subscribeToChannel("XAS.BTC-USD"), 2000);
    
    webSocketService.setCallback((data) => {
      const newPrices: CryptoData[] = data.filter((price : CryptoData) => price.ev === 'XAS' && price.pair && price.pair === 'BTC-USD');
      if (newPrices.length) {
        setPrices((prevPrices) => [...newPrices, ...prevPrices].slice(0, 20));
      }
    });

    return () => {
      setTimeout(() => webSocketService.unsubscribeFromChannel("XAS.BTC-USD"), 2000);
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cryptocurrency Prices</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-start">Pair</th>
              <th className="px-4 py-2 text-start">Open</th>
              <th className="px-4 py-2 text-start">Close</th>
              <th className="px-4 py-2 text-start">High</th>
              <th className="px-4 py-2 text-start">Low</th>
              <th className="px-4 py-2 text-start">Volume</th>
              <th className="px-4 py-2 text-start">VWAP</th>
              <th className="px-4 py-2 text-start">Avg Trade Size</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{price.pair}</td>
                <td className="px-4 py-2">{price.o.toFixed(2)}</td>
                <td className="px-4 py-2">{price.c.toFixed(2)}</td>
                <td className="px-4 py-2">{price.h.toFixed(2)}</td>
                <td className="px-4 py-2">{price.l.toFixed(2)}</td>
                <td className="px-4 py-2">{price.v}</td>
                <td className="px-4 py-2">{price.vw.toFixed(2)}</td>
                <td className="px-4 py-2">{price.z}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoPrices;
