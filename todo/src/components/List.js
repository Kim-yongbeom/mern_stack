import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const List = React.memo(
  ({
    key,
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });

      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div
          className={`bg-gray-100 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}
        >
          <div className="items-center">
            <form onSubmit={handleSubmit}>
              <input
                value={editedTitle}
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                onChange={handleEditChange}
              />
            </form>
          </div>
          <div className="items-center ">
            <button
              className="px-4 py-2  text-lg float-right"
              onClick={() => setIsEditing(false)}
            >
              <AiOutlineCloseCircle />
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm float-right"
              type="submit"
            >
              저장
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={key}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}
        >
          <div className="items-center">
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={() => handleCompleteChange(id)}
            />{" "}
            <span className={completed ? "line-through" : undefined}>
              {title}
            </span>
          </div>
          <div className="items-center ">
            <button
              className="px-4 py-2  text-lg float-right"
              onClick={() => handleClick(id)}
            >
              <AiOutlineCloseCircle />
            </button>
            <button
              className="px-4 py-2 text-sm"
              onClick={() => setIsEditing(true)}
            >
              수정
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
