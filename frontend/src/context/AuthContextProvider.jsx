import React, { createContext, useReducer, useState } from "react";
export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")),
  );
  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const value = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
