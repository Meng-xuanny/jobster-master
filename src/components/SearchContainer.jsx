import React, { useState, useMemo, useEffect } from "react";
import { FormRow, FormRowSelect } from ".";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../wrappers/SearchContainer";
import { clearFilters, handleChange } from "../features/allJobs/allJobsSlice";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");

  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  // const debounce = () => {
  //   let timeoutId;
  //     console.log("debounce");
  //   return (e) => {
  //     setLocalSearch(e.target.value);
  //     clearTimeout(timeoutId);
  //     setTimeout(() => {
  //       dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  //     }, 1000);
  //   };
  // };

  useEffect(() => {
    const debounceId = setTimeout(() => {
      console.log("debounce");
      dispatch(handleChange({ name: "search", value: localSearch }));
    }, 1000);
    return () => clearTimeout(debounceId);
  }, [localSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  };

  //const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            name="search"
            value={localSearch}
            type="text"
            handleChange={(e) => setLocalSearch(e.target.value)}
          />
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
