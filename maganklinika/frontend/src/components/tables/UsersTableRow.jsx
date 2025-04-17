import React, { useState } from "react";
import { myAxios } from "../../api/Axios";

const UsersTableRow = (props) => {
  const [role, setRole] = useState(props.role?.name);

  const handleChange = async (event) => {
    const newRole = event.target.value;

    setRole(newRole);
    await fetchUserRoleData(newRole);
  };

  const fetchUserRoleData = async (newRole) => {
    const roleData = props.roles.find((r) => r.name === newRole);

    const roleId = roleData?.role_id;
    if (roleId) {
      try {
        const response = await myAxios.put(
          `/api/update-user-role/${props.e.user_id}`,
          {
            role_id: roleId,
          }
        );
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
            {props.roles.map((e, i) =>
              props.e.role_name === e.name || e.name === "guest" ? (
                <option value={e.name} key={i}>
                  {e.name}
                </option>
              ) : (
                ""
              )
            )}
          </select>
        </form>
      </td>
    </tr>
  );
};

export default UsersTableRow;
