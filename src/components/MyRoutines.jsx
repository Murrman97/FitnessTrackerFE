import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useContent from "../hooks/useContent";
import { getUserRoutines, postRoutines,getRoutines } from "../api";

const MyRoutines = () => {
  const { routineList, setRoutineList } = useContent()
  const {loggedIn, token, user } = useAuth()
  
  const [name, setName] = useState();
  const [goal, setGoal] = useState();
  const [isPublic, setIsPublic] = useState(true);
  const [userRoutines, setUserRoutines] = useState([])

useEffect(()=>{const getMyRoutines = async () => {
    const allRoutines = await getRoutines();
      setRoutineList(allRoutines);
    const userRoutines = await getUserRoutines(user.username, token)
    console.log("USERROUTINES", userRoutines)
    setUserRoutines(userRoutines)
}
getMyRoutines()}, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const anon = async () => {
      const response = await postRoutines(name, goal, isPublic, token);
      setRoutineList([...routineList, response]);
    };
    anon();
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleGoal = (e) => {
    e.preventDefault();
    setGoal(e.target.value);
  };
  return (
    <div>
      {loggedIn ? (
        <form onSubmit={handleSubmit}>
          <h4>Create A Routine</h4>
          <input
            value={name}
            type="text"
            placeholder="Routine Name"
            onChange={handleName}
          ></input>
          <input
            value={goal}
            type="text"
            placeholder="Routine Goal"
            onChange={handleGoal}
          ></input>
          <button type="submit">Create</button>
        </form>
      ) : null}
     {userRoutines ? (
        <>
          {userRoutines.map((routine) => {
            if (routine.isPublic) {
              return (
                <div key={routine.id}>
                  <h2>{routine.name}</h2>
                  <h4>{routine.goal}</h4>
                  <h4>{routine.creatorName}</h4>
                  {routine.activities
                    ? routine.activities.map((routineActivities) => {
                        return (
                          <div key={routineActivities.id}>
                            <h6>{routineActivities.name}</h6>
                            <h6>{routineActivities.description}</h6>
                            <h6>{routineActivities.duration}</h6>
                            <h6>{routineActivities.count}</h6>
                          </div>
                        );
                      })
                    : null}
                </div>
              );
            }
          })}
        </>
      ) : null}
    </div>
  );
};

export default MyRoutines;
