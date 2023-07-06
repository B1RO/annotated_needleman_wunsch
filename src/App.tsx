import './App.css'
import React, {useState} from "react";
import {PaperSection} from "./PaperSection";
import {AnnotationSection} from "./annotation_section";
import styled from "styled-components";


const RootDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

function App() {
    const [selectedSentenceNumber, setSelectedSentenceNumber] = useState(0);
    return <RootDiv>
        <PaperSection selectedSentenceNumber={selectedSentenceNumber} onChooseSentence={(sentenceNumber) => {
            setSelectedSentenceNumber(sentenceNumber)
        }}/>
        <AnnotationSection selectedSentence={selectedSentenceNumber}/>
    </RootDiv>
}

export default App
