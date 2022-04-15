import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useContent from "../hooks/useContent";
import { patchRoutines, getUserRoutines, postAttachActivitytoRoutine } from "../api";

const EditMyRoutine = () => {
  const locationState = useLocation();
  const { token, userRoutines, setUserRoutines, user } = useAuth();
  const { activitiesList } = useContent();
  const { routine } = locationState.state;
  const [name, setName] = useState(routine.name);
  const [goal, setGoal] = useState(routine.goal);
  const [isPublic, setIsPublic] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [count, setCount] = useState(null)
  const [duration, setDuration] = useState(null)

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
      console.log(routine.id, +selectedActivity, +count, +duration)
      await postAttachActivitytoRoutine(routine.id.toString(), selectedActivity, count, duration)
    };
    updatingRoutine();
    const getMyRoutines = async () => {
      const userRoutine = await getUserRoutines(user.username, token);
      setUserRoutines(userRoutine);
      console.log(userRoutines);
    };
    getMyRoutines();
  };

  const handleSelect=(e) => {

      setSelectedActivity(e.target.value)
    
  }
  console.log(selectedActivity)
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

        <select onChange={handleSelect}>
          {activitiesList
            ? activitiesList.map((activity) => {
                return <option value={activity.id} id={activity.id} label={activity.name}></option>;
              })
            : null}
        </select>
        <input
          value={count}
          type="text"
          placeholder="count"
          onChange={(e)=>{setCount(e.target.value)}}
        ></input>

        <input
          value={duration}
          type="text"
          placeholder="duration"
          onChange={(e)=>{setDuration(e.target.value)}}
        ></input>

        <button type="submit">Update Routine</button>
      </form>
    </div>
  );
};

export default EditMyRoutine;
