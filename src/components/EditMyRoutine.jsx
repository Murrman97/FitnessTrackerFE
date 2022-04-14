import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useContent from "../hooks/useContent";
import { patchRoutines, getUserRoutines } from "../api";

const EditMyRoutine = () => {
  const locationState = useLocation();
  const { token, userRoutines, setUserRoutines, user } = useAuth();
  const { activitiesList } = useContent();
  const { routine } = locationState.state;
  const [name, setName] = useState();
  const [goal, setGoal] = useState();
  const [isPublic, setIsPublic] = useState(null);

  console.log(activitiesList, "XXXX");
  const handleName = (e) => {
    // setFormState({...formState, e.target.name: e.target.value})
    setName(e.target.value);
  };
  const handleGoal = (e) => {
    setGoal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatingRoutine = async () => {
      await patchRoutines(token, routine.id, name, goal, isPublic);
    };
    updatingRoutine();
    const getMyRoutines = async () => {
      const userRoutine = await getUserRoutines(user.username, token);
      setUserRoutines(userRoutine);
      console.log(userRoutines);
    };
    getMyRoutines();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          placeholder="name"
          onChange={handleName}
        ></input>

        <input
          value={goal}
          type="text"
          placeholder="goal"
          onChange={handleGoal}
        ></input>

        <select>
          {activitiesList
            ? activitiesList.map((activity) => {
                return <option id={activity.id} label={activity.name}></option>;
              })
            : null}
        </select>

        <button type="submit">Update Routine</button>
      </form>
    </div>
  );
};

export default EditMyRoutine;
