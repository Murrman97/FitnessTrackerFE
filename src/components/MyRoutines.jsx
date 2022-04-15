import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useContent from "../hooks/useContent";
import {
  getUserRoutines,
  postRoutines,
  getRoutines,
  deleteRoutines,
  patchRoutineActivity,
  deleteRoutineActivity,
} from "../api";
import { Link } from "react-router-dom";

const MyRoutines = () => {
  const { routineList, setRoutineList } = useContent();
  const { loggedIn, token, user, userRoutines, setUserRoutines } = useAuth();
  const [name, setName] = useState(null);
  const [goal, setGoal] = useState(null);
  const [isPublic, setIsPublic] = useState(null);
  const [activityEdit, setActivityEdit] = useState(null);
  const [count, setCount] = useState(null);
  const [duration, setDuration] = useState(null);
  const [userActivities, setUserActivities] = useState()
  useEffect(() => {}, [userRoutines, activityEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const anon = async () => {
      const response = await postRoutines(name, goal, isPublic, token);
      setRoutineList([...routineList, response]);
    };
    anon();
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleGoal = (e) => {
    setGoal(e.target.value);
  };
  const deletingRoutine = async (e) => {
    e.preventDefault();
    const result = await deleteRoutines(
      localStorage.getItem("token"),
      e.target.value
    );
    const results = userRoutines.filter((result) => {
      return result.id !== +e.target.value;
    });
    console.log(results);
    setUserRoutines(results);
  };
  const toggleEditActivityForm = (routineActivities, activities) => {
    
    setActivityEdit(routineActivities.routineActivityId);
    setCount(routineActivities.count);
    setDuration(routineActivities.duration);
    setUserActivities(activities)
  };

  const handleSubmitActivity = async (e) => {
    e.preventDefault();
    console.log("123");
    const result = await patchRoutineActivity(
      activityEdit,
      token,
      count,
      duration
    );
    console.log(result, "THIS IS SUBMITACTIVITY");
    setActivityEdit(null);
    const anotherResult = await getUserRoutines(user.username, token);
    setUserRoutines(anotherResult);
  };

  const handleActivityCount = (e) => {
    setCount(e.target.value);
  };

  const handleActivityDuration = (e) => {
    setDuration(e.target.value);
  };

  const deletingRoutineActivity = async (e) => {
    const result = await deleteRoutineActivity(activityEdit, token);

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
      {!userRoutines ? null : (
        <>
          {userRoutines.map((routine) => {
            return (
              <div key={routine.id}>
                <h2>{routine.name}</h2>
                <h4>{routine.goal}</h4>

                <Link to={"/editRoutine"} state={{ routine: routine }}>
                  <button value={routine.id} type="submit">
                    Edit Post
                  </button>
                </Link>
                <button
                  value={routine.id}
                  type="submit"
                  onClick={deletingRoutine}
                >
                  Delete Post
                </button>
                {routine.activities
                  ? routine.activities.map((routineActivities) => {
                      return routineActivities.routineActivityId !==
                        activityEdit ? (
                        <div key={routineActivities.id}>
                          <h6>name:{routineActivities.name}</h6>
                          <h6>description:{routineActivities.description}</h6>
                          <h6>duration:{routineActivities.duration}</h6>
                          <h6>count:{routineActivities.count}</h6>
                          <button
                            value={routineActivities.id}
                            type="submit"
                            onClick={() =>
                              toggleEditActivityForm(routineActivities, routine.activities)
                            }
                          >
                            Edit Activity
                          </button>
                        </div>
                      ) : (
                        <>
                          <form onSubmit={handleSubmitActivity}>
                            <h4>{routineActivities.name}</h4>
                            <input
                              value={count}
                              type="text"
                              placeholder="Activity Count"
                              onChange={handleActivityCount}
                            ></input>
                            <input
                              value={duration}
                              type="text"
                              placeholder="Activity Duration"
                              onChange={handleActivityDuration}
                            ></input>
                            <button type="submit">Update</button>
                          </form>
                          <button
                            value={routineActivities.id}
                            type="submit"
                            onClick={deletingRoutineActivity}
                          >
                            Delete Activity
                          </button>
                        </>
                      );
                    })
                  : null}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MyRoutines;
