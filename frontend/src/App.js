import { Route, Switch } from "react-router-dom";
import { routes } from "./pages/routes";

function App() {
    return (
        <div className="App">
            <Switch>
                {routes.map((r, index) => (
                    <Route
                        key={index.toString()}
                        path={r.path}
                        component={r.component}
                        {...r.others}
                    />
                ))}
            </Switch>
        </div>
    );
}

export default App;
