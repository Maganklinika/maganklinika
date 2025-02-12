import React, { useState } from "react";
import { myAxios } from "../../api/Axios";

const UsersTableRow = (props) => {
  const [role, setRole] = useState(props.e.role_name);

  const handleChange = async (event) => {
    const newRole = event.target.value; // Az új szerepkör közvetlenül az event-ből
    setRole(newRole); // Az állapotot frissítjük
    await fetchUserRoleData(newRole); // A fetchUserRoleData hívása az új role-al
  };

  const fetchUserRoleData = async (newRole) => {
    let id;
    props.role.forEach((e) => {
      if (newRole === e.name) {
        id = e.role_id;
      }
    });

    if (id) {
      const response = await myAxios.put(
        `/api/update-user-role/${props.e.user_id}`,
        {
          role_id: id,
        }
      );
      console.log(id)
      // További logikát is adhatsz a válasz kezelésére, pl. sikeres frissítés esetén
      console.log(response.data);
    }
  };

  return (
    <tr>
      <td>{props.e.user_name}</td>
      <td>
        <form>
          <select value={role} onChange={handleChange}>
            {props.role.map((e, i) => (
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
