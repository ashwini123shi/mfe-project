import { ReactElement, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, editTodoRow, setDuplicateItem } from "../../redux/todoAction";

//component
import ToDoForm from "./ToDoForm";
const ToDoFormContainer = (props: any): ReactElement => {
    type taskProps = {
        id: number,
        task: string,
        completed: Boolean
    }
    interface taskItem {
        task: String,
        priority: String,
        star: number
    }

    const { id } = props.props.match.params ? props.props.match.params : 0;
    const isAddMode = !id;
    const [alertVisible, setAlertVisible] = useState(false);
    const { list, duplicateItem } = useSelector(state => state.todos);
    const dispatch = useDispatch();
    //methods
    const handleVisible = (): void => {
        setAlertVisible(true)
        setTimeout(() => {
            setAlertVisible(false)
        }, 5000);
    }
    function handleSubmit(fields: any): Boolean {

        if (isAddMode) {
            createUser(fields);
            console.log(fields);
            return true
        } else {
            updateUser(id, fields);
            console.log(fields);
            return true;
        }
        return false;
    }

    function createUser(fields: any) {
        const duplicate = list.find((item: taskProps) => item.task === fields.task);
        if (!!duplicate) {
            dispatch(setDuplicateItem(duplicate.task));
        } else {
            dispatch(addTodo(fields));
            handleVisible();
            setTimeout(() => {
                setAlertVisible(false)
            }, 5000);
        }
    }

    function updateUser(id: Number, fields: any) {
        const duplicate = list.find((item: taskProps) => item.task === fields.task);
        // console.log(duplicate.id);
        // console.log(fields);
        // (fields.task !== duplicate.task)
        if (!!duplicate && (id != Number(duplicate.id))) {
            dispatch(setDuplicateItem(duplicate.task));
            //dispatch(editTodo(id, duplicate.task, false));
        } else {
            dispatch(editTodoRow(id, fields));
            handleVisible();
            setTimeout(() => {
                setAlertVisible(false)
            }, 5000);
        }
    }

    const fetchitem = () => {
        if (!isAddMode) {
            return list.find((item: taskProps) => item.id === Number(props.props.match.params.id));
        }
    };
    // console.log('formik.touched', submitedValues)


    return (

        <>
            <ToDoForm
                taskItem={fetchitem()}
                isAddMode={isAddMode}
                actionCompleted={alertVisible}
                handleSubmit={handleSubmit} />
        </>
    );
};

export default ToDoFormContainer;
