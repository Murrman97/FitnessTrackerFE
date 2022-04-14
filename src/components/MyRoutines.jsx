import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useContent from "../hooks/useContent";
import {
  getUserRoutines,
  postRoutines,
  getRoutines,
  deleteRoutines,
} from "../api";
import { Link } from "react-router-dom";

const MyRoutines = () => {
  const { routineList, setRoutineList } = useContent();
  const { loggedIn, token, user, userRoutines, setUserRoutines } = useAuth();
  const [name, setName] = useState();
  const [goal, setGoal] = useState();
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    // const getMyRoutines = async () => {
    //   const userRoutine = await getUserRoutines(user.username, token);
    //   console.log("USERROUTINES", userRoutines);
    //   setUserRoutines(userRoutine);
    // };
    // getMyRoutines();
  }, [userRoutines]);

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
  const deletingRoutine = async (e) => {
    e.preventDefault();
    const result = await deleteRoutines(
      localStorage.getItem("token"),
      e.target.value
    );
    // Array.prototype.reject = function(fn){return this.filter(x => !fn(x))}
    const results = userRoutines.filter((result) => {
      console.log(typeof result.id, "resultID");
      console.log(e.target.value, "Value");
      return result.id != e.target.value;
    });
    console.log(results);
    setUserRoutines(results);
  };
  console.log(userRoutines, "USER ROUTINES");
  return (
    <div>
      {loggedIn ? (
        <form onSubmit={handleSubmit}>
          <h4>Create A Routine</h4>
          <input
            value={name}
            type='text'
            placeholder='Routine Name'
            onChange={handleName}
          ></input>
          <input
            value={goal}
            type='text'
            placeholder='Routine Goal'
            onChange={handleGoal}
          ></input>
          <button type='submit'>Create</button>
        </form>
      ) : null}
      {!userRoutines ? null : (
        <>
          {userRoutines.map((routine) => {
            if (routine.isPublic) {
              return (
                <div key={routine.id}>
                  <h2>{routine.name}</h2>
                  <h4>{routine.goal}</h4>
                  <Link
                    to={{
                      pathname: "/editRoutine",
                      state: { routine: routine },
                    }}
                  >
                    <button value={routine.id} type='submit'>
                      Edit Post
                    </button>
                  </Link>
                  <button
                    value={routine.id}
                    type='submit'
                    onClick={deletingRoutine}
                  >
                    Delete Post
                  </button>
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
      )}
    </div>
  );
};

export default MyRoutines;
