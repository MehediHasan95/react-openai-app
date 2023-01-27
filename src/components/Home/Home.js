import {
  faRemove,
  faSadCry,
  faSearch,
  faSmileBeam,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Home = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const prompt = e.target.prompt.value;
    setLoading(true);
    fetch("http://localhost:5000/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setErrorMsg("");
        setResults(data);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="mx-4 lg:mx-0 Home grid grid-cols-1 content-between">
      <div>
        <div className="text-center  my-5">
          <h1 className="text-4xl font-bold text-amber-400">
            <FontAwesomeIcon icon={faSearch} /> Chat
            <span className="text-5xl text-pink-500">G</span>
            PT
          </h1>
          <p className="text-zinc-500">Ask me what you want to know</p>
        </div>
        <form onSubmit={handleSearch} className="text-center mb-5">
          <input
            type="search"
            name="prompt"
            placeholder="Type here"
            className="p-3 lg:mx-2 w-3/4 lg:w-3/6 outline-none"
          />

          <input
            type="submit"
            className="p-3 my-2 lg:my-0 w-1/5 lg:w-1/12 bg-pink-500 hover:bg-pink-600 text-zinc-100 font-bold cursor-pointer"
            value="SEARCH"
          />
        </form>

        {Object.keys(results).length !== 0 && (
          <div className="mx-auto max-w-max px-2 lg:px-5">
            <pre>
              <code>{results.text}</code>
            </pre>
          </div>
        )}

        {Object.keys(results).length !== 0 ? (
          <div className="text-center text-2xl mt-5 text-rose-500 cursor-pointer">
            <FontAwesomeIcon icon={faRemove} onClick={() => setResults({})} />
          </div>
        ) : (
          <div className="text-center text-5xl text-amber-500 cursor-pointer">
            {loading ? (
              <button className="btn loading">loading</button>
            ) : errorMsg.length > 0 ? (
              <p className="text-base text-rose-500">
                {errorMsg}
                <FontAwesomeIcon
                  icon={faSadCry}
                  className="ml-2 text-amber-500"
                />
              </p>
            ) : (
              <FontAwesomeIcon icon={faSmileBeam} />
            )}
          </div>
        )}
      </div>
      <div>
        <footer className="footer footer-center p-4  text-base-content">
          <div>
            <p>
              Developed & Designed by{" "}
              <span className="italic text-pink-500 font-semibold font-serif">
                Mehedi Hasan
              </span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
