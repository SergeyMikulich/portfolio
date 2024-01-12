import { Icon } from "@iconify/react";
import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../css/animate.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import photo from '../img/myphoto.jpg';

const About = () => {
    let currentDate = new Date();

    let currentYear = currentDate.getFullYear();

    let result = currentYear - 1999;

    return (
        <div className="about section">
            <div className="wrapper">
                <div className="title">
                    <h1>About</h1>
                    <span></span> 
                </div>
                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                <div className="user-info" data-wow-delay="0.3s">
                    <img src={photo} alt="" />
                    <div className="info">
                        <h1>Frontend Developer</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="personal-data">
                            <span>
                                <Icon className='right-icon' icon="mingcute:right-line" />
                                <b>Birthday:</b> 26 Feb 1999
                            </span>
                            <span>
                                <Icon className='right-icon' icon="mingcute:right-line" />
                                <b>Website:</b> www.example.com
                            </span>
                            <span>
                                <Icon className='right-icon' icon="mingcute:right-line" />
                                <b>Phone:</b> +380663246605
                            </span>
                            <span>
                                <Icon className='right-icon' icon="mingcute:right-line" />
                                <b>City:</b> Kyiv
                            </span>
                            <span>
                                <Icon className='right-icon' icon="mingcute:right-line" />
                                <b>Age:</b> {result}
                            </span>
                            <span>
                                <Icon className='right-icon' icon="mingcute:right-line" />
                                <b>Degree:</b> Master
                            </span>
                            <span>
                                <Icon className='right-icon' icon="mingcute:right-line" />
                                <b>PhEmailone:</b> email@example.com
                            </span>
                            <span>
                                <Icon className='right-icon' icon="mingcute:right-line" />
                                <b>Freelance:</b> Available
                            </span>
                        </div>
                        <p>
                            Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius omnis. Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia repellendus itaque neque. Aliquid amet quidem ut quaerat cupiditate. Ab et eum qui repellendus omnis culpa magni laudantium dolores.
                        </p>
                    </div>
                </div>
                <div className="title">
                    <h1>Facts</h1>
                    <span></span>
                </div>
                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                <div className="title">
                    <h1>Skills</h1>
                    <span></span>
                </div>
                <p>
                    Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.
                </p>
                <div className="skills">
                    <div className="skill">
                        <div className="header">
                            <p>html</p>
                            <p>100%</p>
                        </div>
                        <ProgressBar variant="danger" now={100} />
                    </div>
                    <div className="skill">
                        <div className="header">
                            <p>css</p>
                            <p>90%</p>
                        </div>
                        <ProgressBar variant="danger" now={90} />
                    </div>
                    <div className="skill">
                        <div className="header">
                            <p>javascript</p>
                            <p>75%</p>
                        </div>
                        <ProgressBar variant="danger" now={75} />
                    </div>
                    <div className="skill">
                        <div className="header">
                            <p>photoshop</p>
                            <p>80%</p>
                        </div>
                        <ProgressBar variant="danger" now={80} />
                    </div>
                    <div className="skill">
                        <div className="header">
                            <p>SQL</p>
                            <p>70%</p>
                        </div>
                        <ProgressBar variant="danger" now={70} />
                    </div>
                    <div className="skill">
                        <div className="header">
                            <p>React</p>
                            <p>20%</p>
                        </div>
                        <ProgressBar variant="danger" now={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
