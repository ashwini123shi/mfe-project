import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTodo, setDuplicateEditItem } from "../../redux/todoAction";
import { Alert } from "reactstrap";


const ToDoEditReconfirm = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { duplicateEditItem, duplicateEditItemId, duplicateItemIndex } = useSelector(state => state.todos);
  const [alertVisible, setAlertVisible] = useState(false);
  const handleDuplicateEdit = (): void => {
    dispatch(editTodo(duplicateEditItemId, duplicateEditItem, true));//send id,value to reducer
    setAlertVisible(true)
  };

  const handleEditDiscard = (): void => {
    dispatch(setDuplicateEditItem(false));
  };

  return (
    <div className="card card-body my-3">
      <h5>
        Dupicate task {duplicateEditItem} at position {duplicateItemIndex} Still you want to Update?
      </h5>
      <div className="row">
        <span
          onClick={() => handleDuplicateEdit()}
          className="mx-2 text-success cursor-ptr"
        >
          Add
        </span>

        <span
          onClick={() => handleEditDiscard()}
          className="mx-2 text-danger cursor-ptr"
        >
          Discard
        </span>
      </div>
      <Alert isOpen={alertVisible} fade={false} color="success" className="mt-3">
        Todo  details saved successfully
      </Alert>
    </div>
  );
};
export default ToDoEditReconfirm;
