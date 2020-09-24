import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../project_image/Logo.png'
import './Login.css'
import googleImg from '../../project_image/Icon/google.png'
import facebookImg from '../../project_image/Icon/fb.png'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../../Firebaseconfig';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { userContext } from '../../App';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [login,setlogin] = useState('login') 
    const [isSignedIn,setSignedIn] = useContext(userContext)
    const [user,setUser] = useState({
        name : "",
        email: "",
        password: ""
       
    })
    const [error,setError] = useState({
        name : "",
        email: "",
        password: ""
    })

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const toogleLogin = (data) =>{
            setlogin(data)
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === "email"){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

          if(isFieldValid === false) {
              const errorInfo = {...error}
              errorInfo[e.target.name] = "invalid email address"
              setError(errorInfo)
          }
            
        }
        if (e.target.name === "password") {
           const isPasswordValid = e.target.value.length > 6;
           const isPasswordHasNumber = /\d{1}/.test(e.target.value);
           isFieldValid = isPasswordHasNumber && isPasswordValid;

           if(isFieldValid === false) {
            const errorInfo = {...error}
            errorInfo[e.target.name] = "Password must be 6 digit and atleast one number"
            setError(errorInfo)
        }
        
        }
        if(isFieldValid){
          const errorInfo = {...error}
          errorInfo[e.target.name] = ""
          setError(errorInfo)
          const newUserInfo = {...user}
          newUserInfo[e.target.name]= e.target.value;
          setUser(newUserInfo)
        }
    }

    //form sumbmit function
    const handleSubmit = (e) =>{
        if(login ==="createAccount" && user.email && user.password){
             firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                updateUserName(user.name)
                const {email,displayName} = res.user
                const logInUser = {
                    ...isSignedIn,
                    isSignedin:true,
                    email: email,
                    name: displayName,
                    success:true,
                    
                }
                setSignedIn(logInUser)
                history.replace(from);
            })
            .catch(function(error) {
               console.log(error)
              });
        }
        if(login ==="login" && user.email && user.password){
           
            firebase.auth().signInWithEmailAndPassword(user.email,user.password)
            .then(res=>{
                const {email,displayName} = res.user
                const logInUser = {
                    ...isSignedIn,
                    isSignedin:true,
                    email: email,
                    name: displayName,
                    success:true,
                            
                    }
                setSignedIn(logInUser)
                history.replace(from);
                 })
            .catch(function(error) {
                      
                    });
            
        }
        e.preventDefault()

    }

    //update user name 
    const updateUserName = userName => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: userName
    })
    .then(res =>{
    })
    
    }

   //facebook and google log in provider
    const provider = new firebase.auth.GoogleAuthProvider();
    const fbprovider = new firebase.auth.FacebookAuthProvider();

    const signInWithGoogle = () =>{
        firebase.auth().signInWithPopup(provider)
        .then(data=>{
            const {email,displayName} = data.user
            const logInUser = {
                ...isSignedIn,
                isSignedin:true,
                email: email,
                name: displayName,
                success:true,
                
            }
            setSignedIn(logInUser)
            history.replace(from);

        })
        .catch(error =>{
            console.log(error)
        });
    }

    const signInWithFacebook = () =>{
        firebase.auth().signInWithPopup(fbprovider)
        .then(data =>{
            const {email,displayName} = data.user 
            const logInUser = {
                ...isSignedIn,
                isSignedin:true,
                email: email,
                name: displayName,
                success:true,
                
            }
            setSignedIn(logInUser)
            history.replace(from);
        })
        .catch(error =>{
            console.log(error)
        });
    }

   
   

    return (
        <div>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/home"><img style={{height:"56px",wifth:"120.26px"}} src={logo} alt=""/></a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            <Link className="nav-btn"  to="/home">Home</Link>
                            <Link className="nav-btn" to="/destination">Destination</Link>
                            <Link  className="nav-btn" to="/blog">Blog</Link>
                            <Link  className="nav-btn" to="/contact">Contact</Link>
                        </div>
                    </div>
                   
                </nav>
                
            </div>
            <div className="container">
                <div className="login-form">

                    {
                        login === 'login'?<h5>Login</h5>:<h5>Create an Account</h5>
                    }

                    <form style={{marginTop:"30px"}} action="">
                        {
                            login === 'createAccount' &&
                            <div>
                                <div class="form-group">
                                    <input
                                     onBlur={handleBlur} 
                                     placeholder="Name"
                                     name = "name" 
                                     required type="text" 
                                     class="form-control"
                                     id="first-name"
                                    />
                                </div>
                            </div> 
                        }

                      <div class="form-group">
                                 <input
                                 onBlur={handleBlur}  
                                 placeholder="Email"
                                 name = "email" 
                                 required type="text" 
                                 class="form-control" 
                                 id="email"
                                 />
                                <small style={{color:"red"}}>{error.email}</small>
                      </div> 

                      <div class="form-group">
                                <input
                                onBlur={handleBlur}  
                                placeholder="Password"
                                name = "password"
                                 required type="password" 
                                 class="form-control" 
                                 id="password"/>
                                  <small style={{color:"red"}}>{error.password}</small>
                      </div>
                     
                     {
                         login === 'login' &&
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div>
                                <input type="checkbox"/>
                                <span>Remember me</span>
                            </div>
                            <div>
                                <a href="#">Forget password</a>
                            </div>
                         </div>
                     }

                      <button onClick={handleSubmit} className="login-button">{login === 'login'?"Login":"Create Account"}</button>      
                    </form>

                    {
                        login === 'login' ? <p>Don't have an account? <span onClick={()=>toogleLogin('createAccount')} className="create-account">Create an account</span></p> :<p>Already have an account? <span onClick={()=>toogleLogin('login')} className="create-account">Login</span></p>
                    }

                    <p style={{textAlign:"center"}}>Or</p>

                    <div className="button-group">
                        <button onClick={signInWithFacebook}> <img className="fb-img" src={facebookImg} alt=""/> Continue with facebook</button>
                        <button onClick={signInWithGoogle}><img className="google-img" src={googleImg} alt=""/> Continue with google</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;