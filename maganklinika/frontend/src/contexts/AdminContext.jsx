import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/Axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [role, setRole] = useState([]);
  const [users, setUsers] = useState([]);
  const [navs, setNavs] = useState([]);
  const [navRoleInfo, setNavRoleInfo] = useState([]);
  const [filteredUsersList, setFilteredUsersList] = useState([]);

  const getUsers = async () => {
    const { data } = await myAxios.get("/api/users");
    setUsers(data);
    setFilteredUsersList(data);
  };

  const fetchNavRoleInfo = async () => {
    const navRoleData = await myAxios.get("/api/get-nav-items-with-roles");
    setNavRoleInfo(navRoleData.data);
  };

  const fetchAdminData = async () => {
    try {
      const roleData = await myAxios.get("/api/roles");
      setRole(roleData.data);

      const navsData = await myAxios.get("/api/navs");
      setNavs(navsData.data);

      getUsers();

      fetchNavRoleInfo();
    } catch (error) {
      console.error("Hiba az adatok lekérésekor:", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        fetchNavRoleInfo,
        role,
        navs,
        users,
        navRoleInfo,
        fetchAdminData,
        setNavRoleInfo,
        getUsers,
        setFilteredUsersList,
        filteredUsersList,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default function useAdminContext() {
  return useContext(AdminContext);
}
