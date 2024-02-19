import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import logo from "../Image/logo.png";
const TodoList = () => {
  const [inputItems, SetInputItems] = useState("");
  const [items, SetItems] = useState([]);
  const [toggleButton, SettoggleButton] = useState(true);
  const [isEditItems, SetIsEditItems] = useState(null);

  // <--------------for Add and Update items-------------->
  const AddItems = () => {
    if (!inputItems) {
      alert("Please fill the data");
    } else if (inputItems && !toggleButton) {
      SetItems(
        items.map((e) => {
          if (e.id === isEditItems) {
            return { ...e, name: inputItems };
          }
          return e;
        })
      );
      SettoggleButton(true);
      SetInputItems("");
      SetIsEditItems(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputItems,
      };
      SetItems([...items, allInputData]);
      SetInputItems("");
    }
  };

// <--------------for Deletation items-------------->


  const deleteItem = (index) => {
    const updateItem = items.filter((e, i) => {
      return index !== e.id;
    });
    SetItems(updateItem);
  };

// <--------------for Reset / Remove All-------------->
  const removeAll = () => {
    SetItems([]);
  };

// <--------------for Edit items-------------->
  const editItem = (id) => {
    let newEditItems = items.find((e, i) => {
      return e.id === id;
    });
    SettoggleButton(false);

    SetInputItems(newEditItems.name);

    SetIsEditItems(id);
  };

  return (
    <>
      <div className="main-about container">
        <div className="about-head-content">
          <span className="about-span-bg">CODEALPHA</span>
          <h2>TODO LIST</h2>
        </div>
      </div>

      {/* main part  */}

      <div className="main">
        <div className="child">
          <figure className="logo">
            <img src={logo} alt="" style={{ width: "90px" }} />
            <figcaption className="caption">Add Your Items</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder=" ✍️  Add Items... "
              value={inputItems}
              onChange={(e) => SetInputItems(e.target.value)}
              style={{ color: "#33BEFF" }}
            />
            {toggleButton ? (
              <AddIcon
                style={{
                  color: "#33BEFF",
                  position: "relative",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={AddItems}
              />
            ) : (
              <EditIcon
                style={{
                  color: "#33BEFF",
                  position: "relative",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={AddItems}
              />
            )}
          </div>
          {items.map((e, i) => {
            return (
              <div className="showItem" key={e.id}>
                <p className="toDo_List">{e.name}</p>
                <div className="icons">
                  <EditIcon
                    style={{
                      color: "#33BEFF",
                      margin: "0px 0px 0px 0px",
                      cursor: "pointer",
                    }}
                    onClick={() => editItem(e.id)}
                  />
                  <DeleteOutlineIcon
                    style={{
                      color: "#33BEFF",
                      margin: "0px 0px 0px 0px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteItem(e.id)}
                  />
                </div>
              </div>
            );
          })}

          <div className="submit-butn">
            <button onClick={removeAll}>Remove All</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
