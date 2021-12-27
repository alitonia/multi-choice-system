import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { routes } from "./pages/routes";
import store from "./store";
import { APP_LOADED, REDIRECT } from "./store/action";

function App() {
    const history = useHistory();
    const common = useSelector(state => state.common);

    const onLoad = (token, user) => {
        store.dispatch({ type: APP_LOADED, token, user });
    };

    const onRedirect = () => {
        store.dispatch({ type: REDIRECT });
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        console.log(token);
    }, []);

    useEffect(() => {
        if (common.redirectTo) {
            history.push(common.redirectTo);
            onRedirect();
        }
    }, [common.redirectTo, history]);

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
