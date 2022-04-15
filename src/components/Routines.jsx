import { postRoutines } from "../api";
import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useContent from "../hooks/useContent";

const Routines = () => {
  const { routineList, setRoutineList } = useContent();
  const { loggedIn, token } = useAuth();

  return (
    <div className='routines'>
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
