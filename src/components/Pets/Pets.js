import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import "./Pets.css";

const Pets = () => {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [filters, setFilters] = useState({
    gender: "any",
    favourite: "any",
  });

  const fetchCats = async () => {
    const response = await axios.get("http://localhost:4000/cats");
    setCats(response.data);
    setFilteredCats(response.data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    let catsFiltered = [...cats];
    if (filters.gender !== "any") {
      catsFiltered = catsFiltered.filter(
        (cat) => cat.gender === filters.gender
      );
    }

    if (filters.favourite !== "any") {
      catsFiltered =
        filters.favourite === "favourite"
          ? catsFiltered.filter((cat) => cat.favoured)
          : catsFiltered.filter((cat) => !cat.favoured);
    }

    setFilteredCats(catsFiltered);
  }, [filters, cats]);

  const handleFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="app-container">
        <Filter filters={filters} onFilterChange={handleFilters} />
        <Cards cats={filteredCats} setCats={setCats} />
      </div>
    </div>
  );
};

export default Pets;
