import { Link, useParams } from "react-router-dom";
import { getUserById } from '../../services/userService';
import { useQuery } from 'react-query';



function getUserData(id: number) {
    return useQuery(["user", id], () => getUserById(id), {
        enabled: !!id,
    });
}

const UserView = () => {
    let { id } = useParams();
    const { data: user, isLoading, error } = getUserData(id);
    if (isLoading) return <p>Loading ...</p>;
    if (!user) return null;

    //console.log(user);
    return (
        <>
            <div className="card">
                <img className="card-img-top card-img" src={user.avatar} alt={user.first_name}></img>
                <div className="card-body">
                    <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                    <p className="card-text">{user.email}</p>
                    <Link to={`/edit-user/${id}`}> Update</Link>
                </div>
            </div>
        </>
    );
};

export default UserView;

