import React, { useState, createContext } from "react";

export const ComponentContext = createContext();

export const ComponentProvider = props => {
  const iniateUser = {
    token: ""
  }
  const [user, setUser] = useState(iniateUser);

  return (
    <ComponentContext.Provider value={{user,setUser}}>
      {props.children}
    </ComponentContext.Provider>
  );
};