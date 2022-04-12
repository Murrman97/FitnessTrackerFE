import { getRoutines } from "../api";
import React, { useState, useEffect } from "react";

const Routines = ({ routineList, setRoutineList }) => {
  useEffect(() => {
    const routine = async () => console.log(await getRoutines());
    setRoutineList(routine);
  }, []);

  return (
    <div className='routines'>
      {routineList ? (
        <>
          {routineList.map((routine) => {
            return (
              <div key={routine.id}>
                <h2>{routine.creatorName}</h2>
                <h2>{routine.creatorId}</h2>
                <h4>{routine.goal}</h4>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default Routines;
