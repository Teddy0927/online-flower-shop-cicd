import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <div className="footer container-fluid justify-content-start">
            <div className="row">
                <div className="col-md-3 col-12">
                    <br />
                    <div className="container">
                        <ul className="row">
                            <li className="d-flex justify-content-start"><h4>Info</h4></li>
                            <li className="d-flex justify-content-start"><FontAwesomeIcon icon={solid('phone')} /><p> +852 0000 0000 </p></li>
                            <li className="d-flex justify-content-start"><FontAwesomeIcon icon={brands('whatsapp')} /><p> +852 0000 0000</p></li>
                            <li className="d-flex justify-content-start"><FontAwesomeIcon icon={solid('calendar-days')} /><p> Mon-Sat 09:30-18:30 </p></li>
                            <li className="d-flex justify-content-start"><FontAwesomeIcon icon={solid('envelope')} /><p> cs@teddy.com </p></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-12">
                    <br />
                    <div className="container">
                        <ul className="row">
                            <li className="col-12 d-flex justify-content-start"><h4>Collections</h4></li>
                            <li className="col-12 d-flex justify-content-start"><NavLink className="navLinkItem" to='collection/1'>BOUQUET</NavLink></li>
                            <li className="col-12 d-flex justify-content-start"><NavLink className="navLinkItem" to='collection/2'>GLASS DOME</NavLink></li>
                            <li className="col-12 d-flex justify-content-start"><NavLink className="navLinkItem" to='collection/3'>FLOWER BOXES</NavLink></li>
                            <li className="col-12 d-flex justify-content-start"><NavLink className="navLinkItem" to='collection/4'>BLUETOOTH SPEAKER</NavLink></li>
                            <li className="col-12 d-flex justify-content-start"><NavLink className="navLinkItem" to='collection/5'>FANTASY</NavLink></li>
                            <li className="col-12 d-flex justify-content-start"><NavLink className="navLinkItem" to='collection/6'>ROSE BEAR</NavLink></li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-3 col-12">
                    <br />
                    <div className="container">
                        <ul className="row">
                            <li className="d-flex justify-content-start"><h4>About</h4></li>
                            <li className="col-12 d-flex justify-content-start"><NavLink className="navLinkItem" to='aboutUs'>About Us</NavLink></li>
                            <li className="d-flex justify-content-start"><NavLink className="navLinkItem" to='why'>Why Ai.belief</NavLink></li>
                            <li className="d-flex justify-content-start"><NavLink className="navLinkItem" to='aboutFlower'>About Preserved Flower</NavLink></li>
                            <li className="d-flex justify-content-start">TBC</li>
                            <li className="d-flex justify-content-start">TBC</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-12">
                    <br />
                    <div className="container">
                        <ul className="row">
                            <li className="d-flex justify-content-start"><h4>Help</h4></li>
                            <li className="d-flex justify-content-start"><NavLink className="navLinkItem" to='guide'>Shopping Guide</NavLink></li>
                            <li className="d-flex justify-content-start"><NavLink className="navLinkItem" to='customization'>Customize Order</NavLink></li>
                            <li className="d-flex justify-content-start"><NavLink className="navLinkItem" to='shipping'>Shipping</NavLink></li>
                            <li className="d-flex justify-content-start">TBC</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}