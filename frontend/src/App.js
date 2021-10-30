import {Route, Switch} from "react-router-dom";
import {routes} from "./pages/routes";

function App() {
    return (
        <div className="App">
            <Switch>
                {
                    routes.map((r, index) => {
                        const Component = r.component
                        return (
                            <Route key={index.toString()} path={r.path} {...r.others}>
                                <Component/>
                            </Route>
                        )
                    })
                }
            </Switch>
        </div>
    );
}

export default App;
