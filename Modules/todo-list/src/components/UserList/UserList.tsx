
import { getUserList, addUser } from '../../services/userService';
import { useQuery, useMutation, useQueryClient } from 'react-query';
//components
import User from "./User";

type Data = {
    id: number;
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
};

type Support = {
    text: string;
    url: string;
};

type Users = {
    data: Data[];
    page: number;
    per_page: number;
    support: Support;
    total: number;
    total_pages: number;
};

const UserList = (props: any) => {
    // Call the useQueryClient hook
    const queryClient = useQueryClient();
    // Grab all users
    const { data: users, isLoading, error } = useQuery<Users, ErrorConstructor>(
        'users',
        getUserList
    );

    // Create a mutation for adding a user
    const { mutateAsync, isLoading: isAddingUser, error: addError } = useMutation(
        addUser
    );

    const handleAddUser = async () => {
        const newUser = await mutateAsync({
            first_name: 'React Query',
            last_name: 'Rules!',
            email: 'xyz@ddd.com'
        });
        console.log('This was an async mutation!');
        console.log('newUser: ', newUser);
        //queryClient.invalidateQueries('users');
        queryClient.setQueryData<Users | undefined>('users', oldData => {
            if (oldData) {
                return {
                    ...oldData,
                    data: [
                        {
                            first_name: newUser.first_name,
                            last_name: newUser.last_name,
                            email: newUser.email
                        } as Data,
                        ...oldData.data
                    ]
                };
            }
        });
    };

    if (isLoading) return <p>Loading ...</p>;
    if (error || addError) return <p>Something went wrong ...</p>;
    if (!users) return null;

    // console.log(users);
    return (
        <>
            <h4>List Page</h4>
            {isAddingUser ? <p>Adding user...</p> : null}
            <button onClick={handleAddUser}>Add User</button>

            {!!users.data && (<table className="table table-striped table-bordered" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>View|Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.data.map(user => (
                        <tr
                            key={user.id}
                            className=""
                        >
                            <User
                                {...user}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
            )}

        </>
    );
};

export default UserList;

