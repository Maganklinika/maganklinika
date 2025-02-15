import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/Axios";
import useAuthContext from "./AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ( { children } ) => {
  const { user, fetchNavigation, fetchEmailStatus, isVerified } =
    useAuthContext();
  const navigate = useNavigate();

  const [ role, setRole ] = useState( [] );
  const [ users, setUsers ] = useState( [] );
  const [ navs, setNavs ] = useState( [] );
  const [ navRoleInfo, setNavRoleInfo ] = useState( [] );

  const getUsers = async () => {
    const { data } = await myAxios.get( "/api/users" );
    console.log( data );
    setUsers( data );
  };

  const fetchNavRoleInfo = async () => {
    const navRoleData = await myAxios.get( "/api/get-nav-items-with-roles" );
    setNavRoleInfo( navRoleData.data );
  };

  const fetchAdminData = async () => {
    try {
      const roleData = await myAxios.get( "/api/roles" );
      setRole( roleData.data );

      const navsData = await myAxios.get( "/api/navs" );
      setNavs( navsData.data );

      getUsers();

      fetchNavRoleInfo();
    } catch ( error ) {
      console.error( "Hiba az adatok lekérésekor:", error );
    }
  };

  useEffect( () => {
    const verify = async () => {
      await fetchEmailStatus();
    };
    if ( user ) {
      verify();
    }
    if ( user && user.role_id === 1 && isVerified ) {
      fetchAdminData();
      fetchNavigation();
    } else if ( user && !isVerified ) {
      navigate( "/verify-email" );
    } else {
      fetchNavigation();
    }
  }, [ user, isVerified ] ); // Csak akkor fut le, ha a user változik

  return (
    <AdminContext.Provider
      value={{
        fetchNavRoleInfo,
        role,
        navs,
        users,
        navRoleInfo,
        setNavRoleInfo,
        getUsers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default function useAdminContext() {
  return useContext( AdminContext );
}
