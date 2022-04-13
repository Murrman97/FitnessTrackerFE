import { getRoutines, postRoutines } from "../api";
import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useContent from "../hooks/useContent";

const Routines = ({}) => {
  const { routineList, setRoutineList } = useContent();
  const { loggedIn, token } = useAuth();
  const [name, setName] = useState();
  const [goal, setGoal] = useState();
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    const routine = async () => {
      const allRoutines = await getRoutines();
      console.log(allRoutines);
      setRoutineList(allRoutines);
    };
    routine();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const anon = async () => {
      console.log(token);
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
    <div className='routines'>
      {loggedIn ? (
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            type='text'
            placeholder='name'
            onChange={handleName}
          ></input>
          <input
            value={goal}
            type='text'
            placeholder='goal'
            onChange={handleGoal}
          ></input>
          <button type='submit'>Create</button>
        </form>
      ) : null}
      {routineList ? (
        <>
          {routineList.map((routine) => {
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

export default Routines;
