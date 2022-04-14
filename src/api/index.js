// You can choose to import all your functions, and re-export them here
const BASEURL = "https://fitnesstrac-kr.herokuapp.com/api";

const postRegisterUser = async (username, password) => {
  try {
    const result = await fetch(`${BASEURL}/users/register`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await result.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const postLoginUser = async (username, password) => {
  const result = await fetch(`${BASEURL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await result.json();
  return data;
};

const getUserRoutines = async (username, token) => {
  const result = await fetch(`${BASEURL}/users/${username}/routines`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  return data;
};

const getUserProfile = async (token) => {
  const result = await fetch(`${BASEURL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  return data;
};

const getAllActivities = async () => {
  const result = await fetch(`${BASEURL}/activities`);

  const data = await result.json();
  return data;
};

const postActivities = async (name, description, token) => {
  const result = await fetch(`${BASEURL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const data = await result.json();
  return data;
};

const patchActivities = async () => {};

const getActivitiesByRoutines = async () => {};

const getRoutines = async () => {
  const result = await fetch(`${BASEURL}/routines`);

  const data = await result.json();
  return data;
};

const postRoutines = async (name, goal, isPublic, token) => {
  const result = await fetch(`${BASEURL}/routines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  });
  const data = await result.json();
  console.log(result);
  return data;
};

const patchRoutines = async (token, routineId, name, goal, isPublic) => {
  const result = await fetch(`${BASEURL}/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  });
  const data = await result.json();
  console.log(result);
  return data;
};


const deleteRoutines = async (token, routineId) => {
  const result = await fetch(`${BASEURL}/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  return data;
};

const postAttachActivitytoRoutine = async (
  routineId,
  activityId,
  count,
  duration
) => {
  const result = await fetch(`${BASEURL}/routines/${routineId}/activities`, {
    method: "POST",
    body: JSON.stringify({
      activityId,
      count,
      duration,
    }),
  });
  const data = await result.json()
  return data
};

const patchRoutineActivity = async () => {};

const deleteRoutineActivity = async () => {};

export {
  getAllActivities,
  postActivities,
  patchActivities,
  getActivitiesByRoutines,
  postRegisterUser,
  postLoginUser,
  getRoutines,
  postRoutines,
  getUserProfile,
  getUserRoutines,
  deleteRoutines,
  postAttachActivitytoRoutine,
  patchRoutines
};
