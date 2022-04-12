import { getRoutines } from "../api";
import React, { useState, useEffect } from "react";

const Routines = ({ routineList, setRoutineList }) => {
  useEffect(() => {
    const routine = async () => {
      const allRoutines = await getRoutines();
      console.log(allRoutines)
    setRoutineList(allRoutines);
    }
    routine()
  }, []);

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
                {routine.activities.map((routineActivities)=>{
                  return( <div key={routineActivities.id}>
                <h6>{routineActivities.name}</h6>
                <h6>{routineActivities.description}</h6>
                <h6>{routineActivities.duration}</h6>
                <h6>{routineActivities.count}</h6>

                  </div>
)
                })}
                
              </div>
    
            )};
          })}
        </>
      ) : null}
    </div>
  );
};

export default Routines;
