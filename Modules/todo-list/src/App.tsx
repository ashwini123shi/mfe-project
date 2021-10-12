import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';//router
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
//components
import TodoApp from "./components/TodoApp";
import { store } from "./imports";

const queryClient = new QueryClient();
export const App = () => (
    <>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <TodoApp />
                    </div>
                </Router>
            </Provider>
        </QueryClientProvider>
    </>
)


