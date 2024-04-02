"use Client";
import React, { useContext, createContext } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {};

export const useGlobaLContext = () => useContext(GlobalContext);
