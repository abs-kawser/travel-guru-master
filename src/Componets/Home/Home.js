import React, { useContext } from 'react';
import './Home.css'
import logo from '../../project_image/WhiteLogo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import sreemongolImage from '../../project_image/Image/Sreemongol.png'
import sundorbanImage from '../../project_image/Image/sundorbon.png'
import coxsBazarImage from '../../project_image/Image/Rectangle 1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import { handleLogOut } from '../Login/Login';


const Home = () => { 
   const  [isSignedIn,setSignedIn] = useContext(userContext)
  
    return (
        <div className="main-container">
           <div className="container">
                <nav>
                    <div className="logo">
                        <img className="logo-color" style={{height:"56px",width:"120.26px"}} src={logo} alt=""/>
                    </div>
                    <div className="search-box">
                        <input placeholder="search your destination..." type="text"/>
                    </div>
                    <Link to={isSignedIn.email?"/home":"/login"}>
                        {
                            isSignedIn.email? " ": <button className="button">Log in</button>
                        }
                    </Link>
                    <ul>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/destination">Destination</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/Contact">Contact</Link></li>
                    </ul>
                </nav>
          </div>
            <div className="container place-details">
                <div className="places">
                    <div className="place-image">
                        <img src={coxsBazarImage} alt=""/>
                        <p>COX'S BAZAR</p>
                        <Link to="/booking/coxsbazar">
                            <button style={{fontWeight:"700"}} className="booking-button">Booking<FontAwesomeIcon style={{marginLeft:"5px"}} icon={faArrowRight}/></button>
                        </Link>  
                    </div>
                    <div className="place-image">
                        <img src={ sreemongolImage} alt=""/>
                        <p>SREEMANGAL</p>
                        <Link to="/booking/sreemangal">
                            <button style={{fontWeight:"700"}} className="booking-button">Booking<FontAwesomeIcon style={{marginLeft:"5px"}} icon={faArrowRight}/></button>
                        </Link>
                    </div>
                    <div className="place-image">
                        <img src={sundorbanImage} alt=""/>
                        <p>SUNDERBAN</p>
                        <Link to="/booking/sunderban">
                            <button style={{fontWeight:"500"}} className="booking-button">Booking<FontAwesomeIcon style={{marginLeft:"5px"}} icon={faArrowRight}/></button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;