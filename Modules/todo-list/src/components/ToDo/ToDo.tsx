import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo, deleteTodo, toggleTodo, setDuplicateItem } from "../../redux/todoAction";
import { Link } from 'react-router-dom';//router

interface Props {
  id: Number,
  task: String,
  completed: Boolean
}
const ToDo = ({ id, task, completed }: Props) => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(true);

  const handleDelete = (id: Number): void => {
    dispatch(deleteTodo(id));
  };

  //toggle status of item
  const handleToggle = (id: Number): void => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (e: any): void => {
    setIsShown(!isShown);
    console.log(e.currentTarget.value);
    dispatch(editTodo(id, e.currentTarget.value, false));
  };

  const styled = {
    textDecoration: completed ? "line-through" : "none",
  };


  return (
    <div>

      <div className="textBlock">
        {isShown && <div style={styled} onClick={() => setIsShown(!isShown)}>{task}</div>}
        {!isShown && (
          <input
            type="text"
            onMouseOver={(e) => (e.target.style.fontStyle = "italic")}
            onMouseLeave={(e) => (e.target.style.fontStyle = "normal")}
            onBlur={handleEdit}
            defaultValue={task.toString()}
            id={id.toString()}
          />
        )}
      </div>

      <div className="actionBlock">
        <span className="mx-2 text-success cursor-ptr">
          <i
            id={id.toString()}
            name="todoStatus"
            value={id}
            onClick={(e) => handleToggle(Number(e.currentTarget.id))}
            className="fa fa-check"
            aria-hidden="true"
          ></i>
        </span>
        <span className="mx-2 text-danger cursor-ptr">
          <i
            id={id.toString()}
            name="todoDelete"
            value={id}
            onClick={(e) => handleDelete(Number(e.currentTarget.id))}
            className="fa fa-trash"
            aria-hidden="true"
          ></i>
        </span>
        <span className="mx-2 text-success cursor-ptr">
          <Link to={`/todo/${id}`}>
            <i
              className="fa fa-eye"
              aria-hidden="true"
            ></i>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ToDo;
