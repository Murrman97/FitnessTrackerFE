import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Activities,
  Register,
  Login,
  Routines,
  Navbar,
  MyRoutines,
  EditMyRoutine,
} from "./components";

function App() {
  return (
    <div>
      <div id="app-control">
        <Navbar />
        <h1>Fitness Tracker</h1>
      </div>
      <Routes>
        <Route path="/activities" element={<Activities />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/myRoutines" element={<MyRoutines />} />
        <Route path="/editRoutine" element={<EditMyRoutine />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Activities />} />
      </Routes>
    </div>
  );
}

export default App;
