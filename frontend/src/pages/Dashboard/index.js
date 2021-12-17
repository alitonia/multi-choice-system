import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainView from "./MainView";

export default function index() {
    return (
        <div className="dashboard-page">
            <Header />
            <MainView />
            <Footer />
        </div>
    );
}
