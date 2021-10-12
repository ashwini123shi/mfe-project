import React from "react";
import { useDispatch } from "react-redux";
import { addTodo, editTodoRow, setDuplicateItem } from "../../redux/todoAction";
import { useParams } from "react-router-dom";
interface TaskItem {
  task: String,
  priority: String,
  star: number
}

const ToDoReconfirm = ({ taskItem, showAlert }: any): React.ReactElement => {
  const dispatch = useDispatch();
  let { id } = useParams();
  console.log("param", id);
  const addDuplicateTask = () => {
    if (id) {
      dispatch(editTodoRow(id, taskItem));
      showAlert();
    } else {
      console.log(taskItem);
      dispatch(addTodo(taskItem));
      showAlert();
    }
  };

  const handleDiscard = () => {
    dispatch(setDuplicateItem(false));
  };

  return (
    <div className="card card-body my-3">
      <h5>Dupicate task {taskItem.task}, Still you want to Add?</h5>
      <div className="row">
        <span
          onClick={() => { addDuplicateTask() }}
          className="mx-2 text-success cursor-ptr"
        >
          Proceed
        </span>

        <span onClick={() => { handleDiscard() }} className="mx-2 text-danger cursor-ptr">
          Discard
        </span>
      </div>
    </div>
  );
};
export default ToDoReconfirm;
