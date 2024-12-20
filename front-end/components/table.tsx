import React from "react";
import { useRouter } from "next/router";
import userService from "@services/userService";

const Table: React.FC = () => {
  const router = useRouter();

  const data = [
    { username: "frans", password: "frans123", role: "user" },
    { username: "jan", password: "jan123", role: "user" },
    { username: "frits", password: "frits123", role: "guest" },
    { username: "admin", password: "admin123", role: "admin" },
  ];

  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await userService.checkUserExist(username, password); 
      if (user) {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("token", user.token);
        router.push("/my-recipes");
      } else {
        alert("Invalid username or password.");
      }
    } catch (error: any) {
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Username</th>
            <th className="border border-gray-400 px-4 py-2">Password</th>
            <th className="border border-gray-400 px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => handleLogin(row.username, row.password)}
              className="cursor-pointer hover:bg-gray-200"
            >
              <td className="border border-gray-400 px-4 py-2">{row.username}</td>
              <td className="border border-gray-400 px-4 py-2">{row.password}</td>
              <td className="border border-gray-400 px-4 py-2">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
