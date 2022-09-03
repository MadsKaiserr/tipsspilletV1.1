import * as React from 'react';
import { useEffect } from 'react';
import Header from './layout/header';

import FaqSite from './components/faq';
import Head from 'next/head'
 
function Faq () {

    return (
        <>
            <Head>
                <title>FAQ - Spørgsmål og svar - Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/faq" />
                <meta name="description" content="FAQ - Få svar på dine spørgsmål - Hvordan opretter man gruppespil? Hvordan tilmelder jeg mig præmiedyser? Hvordan inviterer jeg folk til mit gruppespil?" />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="faq,tipsspillet faq,spørgsmål og svar,tipsspillet spørgsmål og svar,hvordan opretter man gruppespil,hvordan tilmelder jeg mig præmiedyster" />
                <meta itemProp="name" content="Tipsspillet FAQ" />
                <meta itemProp="description" content="FAQ - Få svar på dine spørgsmål - Hvordan opretter man gruppespil? Hvordan tilmelder jeg mig præmiedyser? Hvordan inviterer jeg folk til mit gruppespil?" />
                <meta property="og:title" content="FAQ - Spørgsmål og svar - Tipsspillet" />
                <meta property="og:description" content="FAQ - Få svar på dine spørgsmål - Hvordan opretter man gruppespil? Hvordan tilmelder jeg mig præmiedyser? Hvordan inviterer jeg folk til mit gruppespil?" />
            </Head>
            <Header />
            <div className="pages-top" id="faq-top2">
                <div className="pages-where">
                    <h3 className="pages-where-h1">FAQ</h3>
                    <div className="pages-where-splitter"></div>
                    <h2 className="pages-where-h2">Spørgsmål og svar</h2>
                </div>
                <h1 className="pages-h1">Få svar på dine<br />spørgsmål.</h1>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" id="faq-top" viewBox="0 0 1440 320" className="pages-parent-dir"><path className="pages-wave" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,133.3C672,139,768,149,864,181.3C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <div className="stage-main-container" style={{marginTop: "-100px", backgroundColor: "#fff"}}>
                <FaqSite />
            </div>
        </>
    )
}
 
export default Faq;