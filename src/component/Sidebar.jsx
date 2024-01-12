import React from "react";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import photo from '../img/myphoto.jpg';
const Sidebar = () => {
    return (
        <div className="sidebar">
            <header className="header">
                <div className="profile">
                    <img src={photo} alt="" />
                    <p>Serhii Mykulych</p>
                    <div className="links">
                        <a href="#"><Icon className="bx" icon="fa:instagram" /></a>
                        <a href="#"><Icon className="bx" icon="iconoir:telegram" /></a>
                        <a href="#"><Icon className="bx" icon="mingcute:git-lab-fill" /></a>
                        <a href="#"><Icon className="bx" icon="ri:facebook-fill" /></a>
                        <a href="#"><Icon icon="pajamas:twitter" /></a>
                    </div>
                </div>
                <div className="navbar">
                    <ul>
                        <li><Link to="/"><Icon className="icon" icon="bx:home" />Home</Link></li>
                        <li><Link to="/about"><Icon className="icon" icon="mdi:about-variant" />About</Link></li>
                        <li><Link to="/resume"><Icon className="icon" icon="mdi:resume" />Resume</Link></li>
                        <li><Link to="/portfolio"><Icon className="icon" icon="bytesize:portfolio" />Portfolio</Link></li>
                        <li><Link to="/contact"><Icon className="icon" icon="fluent-mdl2:contact" />Contact</Link></li>
                    </ul>
                </div>
            </header>
            <div className="footer">
                <p>© 2023 - Serhii Mykulch</p>
            </div>
        </div>
    );
}

export default Sidebar;
