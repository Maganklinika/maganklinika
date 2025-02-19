import React from "react";
import { Table } from "react-bootstrap";
import UsersTableRow from "../components/tables/UsersTableRow";
import useAdminContext from "../contexts/AdminContext";
import TextFilter from "../components/filters/text_filter_top/TextFilter";

const Felhasznalok = () => {
  const { users, role, filteredUsersList, setFilteredUsersList } =
    useAdminContext();

  return (
    <div>
      <TextFilter list={users} filterListSetter={setFilteredUsersList} />
      <Table className="user-table" striped bordered hover>
        <thead>
          <tr>
            <th>Felhasználók</th>
            <th>Jogosultság</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsersList ? (
            filteredUsersList.map((e, i) => {
              const userRole = role.find((r) => r.name === e.role_name);
              return (
                <UsersTableRow role={userRole} e={e} key={i} roles={role} />
              );
            })
          ) : (
            <tr>
              <td>loading</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Felhasznalok;
