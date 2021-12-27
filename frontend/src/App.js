import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { useBaseQuery } from "./hooks/queryFamily/baseQuery/useBaseQuery";
import { routes } from "./pages/routes";
import { APP_LOADED } from "./store/actions";

function App() {
    const history = useHistory();
    const dispatch = useDispatch();

    const token = localStorage.getItem("access_token");
    const url = `http://${process.env.REACT_APP_BACKEND_URL}account/current`;
    const body = useMemo(() => {
        return {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=utf-8",
                authorization: `bearer ${token}`
            }
        };
    }, [token]);

    const { data, error, refetch } = useBaseQuery({
        url,
        hint: "authentication",
        data: body,
        lazy: true
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        if (data) {
            console.log(data);
            dispatch({ type: APP_LOADED, token, user: data });
            history.push("/dashboard");
        }

        if (error) {
            console.log(error);
            dispatch({ type: APP_LOADED, token: null });
            history.push("/login");
        }
    }, [data, error, history, dispatch, token]);

    const routesMemo = useMemo(() => {
        return routes.map((r, index) => (
            <Route key={index.toString()} path={r.path} component={r.component} {...r.others} />
        ));
    }, []);

    return (
        <div className="App">
            <Switch>{routesMemo}</Switch>
        </div>
    );
}

export default App;
