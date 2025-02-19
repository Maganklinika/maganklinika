import React, { useState } from "react";
import { myAxios } from "../../api/Axios";

const UsersTableRow = (props) => {
  const [role, setRole] = useState(props.role?.name);

  const handleChange = async (event) => {
    const newRole = event.target.value; // Az új szerepkör

    setRole(newRole); // Frissítjük a helyi állapotot
    console.log(role);
    await fetchUserRoleData(newRole); // Elküldjük az új szerepkört a backendnek
  };

  const fetchUserRoleData = async (newRole) => {
    const roleData = props.roles.find((r) => r.name === newRole);

    const roleId = roleData?.role_id;
    if (roleId) {
      try {
        // Frissítjük a felhasználó szerepkörét a backend-en
        const response = await myAxios.put(
          `/api/update-user-role/${props.e.user_id}`,
          {
            role_id: roleId, // Az új szerepkör id
          }
        );
        console.log("Role updated:", response.data);
      } catch (error) {
        console.error("Error updating role:", error);
      }
    }
  };

  return (
    <tr>
      <td>{props.e.user_name}</td>
      <td>
        <form>
          <select value={props.e.role_name} onChange={handleChange}>
            {props.roles.map((e, i) => (
              <option value={e.name} key={i}>
                {e.name}
              </option>
            ))}
          </select>
        </form>
      </td>
    </tr>
  );
};

export default UsersTableRow;
