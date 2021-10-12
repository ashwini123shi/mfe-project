import React, { useEffect, useState } from "react";
import { getUserList } from '../../services/userService';

/****gql */
import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { request, gql } from "graphql-request";
import axios from "axios";
import DefaultQuery from "./DefaultQuery";

const endpoint = "https://graphqlzero.almansi.me/api";


const queryClient = new QueryClient();

//import axiosService from "./axiosService";
interface ListProps {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

const PostList = (props: any) => {
    const [userId, setuserId] = React.useState(-1);
    const [postId, setPostId] = React.useState(-1);
    const [list, setList] = useState([]);
    const queryClient = useQueryClient();

    // useEffect(() => {
    //     // handlerUserList();

    //     axios.get("https://reqres.in/api/users?page=2")
    //         .then(response => {
    //             //console.log(response.data);
    //             setList(response.data.data);
    //             console.log(list);
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })

    // });
    const handlerUserList = async () => {
        const responseData = await getUserList();
        console.log('list', responseData.data)
        setList(responseData.data);

    }


    return (
        <>
            <h4>List Page</h4>
            {/* <QueryClientProvider client={queryClient}>

                {postId > -1 ? (
                    <Post postId={postId} setPostId={setPostId} />
                ) : (
                    <Posts setPostId={setPostId} />
                )}
                <ReactQueryDevtools initialIsOpen />
            </QueryClientProvider> */}
            <DefaultQuery />




        </>
    );
};








function usePost(postId) {
    return useQuery(
        ["post", postId],
        async () => {
            const { post } = await request(
                endpoint,
                gql`
        query {
          post(id: ${postId}) {
            id
            title
            body
          }
        }
        `
            );

            return post;
        },
        {
            enabled: !!postId
        }
    );
}

function usePosts() {
    return useQuery("posts", async () => {
        const {
            posts: { data }
        } = await request(
            endpoint,
            gql`
        query {
          posts {
            data {
              id
              title
            }
          }
        }
      `
        );
        return data;
    });
}

function Posts({ setPostId }) {
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = usePosts();

    return (
        <div>
            <h1>Posts</h1>
            <div>
                {status === "loading" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
                        <div>
                            {data.map((post) => (
                                <p key={post.id}>
                                    <a
                                        onClick={() => setPostId(post.id)}
                                        href="#"
                                        style={
                                            // We can find the existing query data here to show bold links for
                                            // ones that are cached
                                            queryClient.getQueryData(["post", post.id])
                                                ? {
                                                    fontWeight: "bold",
                                                    color: "green"
                                                }
                                                : {}
                                        }
                                    >
                                        {post.title}
                                    </a>
                                </p>
                            ))}
                        </div>
                        <div>{isFetching ? "Background Updating..." : " "}</div>
                    </>
                )}
            </div>
        </div>
    );
}

function Post({ postId, setPostId }) {
    const { status, data, error, isFetching } = usePost(postId);

    return (
        <div>
            <div>
                <a onClick={() => setPostId(-1)} href="#">
                    Back
                </a>
            </div>
            {!postId || status === "loading" ? (
                "Loading..."
            ) : status === "error" ? (
                <span>Error: {error.message}</span>
            ) : (
                <>
                    <h1>{data.title}</h1>
                    <div>
                        <p>{data.body}</p>
                    </div>
                    <div>{isFetching ? "Background Updating..." : " "}</div>
                </>
            )}
        </div>
    );
}

export default PostList;

