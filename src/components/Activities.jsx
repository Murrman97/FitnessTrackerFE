import React, { useState, useEffect } from "react";
import {
  getAllActivities,
  postActivities,
  patchActivities,
  getActivitiesByRoutines,
} from "../api";

const Activities = ({ activitiesList, setActivitiesList }) => {
  useEffect(() => {
    const allActivities = async () => {
      const results = await getAllActivities();
      console.log(results);
      setActivitiesList(results);
    };
    allActivities();
  }, []);
  return (
    <div>
      {activitiesList ? (
        <>
          {activitiesList.map((activity) => {
            return (
              <div key={activity.id}>
                <h2>{activity.name}</h2>
                <h4>{activity.description}</h4>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default Activities;
