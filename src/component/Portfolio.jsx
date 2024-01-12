import React from "react";
import Chat from "../img/chat.png";
import { Link } from "react-router-dom";
const Portfolio = () => {
    return (
        <div className="portfolio section">
            <div className="wrapper">
                <div className="title">
                    <h1>Portfolio</h1>
                    <span></span>
                </div>
                <div className="items">
                    <div className="card">
                        <img src={Chat} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Chat with login</h5>
                            <p className="card-text">This chat application is a dynamic platform designed and developed using React.js and Firebase, offering seamless communication features alongside robust user authentication functionalities.</p>
                            <Link className="btn btn-primary stretched-link" to="/chat">Portfolio</Link>
                        </div>
                    </div>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card with stretched link</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link className="btn btn-primary stretched-link" to="/weather">Portfolio</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
