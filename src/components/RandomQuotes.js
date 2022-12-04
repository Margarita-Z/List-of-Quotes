import React, { useEffect, useState } from "react";
import "../assets/css/randomQuotes.css";

function RandomQuotes() {
  const [random, setRandom] = useState("");
  
  const getRandom = () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setRandom(data[randomNum]);
        console.log(data)
      });
  };
  useEffect(() => {
    getRandom();
  },[]);
  return (
    <div className="allBlock"> 
    <div className="area">
      <p className="text">{random.text}</p>
      <p className="author">-{random.author}-</p>
      <div className="buttons">
      <button onClick={getRandom} className="button-buuton"> Get quote</button>
      <a href='/' className="button-buuton">Back</a>
      </div>
      </div>
    </div>
  );
}
export default RandomQuotes;
