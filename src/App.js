import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Activities, Register, Login, Routines, Navbar, MyRoutines } from "./components";

function App() {
  const [activitiesList, setActivitiesList] = useState();
  const [routineList, setRoutineList] = useState();

  return (
    <div>
    <div id="app-control">
        <Navbar />
        <h1>Fitness Tracker</h1>


      </div>
    <Routes>
      <Route
        path="/activities"
        element={
          <Activities
            activitiesList={activitiesList}
            setActivitiesList={setActivitiesList}
          />
        }
      />
      <Route
        path="/routines"
        element={
          <Routines routineList={routineList} setRoutineList={setRoutineList} />
        }
      />
      <Route path="/My-Routines" element={<MyRoutines />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Activities />} />
    </Routes>
    </div>
  );
}

export default App;
