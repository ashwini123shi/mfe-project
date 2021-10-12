import React, { useEffect } from "react";
//component
import ToDoFormContainer from "./ToDoFormContainer";

const TodoDetails = (props: any): React.ReactElement => {
    return (<>
        <ToDoFormContainer
            props={props}
        />
    </>);
};

export default TodoDetails;