import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
const HomePage = () => {
    return (
        <div className="home-page page">
            <div className="container">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}

export  default HomePage;