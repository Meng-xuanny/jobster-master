import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../wrappers/JobsContainer";
import Job from "./Job";
import Loading from "./Loading";
import { getJobs } from "../features/allJobs/allJobsSlice";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [search, searchStatus, searchType, sort, page]);

  if (isLoading)
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );

  if (jobs.length === 0)
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );
  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 ? "s" : ""} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
