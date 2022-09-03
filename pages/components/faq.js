import * as React from 'react';
 
function Faq () {

    const questions = [
        {
            "id": "q1",
            "name": "Hvordan opretter man gruppespil?",
            "paragraphs": [
                {
                    "text": "For at oprette et gruppespil, kræver det, at du har et Premium abonnement, eller har købt en adgangsbillet. Adgangsbilletter er engangsbilletter til at oprette et gruppespil"
                },
                {
                    "text": "Du kan købe Premium abonnement og lave dine egne gruppespil, deltage i præmiedyster, få udvidet statistikker og meget mere, ved at navigere til 'Priser'."
                }
            ]
        },
        {
            "id": "q2",
            "name": "Hvorfor kan jeg ikke se min kamp på listen?",
            "paragraphs": [
                {
                    "text": "Af og til kan det forekomme, at en kamp ikke bliver vist under 'Mest spillede' eller 'Dagens kampe'. Hvis dette er tilfældet, kan du forsøge at finde holdet eller ligaen i søgefeltet, og skulle derefter gerne se kampe under 'Kommende kamoe'."
                },
                {
                    "text": "Er dette ikke tilfældet, bedes du kontakte os på mail: madskaiser@tipsspillet.dk, eller via vores fejlregistrerings-system på forsiden efter du er logget ind."
                }
            ]
        },
        {
            "id": "q3",
            "name": "Hvordan tilmelder jeg mig præmiedyster?",
            "paragraphs": [
                {
                    "text": "Præmiedysterne er udelukkende for Premium medlemmer, eller brugere der har købt en adgangsbillet til en præmiedyst. Hvis du har dette, kan du tilmelde dig på selve præmiedysten."
                },
                {
                    "text": "Du kan købe abonnement og adgangsbilletter under siden 'Priser'."
                }
            ]
        },
        {
            "id": "q4",
            "name": "Hvornår får jeg min udbetaling?",
            "paragraphs": [
                {
                    "text": "Dine kuponer bliver først beregnet når alle kampe i din kupon er spillet færdig. Dette betyder din udbetaling først vil komme efter alle kampe er spillede, og der står 'Alle afgjort' i hjørnet af din kupon."
                }
            ]
        },
        {
            "id": "q5",
            "name": "Hvordan inviterer jeg folk til mit gruppespil?",
            "paragraphs": [
                {
                    "text": "I bunden af dit gruppespil finder du et invite-link, som du kan sende til dine venner, hvor de har mulighed for at tilmelde sig dit gruppespil."
                }
            ]
        },
        {
            "id": "q6",
            "name": "Hvordan rapporterer jeg en fejl?",
            "paragraphs": [
                {
                    "text": "Hvis du finder en fejl, bedes du henvende dig via. mail: madskaiser@tipsspillet.dk, eller via vores fejlregistrerings-system på forsiden efter du er logget ind."
                }
            ]
        }
    ]

    function showQuestion(id) {
        let q_p = document.getElementById(id+"-p");
        let q_a = document.getElementById(id+"-a");
        let q_i = document.getElementById(id+"-i");
        q_p.classList.toggle("faq-q-active");
        q_a.classList.toggle("display");
        q_i.classList.toggle("faq-chevron-active");
    }

    return (
        <>
            <div className="faq-fix">
                <div className="faq-input-con">
                    <input type="text" className="faq-input" placeholder='Få svar på dine spørgsmål'/>
                    <button className="faq-input-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="faq-input-icon" viewBox="0 0 16 16">
<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
                    </button>
                </div>
                <div className="faq-container">
                    {questions.map(question => {
                        return (
                            <div className="faq-element" onClick={() => {showQuestion(question.id)}}>
                                <div className="faq-question">
                                    <p className="faq-q" id={question.id + "-p"}>{question.name}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" id={question.id + "-i"} className="faq-chevron" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                                <div className="faq-answer" id={question.id + "-a"}>
                                    {question.paragraphs.map(para => {
                                        return (
                                            <p className="faq-a-p">{para.text}</p>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}
 
export default Faq;