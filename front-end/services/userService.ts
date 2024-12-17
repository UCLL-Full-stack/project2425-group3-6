import { User } from "@types";

const getToken = () => sessionStorage.getItem("token");

const getAllUsers = async () => {
  const token = getToken();
  const response = await fetch(`http://localhost:3000/users`, {
    headers: {
        "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
      throw new Error(`Failed to fetch lecturer. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const getUserById = async (id :string) => {
  const token = getToken();
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    headers: {
        "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) {
      throw new Error('Failed to fetch lecturer');
  }
  return await response.json();
};

const addUser = async (user : User) => {
  return await fetch(`http://localhost:3000/users/signup`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  });
};

const checkUserExist = async (username: string, password: string) => {
  const response = await fetch(`http://localhost:3000/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }

  return await response.json();
};



const LecturerService = {
  getAllUsers,
  getUserById,
  addUser,
  checkUserExist
};

export default LecturerService;
