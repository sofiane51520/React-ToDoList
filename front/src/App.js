import React from 'react';
import ToDoApp from "./ToDoApp/ToDoApp"
import TodoList from "./ToDoApp/List/TodoList"
import {BrowserRouter, Switch, Route} from "react-router-dom";

const App = ()=> {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ToDoApp}/>
                <Route path="/list/:id" component={TodoList}/>
            </Switch>

        </BrowserRouter>
    )
}

export default App;