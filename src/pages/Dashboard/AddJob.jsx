import React, { useEffect } from "react";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearValues,
  createJobs,
  handleFieldChange,
  editJob,
} from "../../features/job/jobSlice";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);
  //console.log(user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields!");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, status, jobType },
        })
      );
      return;
    }
    dispatch(createJobs({ position, company, jobLocation, status, jobType }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleFieldChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing)
      dispatch(
        handleFieldChange({ name: "jobLocation", value: user.location })
      );
  }, []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "edit job" : "add job"}</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleChange}
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleChange}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleChange}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
