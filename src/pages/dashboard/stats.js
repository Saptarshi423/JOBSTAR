import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/StatItem";
import {
  StatsContainer,
  Loading,
  ChartsContainer,
  StatItem
} from "../../components/index";
import { useSelector, useDispatch } from "react-redux";
import { showStats } from "../../features/allJobs/allJobsSlice";

function Stats() {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
}

export default Stats;
