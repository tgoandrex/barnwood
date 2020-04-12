import { createContext, useContext } from "react";

export const UserNameContext = createContext();
export const IDContext = createContext();
export const AdminContext = createContext();

export function useUserName() {
  return useContext(UserNameContext);
}

export function useID() {
  return useContext(IDContext);
}

export function useAdmin() {
  return useContext(AdminContext);
}