import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getUserById } from '../../services/userService';
import UserEditForm from "./UserEditForm";

type Data = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
function getUserData(id: number) {
    return useQuery(["user", id], () => getUserById(id), {
        enabled: !!id,
    });
}
const UserEditContainer = () => {

    let { id } = useParams();
    const { data: user, isLoading, error } = getUserData(id);

    function handleSubmit(fields: any): Boolean {

        console.log(fields);
        return false;
    }
    return (
        <>
            {!!user && (
                <UserEditForm
                    user={user}
                    isAddMode={false}
                    actionCompleted={false}
                    handleSubmit={handleSubmit}
                />
            )}

        </>
    );
};

export default UserEditContainer;
