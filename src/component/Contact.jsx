import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from "@iconify/react";
import Modal from "./modal";
import { Button } from "bootstrap";

// import nodemailer from 'nodemailer';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div className="contact section">
            <div className="wrapper">
                <div className="title">
                    <h1>Contact</h1>
                    <span></span>
                </div>
                <p>
                    Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.
                </p>
                <div className="contact-form">
                    <div className="contact-info">
                        <div className="info-item">
                            <span className="icon">
                                <Icon icon="ic:outline-email" style={{ height: '2em', width: '2em' }} />
                            </span>
                            <div className="text">
                                <h1>Email</h1>
                                <p>vikovikox@gmail.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="icon">
                                <Icon icon="fluent:call-24-regular" style={{ height: '2em', width: '2em' }} />
                            </span>
                            <div className="text">
                                <h1>Phone</h1>
                                <p>+380 66 504 3565</p>
                            </div>
                        </div>
                        <div className="map"></div>
                    </div>
                    <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="name" className="">Your name</label>
                                    <input type="text" id="name" name="name" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="email" className="">Your email</label>
                                    <input type="text" id="email" name="email" className="form-control" onChange={(event) => setEmail(event.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form mb-0">
                                    <label htmlFor="subject" className="">Subject</label>
                                    <input type="text" id="subject" name="subject" className="form-control" onChange={(event) => setSubject(event.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form">
                                    <label htmlFor="message">Message</label>
                                    <textarea type="text" id="message" name="message" rows="7" className="form-control md-textarea" onChange={(event) => setMessage(event.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleShow}>
                                Send an email
                            </button>
                        </div>
                    </form>
                    <Modal>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Contact;
