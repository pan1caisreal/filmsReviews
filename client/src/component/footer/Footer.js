import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer_">
            <div className="row">
                <ul>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">Our Services</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms & Conditions</a></li>
                    <li><a href="#">Career</a></li>
                </ul>
            </div>
            <div className="row">
                Copyright © 2022 - All rights reserved || Designed By: Korolev D.I.
            </div>
        </div>
    );
};

export default Footer;