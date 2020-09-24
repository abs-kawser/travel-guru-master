import React, { useContext, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Placeinformation from '../../Fakedata/PlaceInformation';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../project_image/WhiteLogo.png'
import './Booking.css'
import { userContext } from '../../App';




const Booking = () => {
    const [isSignedIn,setSignedIn]  = useContext(userContext)
   
    let history = useHistory()

    const placeData = Placeinformation;
    const {placeName} = useParams();
    const  placeInfo= placeData.find(Place => Place.name === placeName)

    const handleSubmit =(e) =>{
        const update = {...isSignedIn}
        update.destination = placeName
        setSignedIn(update)
        history.push("/search")
        e.preventDefault();
        }

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
                    {
                        isSignedIn.email ? " " : <Link to="/login"><button className="button">Log in</button></Link>
                    }
                    <ul>
                        <li><a href="/news">News</a></li>
                        <li><a href="/destination">Destination</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
              </nav>
           </div>

           <div className="container">
                <div className="booking-container">

                    <div className="about-place">
                        <h1>{placeName}</h1>
                        <p>{placeInfo.description}</p>
                    </div>

                    <div className="booking-form">
                        <div className="form-container">
                           <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label style={{color:'grey',fontweight:"500"}} for="origin">Origin</label>
                                    <input className="form-control" required name="origin" id="origin" />
                                    
                                </div>
                                <div className="form-group">
                                    <label style={{color:'grey',fontweight:"500"}} for="destination">Destination</label>
                                    <input className="form-control" required  defaultValue={placeName} name="destination" id="destination"  />
                                    
                                </div>

                                <div className="from-to-date">
                                    <div className="form-group">
                                        <label style={{color:'grey',fontweight:"500"}} htmlFor="destination">From</label>
                                        <input type="date" className="form-control" required name="fromDate" id="from"  />
                                        
                                    </div>
                            
                                    <div className="form-group">
                                        <label style={{color:'grey',fontweight:"500"}} for="to">To</label>
                                        <input type="date" className="form-control" required name="toDate" id="to" />
                                        
                                   </div>
                                </div>
                                <button style={{backgroundColor:"#F9A51A",color:"black",fontWeight:"700"}} className="form-control" type="submit">Start Booking</button>
                           </form>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    );
};

export default Booking;