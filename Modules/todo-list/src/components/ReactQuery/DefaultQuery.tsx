/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    useMutation,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
//import { getUserList } from '../UserList/DataLayer/DatalayerUtilities';
//components

import { Link } from "react-router-dom";

// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }) => {
    const { data } = await axios.get(
        //`https://jsonplaceholder.typicode.com${queryKey[0]}`
        `https://reqres.in/api${queryKey[0]}`
    );
    return data.data;
};

// provide the default query function to your app via the query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: defaultQueryFn,
        },
    },
});




const DefaultQuery = (props: any) => {
    const [userId, setuserId] = React.useState(-1);

    return (
        <>
            <QueryClientProvider client={queryClient}>

                {userId > -1 ? (
                    <User userId={userId} setuserId={setuserId} />
                ) : (
                    <UserList setuserId={setuserId} />
                )}
                <ReactQueryDevtools initialIsOpen />
            </QueryClientProvider>

        </>
    );
};

function UserList({ setuserId }) {
    const queryClient = useQueryClient();

    // All you have to do now is pass a key!
    const { status, data, error, isFetching } = useQuery("/users");

    return (
        <div>
            <h1>User List</h1>
            <div>
                {status === "loading" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>

                        <table className="table table-striped table-bordered" >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>View|Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className=""
                                    >
                                        <td className="m-1">{user.first_name}{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>

                                            <a
                                                onClick={() => setuserId(user.id)}
                                                href="#"
                                                style={
                                                    // We can use the queryCache here to show bold links for
                                                    // ones that are cached
                                                    queryClient.getQueryData(["user", user.id])
                                                        ? {
                                                            fontWeight: "bold",
                                                            color: "green",
                                                        }
                                                        : {}
                                                }
                                            >View
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div>{isFetching ? "Background Updating..." : " "}</div>
                    </>
                )}
            </div>
        </div>
    );
}

function User({ userId, setuserId }) {
    // You can even leave out the queryFn and just go straight into options
    const { status, data, error, isFetching } = useQuery(`/users/${userId}`, {
        enabled: !!userId,
    });

    return (
        <div>
            <div>
                <a onClick={() => setuserId(-1)} href="#">
                    Back
                </a>
            </div>
            {!userId || status === "loading" ? (
                "Loading..."
            ) : status === "error" ? (
                <span>Error: {error.message}</span>
            ) : (
                <>
                    <div className="card">
                        <img className="card-img-top card-img" src={data.avatar} alt={data.first_name}></img>
                        <div className="card-body">
                            <h5 className="card-title">{data.first_name} {data.last_name}</h5>
                            <p className="card-text">{data.email}</p>
                            <Link to={`/edit-user/${data.id}`}> Update</Link>
                        </div>
                    </div>

                    <div>{isFetching ? "Background Updating..." : " "}</div>
                </>
            )}
        </div>
    );
}



export default DefaultQuery;

