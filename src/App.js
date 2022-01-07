import { useState } from "react";
import ReactDOM from "react-dom";

export const Showcase = () => <div></div>;

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    const wiki = `https://en.wikipedia.org/w/api.php?action=query&
    list=search&prop=info&inprop=url&
    utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await fetch(wiki);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  };

  return (
    <div className="App">
      <header>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <h1>Wikipedia</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Learn something new?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {searchInfo.totalhits ? (
          <h4>Search Results: {searchInfo.totalhits}</h4>
        ) : (
          ""
        )}
      </header>

      <div className="results">
        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

          return (
            <div className="result" key={i}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="_blank" rel="noreferrer">
                <i class="fa fa-wikipedia-w"></i>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
