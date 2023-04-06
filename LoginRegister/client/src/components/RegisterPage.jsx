import React, { useRef, useEffect, useState } from 'react';
import {Button} from "primereact/button";
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import axios from '../api/axios';


export default function RegisterPage() {

    const REGISTER_URL = '/register';
    // const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');



    const [isDesktop, setisDesktop] = useState(window.innerWidth > 768);
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [submitted, setSubmitted] = useState(false);
    
    const isUsernameValid = username.length >= 4;
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [UsernameAlphanumericError, setUsernameAlphanumericError] = useState("");
    
    const isPasswordValid = password.length >= 4;
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [passwordAlphanumericError, setPasswordAlphanumericError] = useState("");

    const isPasswordMatch = password === confirmPass;

    const isFormValid = isUsernameValid && isPasswordMatch && isPasswordValid; //will be used later

    // useEffect(() => {
    //     userRef.current.focus();
    // }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password, confirmPass]);

    const updateMedia = () => {
        setisDesktop(window.innerWidth > 768);
        setCurrentWidth(window.innerWidth);
      };

    const handleRegister = async () => { 
       setSubmitted(true)

//        fetch('https://dummyjson.com/users/add', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     username: username,
//     password: password,
//   })
// })
// .then(res => res.json())
// .then(console.log);
try {
    const response = await axios.post(REGISTER_URL,
        JSON.stringify({ username, password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    console.log(response?.data);
    console.log(response?.accessToken);
    console.log(JSON.stringify(response))
    // setSuccess(true);
    //clear state and controlled inputs
    //need value attrib on inputs for this
    // setUser('');
    // setPwd('');
    // setMatchPwd('');
} catch (err) {
    if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
    } else {
        setErrMsg('Registration Failed')
    }
    // errRef.current.focus();
    console.log('err', err)
}
    }
 
  
 

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
      });  

      function checkComplexity(str) {
        let firstCharAlphabet = /^[a-z]/i.test(str.charAt(0));
        let regularExpression = /^[a-zA-Z0-9]+$/;
        let alphanumeric = regularExpression.test(str);
        
        return [alphanumeric, firstCharAlphabet];
    }

    return (
        <div className="card">
        <div className="flex flex-column md:flex-row flex">
        {isDesktop &&  <div className="w-full md:w-5 ">
        <Image src="left.png" alt="Image" width='100%'/>
        </div>}
            <div className="w-full md:w-2">
                <Divider layout="vertical" className="hidden md:"></Divider>
                <Divider layout="horizontal" className="hidden md:hidden" align="center"></Divider>
            </div>
           <div className="w-full md:w-4 flex flex-column justify-content-center gap-3 py-5" 
                style={
                    {paddingLeft: '1rem',
                    paddingRight: '1rem',
                    margin: 'auto'}
            }>
            <Image src="gemini-logo-small-black.png" alt="Image" width={ isDesktop ? '250px' : currentWidth-35}/>
                
                <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                    }}>
                    <label htmlFor="username" style={{marginLeft:'5px'}}>Username</label>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <InputText id="username" type="text" 
                        style={{ width: isDesktop ? '25vw' : currentWidth-35, margin: isDesktop ? '0' : 'auto'}} value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={(e) => {
                            if (username.length === 0)
                            setUsernameErrorMessage("Username cannot be empty")
                            if (username.length > 0 && username.length < 4)
                            setUsernameErrorMessage("Username cannot be less than 4 characters")
                            if (username.length >= 4)
                            setUsernameErrorMessage("")

                            let valid = checkComplexity(username)
                            if (!valid[0] || !valid[1])
                            setUsernameAlphanumericError("Username should be alphanumeric and first letter alphabet. ")
                            else 
                            setUsernameAlphanumericError("")
                          }}/>
                    {!isUsernameValid &&  <div style={{ color: 'red' }}> {usernameErrorMessage} </div>}
                    { !isUsernameValid && submitted && usernameErrorMessage.length === 0 && <div style={{ color: 'red' }}> Username cannot be empty </div>}
                    {<div style={{ color: 'red' }}> {UsernameAlphanumericError} </div>}
                </div>
                </div>
                <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                    }}>
                    <label htmlFor="password" style={{marginLeft:'5px'}}>Password</label>
                   <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}> 
                    <InputText id="password" type="password" 
                    style={{ width: isDesktop ? '25vw' : currentWidth-35, margin: isDesktop ? '0' : 'auto'}} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => {
                        if (password.length === 0)
                        setPasswordErrorMessage("Password cannot be empty")
                        if (password.length > 0 && password.length < 4)
                        setPasswordErrorMessage("Password cannot be less than 4 characters")
                        if (password.length >= 4)
                        setPasswordErrorMessage("")

                        let valid = checkComplexity(password)
                            if (!valid[0] )
                            setPasswordAlphanumericError("Password should be alphanumeric. ")
                            else 
                            setPasswordAlphanumericError("")
                      }}/>
                    {!isPasswordValid &&  <div style={{ color: 'red' }}> {passwordErrorMessage} </div>}
                    { !isPasswordValid && submitted && passwordErrorMessage.length === 0 && <div style={{ color: 'red' }}> Password cannot be empty </div>}
                    {<div style={{ color: 'red' }}> {passwordAlphanumericError} </div>}
                </div> 
                </div>

                <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                    }}>
                    <label htmlFor="confirmpass" style={{marginLeft:'5px'}}>Confirm Password</label>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                        
                    }}>
                        <InputText id="confirmpass" type="password" 
                        style={{ width: isDesktop ? '25vw' : currentWidth-35, 
                        margin: isDesktop ? '0' : 'auto'}} 
                        value={confirmPass} 
                        onChange={(e) => setConfirmPass(e.target.value)}/>
                    { !isPasswordMatch && submitted  && <div style={{ color: 'red' }}> Confirm Password is not the same as Password. </div>}
                    </div>
                </div> 
                <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '400px'
                    }}> 
                    <Button style ={{backgroundColor:'#4cd07d', borderColor:'#4cd07d', margin: isDesktop ? '0' : 'auto'}}label="Register" icon="pi pi-user-plus" className="w-10rem" onClick={handleRegister}></Button>
                </div>
            </div>
        </div>
    </div>
    )
}