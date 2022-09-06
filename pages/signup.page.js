import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { resetUserSession, setUserSession } from "./services/authService";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import FacebookLogin from 'react-facebook-login';
 
function Signup () {

    const [message, setMessage] = useState("");

    const [box1, setBox1] = useState(false);
    const [box2, setBox2] = useState(false);

    useEffect(() => {
        if (box1) {
            document.getElementById("box1").classList.add("signup-checked");
        } else {
            document.getElementById("box1").classList.remove("signup-checked");
        }
    }, [box1])

    useEffect(() => {
        if (box2) {
            document.getElementById("box2").classList.add("signup-checked");
        } else {
            document.getElementById("box2").classList.remove("signup-checked");
        }
    }, [box2])

    const [box3, setBox3] = useState(false);
    const [box4, setBox4] = useState(false);

    useEffect(() => {
        if (box3) {
            document.getElementById("box3").classList.add("signup-checked");
        } else {
            document.getElementById("box3").classList.remove("signup-checked");
        }
    }, [box3])

    useEffect(() => {
        if (box4) {
            document.getElementById("box4").classList.add("signup-checked");
        } else {
            document.getElementById("box4").classList.remove("signup-checked");
        }
    }, [box4])

    const [fornavn, setFornavn] = useState("");
    const [efternavn, setEfternavn] = useState("");
    const [email, setEmail] = useState("");
    const [kodeord, setKodeord] = useState("");
    const [kodeordVali, setKodeordVali] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        setMessage("");
    }, [fornavn, efternavn, email, kodeord, username])

    useEffect(() => {
        if (kodeord.length >= 8) {
            document.getElementById("passTegn").className = "login-req-element-active";
        } else {
            document.getElementById("passTegn").className = "login-req-element";
        }

        var hasNumber = false;
        var hasUpper = false;
        var hasLower = false;
        for (var i = 0; i < kodeord.length; i++) {
            if (parseInt(kodeord[i]) === 0 || parseInt(kodeord[i]) === 1 || parseInt(kodeord[i]) === 2 || parseInt(kodeord[i]) === 3 || parseInt(kodeord[i]) === 4 || parseInt(kodeord[i]) === 5 || parseInt(kodeord[i]) === 6 || parseInt(kodeord[i]) === 7 || parseInt(kodeord[i]) === 8 || parseInt(kodeord[i]) === 9) {
                hasNumber = true;
            }
            if (kodeord[i] === kodeord[i].toUpperCase()) {
                hasUpper = true;
            }
            if (kodeord[i] === kodeord[i].toLowerCase()) {
                hasLower = true;
            }
        }

        if (hasUpper && hasLower) {
            document.getElementById("passBig").className = "login-req-element-active";
        } else {
            document.getElementById("passBig").className = "login-req-element";
        }

        if (hasNumber) {
            document.getElementById("passTal").className = "login-req-element-active";
        } else {
            document.getElementById("passTal").className = "login-req-element";
        }
        if (hasNumber && hasUpper && hasLower && kodeord.length >= 8) {
            setKodeordVali(true);
        } else {
            setKodeordVali(false);
        }
    }, [kodeord])

    const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/signup";

    const signupHandler = (event) => {
        event.preventDefault();

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        var requestBody = {
            username: username,
            fornavn: fornavn,
            efternavn: efternavn,
            email: email.toLowerCase(),
            password: kodeord,
            rolle: "none",
            nyhedsbrev: false,
            type: "email"
        }

        if (box2) {
            requestBody = {
                username: username,
                fornavn: fornavn,
                efternavn: efternavn,
                email: email.toLowerCase(),
                password: kodeord,
                rolle: "none",
                nyhedsbrev: true,
                type: "email"
            }
        }

        if (fornavn !== "" && efternavn !== "" && username !== "" && email !== "") {
            if (!kodeordVali) {
                setMessage("Dit kodeord skal matche kravene")
                document.getElementById("signupBTN").innerHTML = "Opret konto";
            } else {
                if (box1) {
                    axios.post(signupURL, requestBody, requestConfig).then(response => {
                        console.log("AWS - Opret konto:", response);
                        resetUserSession();
    
                        const loginURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/login";
                        const loginConfig = {
                            headers: {
                                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                            }
                        }
                
                        const loginBody = {
                            email: email.toLowerCase(),
                            password: kodeord,
                            type: "email"
                        }
                
                        axios.post(loginURL, loginBody, loginConfig).then(response => {
                            console.log("AWS - Login:", response);
                            setUserSession(response.data.user, response.data.token);
                            localStorage.setItem("velkommen", "now");
                            document.getElementById("info1").classList.add("display-not");
                            document.getElementById("info2").classList.remove("display-not");
                            window.scrollTo(0, 0)
                        }).catch(error => {
                            console.log(error);
                            setMessage(error);
                            document.getElementById("signupBTN").innerHTML = "Opret konto";
                        })
                    }).catch(error => {
                        if (error.response.status === 401 || error.response.status === 403) {
                            setMessage(error.response.data.message);
                            document.getElementById("signupBTN").innerHTML = "Opret konto";
                        } else {
                            setMessage("Backend server is down")
                            document.getElementById("signupBTN").innerHTML = "Opret konto";
                        }
                    })
                } else {
                    setMessage("For at oprette en konto kræver det du accepterer vores betingelser")
                    document.getElementById("signupBTN").innerHTML = "Opret konto";
                }
            }
        } else {
            setMessage("Udfyld venligst alle felter");
            document.getElementById("signupBTN").innerHTML = "Opret konto";
        }
    }

    const fbResponse = (event) => {
        if (event.name !== undefined && event.email !== undefined) {
            setMessage("");
            document.getElementById("loginForm").classList.add("display-not");
            document.getElementById("fbForm").classList.remove("display-not");
            setEmail(event.email);
            setFornavn(event.name);
        }
    }

    const fbSignupHandler = (event) => {
        event.preventDefault();

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        var requestBody = {
            username: username,
            fornavn: fornavn,
            email: email.toLowerCase(),
            rolle: "none",
            nyhedsbrev: false,
            type: "facebook"
        }

        if (box2) {
            requestBody = {
                username: username,
                fornavn: fornavn,
                email: email.toLowerCase(),
                rolle: "none",
                nyhedsbrev: true,
                type: "facebook"
            }
        }

        if (username !== "") {
            if (box3) {
                axios.post(signupURL, requestBody, requestConfig).then(response => {
                    console.log("AWS - Opret konto:", response);
                    resetUserSession();

                    const loginURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/login";
                    const loginConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }
            
                    const loginBody = {
                        email: email.toLowerCase(),
                        type: "facebook"
                    }
            
                    axios.post(loginURL, loginBody, loginConfig).then(response => {
                        console.log("AWS - Login:", response);
                        setUserSession(response.data.user, response.data.token);
                        localStorage.setItem("velkommen", "now");
                        document.getElementById("info1").classList.add("display-not");
                        document.getElementById("info2").classList.remove("display-not");
                        window.scrollTo(0, 0)
                    }).catch(error => {
                        console.log(error);
                        setMessage(error);
                        document.getElementById("signupBTN2").innerHTML = "Opret konto med facebook";
                    })
                }).catch(error => {
                    if (error.response.status === 401 || error.response.status === 403) {
                        setMessage(error.response.data.message);
                        document.getElementById("signupBTN2").innerHTML = "Opret konto med facebook";
                        if (error.response.data.message === "Der er allerede oprettet en bruger med denne email") {
                            document.getElementById("loginForm").classList.remove("display-not");
                            document.getElementById("fbForm").classList.add("display-not");
                        }
                    } else {
                        setMessage("Backend server is down")
                        document.getElementById("signupBTN2").innerHTML = "Opret konto med facebook";
                    }
                })
            } else {
                setMessage("For at oprette en konto kræver det du accepterer vores betingelser")
                document.getElementById("signupBTN2").innerHTML = "Opret konto med facebook";
            }
        } else {
            setMessage("Udfyld venligst dit brugernavn");
            document.getElementById("signupBTN2").innerHTML = "Opret konto med facebook";
        }
    }

    function access() {
        window.open("/stage", "_self");
    }

    return (
        <>
            <Head>
                <title>Opret konto - Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/signup" />
                <meta name="description" content="Opret konto på Danmarks eneste gratis betting platform - Opret gratis konto, og bet for virtuelle penge mod venner og familie - Deltag i præmiedyster, og vind blandt andet billetter til fodboldkampe i parken." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet opret konto, opret konto,signup,tipsspillet signup,lav konto,konto,min konto" />
                <meta itemProp="name" content="Tipsspillet Opret Konto" />
                <meta itemProp="description" content="Opret konto på Danmarks eneste gratis betting platform - Opret gratis konto, og bet for virtuelle penge mod venner og familie - Deltag i præmiedyster, og vind blandt andet billetter til fodboldkampe i parken." />
                <meta property="og:title" content="Opret konto - Tipsspillet" />
                <meta property="og:description" content="Opret konto på Danmarks eneste gratis betting platform - Opret gratis konto, og bet for virtuelle penge mod venner og familie - Deltag i præmiedyster, og vind blandt andet billetter til fodboldkampe i parken." />
            </Head>
            <div className="signup-wave-top"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="signup-wave" viewBox="0 0 1440 320">
                <path d="M0,224L120,213.3C240,203,480,181,720,149.3C960,117,1200,75,1320,53.3L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
            </svg>
            <div className="signup-container">
                <div className="signup-section">
                    <div className="signup-popup" id="info1">
                        <p className="form-error">{message}</p>
                        <div className="login-text">
                            <h1 className="login-text-h1">Opret din konto</h1>
                        </div>
                        <form onSubmit={signupHandler} className="login-form" id="loginForm">
                            <FacebookLogin
                                appId="1252645385555497"
                                autoLoad={false}
                                fields="name,email"
                                callback={fbResponse}
                                disableMobileRedirect={true}
                                version="2.5"
                                textButton="Opret konto med Facebook"
                                redirectUri="https://www.tipsspillet.dk/"
                                cssClass="facebook-button-class"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="facebook-icon" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                              </svg>}
                            />
                            <p className="signup-eller">Eller</p>
                            <p className="login-form-p">Fornavn<span className="signup-form-p red-color">*</span></p>
                            <input value={fornavn} onChange={event => setFornavn(event.target.value)} type="text" className="login-form-input" required/>
                            <p className="login-form-p">Efternavn<span className="signup-form-p red-color">*</span></p>
                            <input value={efternavn} onChange={event => setEfternavn(event.target.value)} type="text" className="login-form-input" required/>
                            <p className="login-form-p">Brugernavn<span className="signup-form-p red-color">*</span></p>
                            <input value={username} onChange={event => setUsername(event.target.value)} type="text" className="login-form-input" required/>
                            <p className="login-form-p">Email<span className="signup-form-p red-color">*</span></p>
                            <input value={email} onChange={event => setEmail(event.target.value)} type="email" className="login-form-input" required />
                            <p className="login-form-p">Kodeord<span className="signup-form-p red-color">*</span></p>
                            <input value={kodeord} style={{marginBottom: "15px"}} onChange={event => setKodeord(event.target.value)} type="password" className="login-form-input" required/>
                            <div className="login-req">
                                <div className="login-req-element" id="passTegn">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="login-req-check" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                    <p className="login-req-p">Mindst 8 tegn</p>
                                </div>
                                <div className="login-req-element" id="passTal">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="login-req-check" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                    <p className="login-req-p">Mindst 1 tal</p>
                                </div>
                                <div className="login-req-element" id="passBig">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="login-req-check" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                    <p className="login-req-p">Mindst 1 stort og småt bogstav</p>
                                </div>
                            </div>
                            <div className="signup-check">
                                <div className="signup-checkbox" id="box1" onClick={() => {if (box1) {setBox1(false)}else{setBox1(true)}}}></div>
                                <p className="login-check-p">Jeg accepterer Tipsspillet&apos;s <Link href="/betingelser" className="login-form-dotted"><span className="login-form-dotted">brugsbetingelser</span></Link> og <Link href="/privatliv" className="login-form-dotted"><span className="login-form-dotted">privatlivspolitik</span></Link></p>
                            </div>
                            <div className="signup-check">
                                <div className="signup-checkbox" id="box2" onClick={() => {if (box2) {setBox2(false)}else{setBox2(true)}}}></div>
                                <p className="login-check-p">Jeg vil gerne modtage rabatkuponer, nyheder og tips til betting</p>
                            </div>
                            <div className="form-btn">
                                <p className="form-error">{message}</p>
                                <button value="Login" id="signupBTN" className="main-btn-login" style={{width: "100%"}} onClick={() => {
                                var signupBTN = document.getElementById("signupBTN");
                                signupBTN.innerHTML = "<div className='loader'></div>";
                            }} type="submit">Opret konto</button>
                            </div>
                        </form>
                        <form onSubmit={fbSignupHandler} className="login-form display-not" id="fbForm">
                            <p className="login-form-p">Brugernavn<span className="signup-form-p red-color">*</span></p>
                            <input value={username} onChange={event => setUsername(event.target.value)} type="text" className="login-form-input" required/>
                            <div className="signup-check">
                                <div className="signup-checkbox" id="box3" onClick={() => {if (box3) {setBox3(false)}else{setBox3(true)}}}></div>
                                <p className="login-check-p">Jeg accepterer Tipsspillet&apos;s <Link href="/betingelser" className="login-form-dotted"><span className="login-form-dotted">brugsbetingelser</span></Link> og <Link href="/privatliv" className="login-form-dotted"><span className="login-form-dotted">privatlivspolitik</span></Link></p>
                            </div>
                            <div className="signup-check">
                                <div className="signup-checkbox" id="box4" onClick={() => {if (box4) {setBox4(false)}else{setBox4(true)}}}></div>
                                <p className="login-check-p">Jeg vil gerne modtage rabatkuponer, nyheder og tips til betting</p>
                            </div>
                            <div className="form-btn">
                                <p className="form-error">{message}</p>
                                <button value="Login" id="signupBTN2" className="main-btn-login" style={{width: "100%"}} onClick={() => {
                                var signupBTN = document.getElementById("signupBTN2");
                                signupBTN.innerHTML = "<div className='loader'></div>";
                            }} type="submit">Opret konto med facebook</button>
                            </div>
                        </form>
                    </div>
                    <div className="signup-popup display-not" id="info2">
                        <div className="login-text" style={{paddingTop: "30px"}}>
                            <h2 className="login-text-h1">Din konto er nu oprettet!&#128640;</h2>
                        </div>
                        <div className="login-form">
                            <p className="tak-p">Tak for du vil være med til at teste alpha-versionen af Tipsspillet! Det betyder meget!</p>
                            <p className="tak-p">Da vi stadig er i alpha-test, kan der forekomme fejl, mangler mm., og vi vil derfor være taknemmelige, hvis du kunne anmelde fejl, og komme med generel feedback, som kunne hjælpe os på vej til et fremtidigt launch af hjemmesiden.</p>
                            <p className="tak-p">Flere ligaer, odds, funktioner mm. er på vej</p>
                            <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "5px"}} onClick={() => {access()}}>Fortsæt<div className="nav-in-before"></div><span className="nav-in">Begynd at spille</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Signup;