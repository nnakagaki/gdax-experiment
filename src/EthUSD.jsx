import React, { useState, useEffect } from 'react';
import { PublicClient } from 'coinbase-pro';
import Strategy from './Strategy';
import UserData from './UserData';

export default function() {
  const [data, setData] = useState({});
  const [initialized, setInitialized] = useState(false);
  let strategy;
  const publicClient = new PublicClient();

  useEffect(() => {
    publicClient.getProductHistoricRates('ETH-USD', { granularity : 3600 }).then((result) => {
      strategy = new Strategy({
        currentValue : result[0][4],
        lowestValue  : result[0][1],
        highestValue : result[0][2]
      });
      setData({
        buyingPrice                 : strategy.buyingPrice,
        currentValue                : strategy.currentValue,
        highestValue                : strategy.highestValue,
        lowestValue                 : strategy.lowestValue,
        mostRecentPricePointActedOn : strategy.mostRecentPricePointActedOn,
        sellingPrice                : strategy.sellingPrice,
        shouldSell                  : strategy.shouldSell,
        shouldBuy                   : strategy.shouldBuy
      });
      setInitialized(true);
      setInterval(() => {
        publicClient.getProductTicker('ETH-USD').then((result) => {
          const { price } = result;
          strategy.update(price);
          setData({
            buyingPrice                 : strategy.buyingPrice,
            currentValue                : strategy.currentValue,
            highestValue                : strategy.highestValue,
            lowestValue                 : strategy.lowestValue,
            mostRecentPricePointActedOn : strategy.mostRecentPricePointActedOn,
            sellingPrice                : strategy.sellingPrice,
            shouldSell                  : strategy.shouldSell,
            shouldBuy                   : strategy.shouldBuy
          });
        });
      }, 1000);
    });
  }, []);

  return (
    <>
      <UserData />
      { initialized && (
        <>
          <div>Most recent price point acted on: {data.mostRecentPricePointActedOn}</div>
          <div>currentETHInUSD: {data.currentValue}</div>
          <div>highestETHInUSD: {data.highestValue}</div>
          <div>sell when ETH in USD is lower than: {data.sellingPrice}</div>
          <div>lowestETHInUSD: {data.lowestValue}</div>
          <div>buy when ETH In USD is higher than: {data.buyingPrice}</div>
          <div>should sell: {data.shouldSell.toString()}</div>
          <div>should buy: {data.shouldBuy.toString()}</div>
        </>
      )}
    </>
  )
}
