import React, { useState, useEffect } from "react";
import Tables from "../tables/Tables";
import { Table } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { myAxios } from "../../api/Axios";
import useAdminContext from "../../contexts/AdminContext";
import "./navElemek.css"

const NavElemek = () => {
  const { role, navRoleInfo, navs, fetchNavRoleInfo } = useAdminContext();
  const [ globalItems, setGlobalItems ] = useState( {} );

  useEffect( () => {
    const itemsByRole = role.reduce( ( acc, e ) => {
      const filteredNavItems = navRoleInfo.filter(
        ( item ) => item.role_name === e.name
      );
      acc[ e.name ] = filteredNavItems;

      return acc;
    }, {} );
    setGlobalItems( ( prevItems ) => ( {
      ...prevItems,
      ...itemsByRole,
    } ) );
  }, [ role, navRoleInfo ] );

  // Menüpontok hozzáadása vagy eltávolítása a szerepkörökhöz
  const handleMoveMenuItem = async ( menuItem, roleName, isAdding, id ) => {
    const updatedMenuItem = { ...menuItem, nav_id: menuItem.id };

    try {
      // Ha hozzáadjuk a menüpontot a szerepkörhöz
      if ( isAdding ) {
        const checkResponse = await myAxios.post(
          "/api/check-nav-assigned-to-role",
          {
            navigation_id: updatedMenuItem.navigation_id,
            name: roleName,
          }
        );

        // Ha már létezik a menüpont, ne csináljunk semmit
        if ( checkResponse.data.exists ) return;

        // Hozzáadjuk a menüpontot a szerepkörhöz
        await myAxios.post( "/api/add-nav-to-role", {
          navigation_id: updatedMenuItem.navigation_id,
          name: roleName,
        } );
      } else {
        try {
          const response = await myAxios.delete(
            `/api/remove-nav-from-role/${ id }`
          );
        } catch ( error ) {
        }
      }

      // UI frissítése
      setGlobalItems( ( prevItems ) => {
        const updatedGlobalItems = { ...prevItems };
        const roleItems = updatedGlobalItems[ roleName ] || [];

        if ( isAdding ) {
          roleItems.push( updatedMenuItem ); // Hozzáadjuk a menüpontot
        } else {
          const index = roleItems.findIndex(
            ( item ) => item.id === updatedMenuItem.id
          );
          if ( index > -1 ) roleItems.splice( index, 1 ); // Eltávolítjuk a menüpontot
        }

        updatedGlobalItems[ roleName ] = roleItems;
        return updatedGlobalItems;
      } );
      await fetchNavRoleInfo();
    } catch ( error ) {
      console.error( "Error handling menu item:", error );
    }
  };

  // Drag-and-drop eseménykezelő
  const onDragEnd = async ( result ) => {
    const { destination, source } = result;

    // Ha nincs érvényes célpont, nem csinálunk semmit
    if ( !destination ) return;

    const sourceRoleName = source.droppableId; // A forrás szerepkör (droppableId)
    const destinationRoleName = destination.droppableId; // A cél szerepkör (droppableId)

    const menuItem = navs[ source.index ]; // A menüpont, amit áthúztak
    if ( !menuItem ) return;

    // Ha a destination a "menuList", akkor azt jelenti, hogy vissza akarjuk helyezni a menüt a "menuList"-be
    if ( destinationRoleName === "menuList" ) {
      handleMoveMenuItem( menuItem, sourceRoleName, false, result.draggableId ); // Eltávolítjuk a szerepkörhöz tartozó táblázatból
    } else if ( sourceRoleName === "menuList" ) {
      // Ha a source a "menuList", akkor hozzáadjuk a menüt a megfelelő szerepkörhöz
      handleMoveMenuItem( menuItem, destinationRoleName, true ); // Hozzáadjuk a megfelelő szerepkörhöz
    } else if (
      !globalItems[ sourceRoleName ] ||
      !globalItems[ destinationRoleName ]
    ) {
      // Ellenőrizzük, hogy léteznek-e a megfelelő szerepkörök a globalItems-ben
      console.error(
        `Invalid droppableId: ${ sourceRoleName } or ${ destinationRoleName }`
      );
      return;
    } else {
      // Átrendezzük a menüpontokat az új sorrend szerint
      const reorderedItems = Array.from( globalItems[ sourceRoleName ] || [] );
      const [ removed ] = reorderedItems.splice( source.index, 1 ); // Eltávolítjuk a menüpontot
      reorderedItems.splice( destination.index, 0, removed ); // Beszúrjuk az új helyre

      // Az új sorrend frissítése a frontenden
      setGlobalItems( ( prevItems ) => {
        const updatedGlobalItems = { ...prevItems };
        updatedGlobalItems[ sourceRoleName ] = reorderedItems;
        return updatedGlobalItems;
      } );

      // Az új sorrend elküldése a backend felé
      try {
        const updatedMenuItems = reorderedItems.map( ( item, index ) => ( {
          id: item.navRole_id, // Az id kulcsot megtartjuk
          ranking: index + 1, // A rankingot az index alapján frissítjük (1-től kezdődik)
        } ) );

        const response = await myAxios.put( "/api/update-nav", {
          role_name: sourceRoleName,
          items: updatedMenuItems, // Az új sorrend ID és ranking kulcsokkal
        } );
      } catch ( error ) {
        console.error( "Hiba a sorrend frissítése közben:", error );
      }
    }
  };

  return (
    <div className="menu-management">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="all-role-table">
          <h3>Jogkörökhöz rendelt menüpontok</h3>
          <div className="role-tables">
            {role.map( ( e ) => (
              <Droppable droppableId={e.name} key={e.role_id}>
                {( provided ) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Tables
                      nev={e.name}
                      lista={globalItems[ e.name ] || []}
                      key={e.role_id}
                      
                      onUpdateNavOrder={( roleName, updatedItems ) => {
                        setGlobalItems( ( prevItems ) => {
                          const updatedGlobalItems = { ...prevItems };
                          updatedGlobalItems[ roleName ] = updatedItems;
                          return updatedGlobalItems;
                        } );
                      }}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ) )}
          </div>
        </div>
        <div className="arrow-description">
          <div className="arrow-container">
            <svg viewBox="0 0 600 100" className="arrow-svg">
              {/* Nyíl szára */}
              <line x1="10" y1="50" x2="500" y2="50" stroke="black" strokeWidth="4" />

              {/* Nyílhegy */}
              <polygon points="520,50 500,40 500,60" fill="black" />

              {/* Szöveg a nyíl szárán */}
              <text x="175" y="30" fontSize="28" fontWeight="bold" fill="black">
                Menü törlése
              </text>
            </svg>
            <svg viewBox="0 0 600 100" className="arrow-svg">
              {/* Nyíl szára */}
              <line x1="500" y1="50" x2="20" y2="50" stroke="black" strokeWidth="4" />

              {/* Nyílhegy */}
              <polygon points="0,50 20,40 20,60" fill="black" />

              {/* Szöveg a nyíl szárán */}
              <text x="150" y="30" fontSize="28" fontWeight="bold" fill="black">
                Menü hozzáadása
              </text>
            </svg>

          </div>
        </div>
        <div className="menu-management-nav-list">
          <h3>Összes Menüpont</h3>
          <Droppable droppableId="menuList">
            {( provided ) => (
              <Table
                striped
                bordered
                hover
                style={{ borderColor: "#8d643b" }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#D4A373" }}>Menüpontok</th>
                  </tr>
                </thead>
                <tbody>
                  {navs.map( ( e, i ) => (
                    <Draggable
                      key={e.navigation_id}
                      draggableId={`menu-${ e.navigation_id }`}
                      index={i}
                    >
                      {( provided, snapshot ) => (
                        <>
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <td style={{ backgroundColor: "#eed199" }} >{e.name}</td>
                          </tr>
                        </>
                      )}
                    </Draggable>
                  ) )}
                  {provided.placeholder}
                </tbody>
              </Table>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default NavElemek;
