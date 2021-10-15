import React from 'react';
import ToDoApp from "./ToDoApp/ToDoApp"
import TodoList from "./ToDoApp/List/TodoList"
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const App = ()=> {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>


                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={ToDoApp}/>
                        <Route path="/list/:id" component={TodoList}/>
                    </Switch>
                </BrowserRouter>
            </DndProvider>
        </div>
    )
}

export default App;