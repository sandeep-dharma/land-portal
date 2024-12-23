import React, { useState, useEffect } from "react";
import Curosal from "./components/curosal/curosal";
import "./App.scss";

const App = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await fetch(
          `https://prod-be.1acre.in/lands/?division=24&page_size=10&page=${page}&ordering=-updated_at`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! : ${response.status}`);
        }

        const result = await response.json();
        setDataCount(result.count);
        setData((prevData) => [...prevData, ...result.results]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="body-container">
      <div className="header">
        <h2 className="header-content">
          {dataCount} lands
          <span>
            <i className="bi bi-arrow-down-right"></i>
          </span>
        </h2>
        <h2 className="header-content dropdown">
          Upload Date (Latest)
          <span>
            <i className="bi bi-arrow-down-short"></i>{" "}
          </span>
        </h2>
      </div>

      <div className="row">
        {data?.map((item, index) => (
          <div
            key={index}
            className="col col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3 mb-4"
          >
            <Curosal landDetails={item} />
          </div>
        ))}
      </div>
      {loading && (
        <div className="spinner-container">
          <div className="spinner-border text-warning" role="status"></div>
          <span className="loading-text">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default App;