import React, { useState, useEffect } from "react";
import {
  getAllActivities,
  postActivities,
  patchActivities,
  getActivitiesByRoutines,
} from "../api";
import useAuth from "../hooks/useAuth";
import useContent from "../hooks/useContent";

const Activities = () => {
  const { activitiesList, setActivitiesList } = useContent();
  const { loggedIn, token } = useAuth();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const allActivities = async () => {
      const results = await getAllActivities();;
      setActivitiesList(results);
    };
    allActivities();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const anon = async () => {
      const response = await postActivities(title, description, token);
      setActivitiesList([...activitiesList, response]);
    };
    anon();
  };

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  return (
    <div>
      {loggedIn ? (
        <form onSubmit={handleSubmit}>
          <h4>Create An Activity</h4>
          <input
            value={title}
            type='text'
            placeholder='Activity Name'
            onChange={handleTitle}
          ></input>
          <input
            value={description}
            type='text'
            placeholder='Activity Description'
            onChange={handleDescription}
          ></input>
          <button type='submit'>Create</button>
        </form>
      ) : null}
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
