import React from "react";
import ToDoList from "./ToDo/ToDoList";
import ToDoFormContainer from "./ToDo/ToDoFormContainer";


const Home: React.FunctionComponent = (props: any) => {

    return (
        <>
            <h4>Home Page</h4>
            <ToDoFormContainer
                props={props}
            />
            <ToDoList />
        </>
    );
};

export default Home;