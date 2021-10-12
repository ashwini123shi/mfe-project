
import axios from 'axios';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';//router
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { mockableDeleteData } from '../../services/userService';

interface Props {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
const handleDelete = async (id: Number) => {
    mockableDeleteData();
    const res = await axios.delete(`https://reqres.in/api/users/${id}`);
    alert(JSON.stringify(res, null, 2));
}
const SingleUser = ({ id, email, first_name, last_name, avatar }: Props): ReactElement => {
    return (
        <>
            <td className="m-1">{first_name}{last_name}</td>
            <td>{email}</td>
            <td>
                <Link to={`/view-user/${id}`}> View</Link>|
                <span className="delete" onClick={(e) => handleDelete(id)}> Delete</span>

            </td>
        </>
    );
};

export default SingleUser;
