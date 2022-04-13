import ContentContext from "../ContentContext";
import { useState, useEffect } from "react";
import { getAllActivities } from "../api";
import useAuth from "../hooks/useAuth";

const ContentProvider = ({ children }) => {
  const [activitiesList, setActivitiesList] = useState();
  const [routineList, setRoutineList] = useState();
  const { token, setToken } = useAuth();

  return (
    <ContentContext.Provider
      value={{ routineList, setRoutineList, activitiesList, setActivitiesList }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
