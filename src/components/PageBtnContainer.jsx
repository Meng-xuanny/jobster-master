import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { changePages } from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
  const { page, numOfPages } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    // let newPage = (page + 1) % numOfPages;
    if (newPage > numOfPages) newPage = 1;

    dispatch(changePages(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    //let newPage = (page - 1 + numOfPages) % numOfPages;
    if (newPage < 1) newPage = numOfPages;
    dispatch(changePages(newPage));
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            className={pageNum === page ? "pageBtn active" : "pageBtn"}
            type="button"
            onClick={() => dispatch(changePages(pageNum))}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
