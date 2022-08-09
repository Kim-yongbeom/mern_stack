import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ handleClick, todoData, setTodoData }) => {
  const handleEnd = (result) => {
    // 목적지가 없으면(이벤트 취소) 이 함수를 종료한다
    if (!result.destination) return;
    // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodoData = todoData;

    // 변경시키는 아이템을 배열에서 지워준다.
    // return 값으로 지워진 아이템을 잡아준다.
    // splice 문법으로 삭제
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 redorderedItem을 insert 해준다.
    // splice 문법으로 추가
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;
