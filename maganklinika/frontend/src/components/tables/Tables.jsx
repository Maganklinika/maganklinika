import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TableRow from "./TableRow";
import "./roletables.css";

const Tables = (props) => {
  const [items, setItems] = useState(props.lista);

  useEffect(() => {
    setItems(props.lista); 
  }, [props.lista]);

  return (
    <Droppable droppableId={props.nev}>
      {(provided) => (
        <Table
          className="table"
          striped
          bordered
          hover
          {...provided.droppableProps} 
          ref={provided.innerRef} 
        >
          <thead>
            <tr>
              <th>{props.nev}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e, i) => {
              if (props.nev === e.role_name) {
                return (
                  <Draggable key={e.navRole_id} draggableId={String(e.navRole_id)} index={i} >
                    {(provided) => (
                      <>
                        <TableRow provided={provided} e={e} />
                      </>
                    )}
                  </Draggable>
                );
              }
            })}
            {provided.placeholder}
          </tbody>
        </Table>
      )}
    </Droppable>
  );
};

export default Tables;
