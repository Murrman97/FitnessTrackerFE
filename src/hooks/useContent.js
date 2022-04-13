import { useContext } from "react";
import ContentContext from "../ContentContext";

// const context = useContext(ContentContext)

const useContent = () => {
  const {
    title,
    description,
    activitiesList,
    setActivitiesList,
    routineList,
    setRoutineList,
  } = useContext(ContentContext);

  return {
    title,
    description,
    activitiesList,
    setActivitiesList,
    routineList,
    setRoutineList,
  };
};

export default useContent;
