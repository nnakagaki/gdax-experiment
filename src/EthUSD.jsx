import React, { useState, useEffect } from 'react';
import { PublicClient } from 'coinbase-pro';

let currentInterval;

export default function() {
  const [currentETHInUSD, setCurrentETHInUSD] = useState(null);
  const [highestETHInUSD, setHighestETHInUSD] = useState(0);
  const [lowestETHInUSD, setLowestETHInUSD] = useState(99999999);
  const [shouldBuy, setShouldBuy] = useState(false);
  const [shouldSell, setShouldSell] = useState(false);

  const publicClient = new PublicClient();

  const buyingPrice = lowestETHInUSD * 1.01;
  const sellingPrice = highestETHInUSD * 0.99;

  useEffect(() => {
    publicClient.getProductHistoricRates('ETH-USD', { granularity : 3600 }).then((result) => {
      setLowestETHInUSD(result[0][1]);
      setHighestETHInUSD(result[0][2]);
    });
  }, []);

  useEffect(() => {
    if (!currentETHInUSD) {
      return;
    }
    if (currentETHInUSD > buyingPrice) {
      setShouldBuy(true);
    } else {
      setShouldBuy(false);
    }
    if (currentETHInUSD < sellingPrice) {
      setShouldSell(true);
    } else {
      setShouldSell(false);
    }
  }, [currentETHInUSD, highestETHInUSD, lowestETHInUSD, buyingPrice, sellingPrice]);

  useEffect(() => {
    clearInterval(currentInterval);
    currentInterval = setInterval(() => {
      publicClient.getProductTicker('ETH-USD').then((result) => {
        console.log(result)
        const { price } = result;
        setCurrentETHInUSD(price);
        if (price > highestETHInUSD) {
          setHighestETHInUSD(price);
        }
        if (price < lowestETHInUSD) {
          setLowestETHInUSD(price);
        }
      });
    }, 1000);
  }, [currentETHInUSD, highestETHInUSD, lowestETHInUSD]);

  return (
    <>
      <div>currentETHInUSD: {currentETHInUSD}</div>
      <div>highestETHInUSD: {highestETHInUSD}</div>
      <div>sell when ETH in USD is lower than: {sellingPrice}</div>
      <div>lowestETHInUSD: {lowestETHInUSD}</div>
      <div>buy when ETH In USD is higher than: {buyingPrice}</div>
      <div>should sell: {shouldSell.toString()}</div>
      <div>should buy: {shouldBuy.toString()}</div>
    </>
  )
}
