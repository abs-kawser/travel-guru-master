import React from 'react';
import './Hotelroom.css'
import star from '../../project_image/Icon/star_1_.png'

const Hotelroom = (props) => {
    const {name,img} = props.details;
    return (
        <div style={{display:"flex",justifyContent:"space-between",width:"500px",padding:"10px"}}>
            <div>
                <img  style={{width:"200px" ,height:"200px"}} src={img} alt=""/>
            </div>
            <div style={{width:"313px",height:"200px",marginLeft:"30px",border:"1px solid grey",padding:"5px"}}>
                <h5>{name}</h5>
                <p><span>4 guests</span> <span>2 bedrooms</span><span> 2 beds</span><span> 2 baths</span></p>
                <p><span>Wif Air conditioning Kitchen</span></p>
                <p><span> Cancellation fexibility availiable</span></p>
                <p><span><img style={{height:"10px",width:"10px"}} src={star} alt=""/> </span><span>4.9 (20)</span><span> <b>$34/</b></span><span>night</span></p>
            </div>
        </div>
    );
};

export default Hotelroom;