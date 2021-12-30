import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainView from "./MainView";

export default function Dashboard() {
    const history = useHistory();
    const { user } = useSelector(state => state.common);

    useEffect(() => {
        if (user && user.role.role_id === 1) {
            history.push("/admin/dashboard");
        }
    }, [user, history]);
    return (
        <div className="dashboard-page">
            <Header />
            <MainView />
            <Footer />
        </div>
    );
}
