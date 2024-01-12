import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [`I'm <span class="underline">Developer<span>`],
            typeSpeed: 50,
            startDelay: 500,
            backSpeed: 50,
            loop: true
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div className="home">
            <div className="wrapper" data-aos="fade-up">
                <h1>Serhii Mykulych</h1>
                <span ref={el} />
            </div>
        </div>
    );
}

export default Home;