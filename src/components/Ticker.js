import React, { useEffect, useState, useRef } from "react";
import { makeRandomNumber } from "../utils";

function Ticker() {
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("black");
  // create the ref and set its initial value
  const prevPriceRef = useRef(price);

  useEffect(() => {

    const timerID = setInterval(() => setPrice(makeRandomNumber), 3000);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    // use the current value of the ref
    const prevPrice = prevPriceRef.current;
    console.log(`Previous price is ${prevPrice}`)
    console.log(`Price is ${price}`)
    
    if (price > prevPrice) {
      setColor("green");
    } else if (price < prevPrice) {
      setColor("red");
    } else {
      setColor("black")
    }
    //set the new value of the ref (note: this doesn't trigger a re-render)
    prevPriceRef.current = price;
  }, [price])

  return (
    <div>
      <h1>TickerMaster</h1>
      <h2 style={{ color: color }}>{`Price: ${price}`}</h2>
    </div>
  );
}

export default Ticker;
