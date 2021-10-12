import React from "react";
import { useSelector, useDispatch } from "react-redux";
//components
import ToDo from "./ToDo";
import ToDoEditReconfirm from "./ToDoEditReconfirm";
//redux action
import { clearTodoList } from "../../redux/todoAction";

const ToDoList = (): React.ReactElement => {

  const dispatch = useDispatch();
  const { list, duplicateEditItem } = useSelector(state => state.todos);
  const handleClearAll = () => {
    dispatch(clearTodoList());
  };
  type taskProps = {
    id: number,
    task: string,
    completed: Boolean,
  }

  return (
    <>
      {!!duplicateEditItem && (
        <ToDoEditReconfirm />
      )}

      <ol className="list-group my-5 border border-light">
        {list.map((todo: taskProps) => (
          <li
            key={todo.id}
            className="list-group-item text-capitalize justify-content-between my-2"
          >
            <ToDo
              {...todo}
            />
          </li>
        ))}
      </ol>
      <button
        className="btn btn-danger btn-block text-capitalize mt-5  mb-5"
        onClick={handleClearAll}
      >
        Clear All
      </button>
    </>
  );
};

export default ToDoList;
