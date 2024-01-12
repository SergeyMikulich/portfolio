import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { weatherURL } from './component/apidata';
import '../weather/css/style.scss';
import { Icon } from "@iconify/react";
import Sunny from "../weather/img/sunny.jpg";

const Weather = () => {
    const [current, setCurrent] = useState({});
    const [location, setLocation] = useState({});
    const showFront = () => {
        document.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
    };

    const showBack = () => {
        document.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
    };

    const flipCard = () => {
        const cardInner = document.querySelector('.card-inner');
        if (cardInner.style.transform === 'rotateY(180deg)') {
            showFront();
        } else {
            showBack();
        }
    };

    const handleSubmit = () => {
        let city = document.querySelector('#cityInput')?.value;
        if (!city) {
            return;
        }

        const finalURL = weatherURL.replace('$locationName$', city);
        console.log(`city: ${city}, url: ${finalURL}`);
        fetch(finalURL)
            .then(res => res.json())
            .then(
                async (result) => {
                    await setCurrent(result.current);
                    await setLocation(result.location);
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            );
        flipCard();
    };

    return (
        <div className="weather section">
            <div className="wrapper">
                <div className="weather-card">
                    <div className="card-inner">
                        <div className="front">
                            <input type="text" id="cityInput" placeholder="Введите город" />
                            <button onClick={handleSubmit}>Подтвердить</button>
                        </div>
                        <div className="back">
                            <div className="header">
                                <Icon icon="uiw:left" className="icon left" onClick={flipCard} />
                                <Icon icon="material-symbols-light:settings" className="icon setting" />
                                <div className="text-overlay">
                                    <h2>{current.condition && current.condition.text}</h2>
                                    <p>{location && location.region}</p>
                                    <h1>{current && current.temp_c}°C</h1>
                                </div>
                            </div>
                            <div className="footer">
                                <div id="weatherInfo">
                                    <div className="yesterday item">
                                        <p>Yesterday</p>
                                        <p><Icon icon="ph:sun" /> 23°C</p>
                                    </div>
                                    <div className="tommorow item">
                                        <p>Tomorrow</p>
                                        <p><Icon icon="ic:sharp-cloud" /> 21°C</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
