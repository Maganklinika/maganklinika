import React from "react";
const TableRow = ( props ) => {
  return (
    <tr
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
    >
      <td style={{ backgroundColor: "#eed199" }}>{props.e.nav_name}</td>
    </tr >
  );
};

export default TableRow;
