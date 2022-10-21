import { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "./api";

const Search = ({ onSearchChange }) => {
const [search, setSearch] = useState("Search");
const loadOptions = async (inputValue) => {
    return await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData.label);
    onSearchChange(searchData.label);
  };

  useEffect(() => {
    console.log("city-name ", search);
  }, [search]);

  return (
    <AsyncPaginate
      className="searchbar"
      placeholder={search}
      debounceTimeout={600}
      value={search}
      onMenuOpen={() => setSearch("")}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
