import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../assets/css/listOfQuotes.css";
import emojiBaby from "../assets/images/emoji baby.png";
import emojiPerson from "../assets/images/emoji person.png";

function ListOfQuotes() {
  const [quote, setQuote] = useState([]);
  const [ages, setAge] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const quotePerPage = 10;
  const pagesVisited = pageNumber * quotePerPage;

  const fetchData = () => {
    fetch("https://api.quotable.io/quotes")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  function fetchDataForAuthor(author) {
    let firstName = author.split(" ")[0];
    fetch("https://api.agify.io?name=" + firstName, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.age < 50) {
          setAge(emojiBaby);
        } else {
          setAge(emojiPerson);
        }
      })
      .catch((err) => console.log(err));
  }

  /*function testPersonImage(author) {
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);    
    setAge(rand < 50 ? emojiBaby : emojiPerson)
  }*/

  useEffect(() => {
    fetchData();
  }, []);

  const pageCount = Math.ceil(quote.length / quotePerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="list-quotes">
      <h2 className="title">List of Quotes</h2>
      <table id="customers" responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Quote</th>
            <th>Age Emoji</th>
          </tr>
        </thead>
        <tbody>
          {quote.slice(pagesVisited, pagesVisited + quotePerPage).map((item, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.author}</td>
              <td>{item.content}</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                <img
                  alt=""
                  src={ages}
                  style={{ width: "30px", height: "30px" }}
                >
                  {fetchDataForAuthor(item.author)}
                </img>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      <div style={{ marginLeft: "650px" }}>
        <a href="/random-quote" className="Button">
          Random quote{" "}
        </a>
      </div>
    
    </div>
  );
}
export default ListOfQuotes;