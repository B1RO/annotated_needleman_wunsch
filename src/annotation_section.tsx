import styled from "styled-components";
import {Annotation1} from "./annotation1";
import React from "react";
import {Annotation2} from "./annotation2";
import {Annotation3} from "./annotation3";
import {Annotation4} from "./annotation4";
import {Annotation5} from "./annotation5";
import {Annotation7} from "./annotation7";
import {Annotation6} from "./annotation6";
import {Annotation8} from "./annotation8";
import {Annotation9} from "./annotation9";
import {Annotation10} from "./annotation10";

const RootDiv = styled.div`
  display: flex;
  width: 50vw;
  height: 100vh;
  box-shadow: -5px 0px 10px 0px rgba(0, 0, 0, 0.05);
  flex-direction: column;
  overflow: hidden;
  text-align: start;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 4rem 8rem;
`;


const annotationComponents = [
    <Annotation1/>,
    <Annotation2/>,
    <Annotation3/>,
    <Annotation4/>,
    <Annotation5/>,
    <Annotation6/>,
    <Annotation7/>,
    <Annotation8/>,
    <Annotation9/>,
    <Annotation10/>
]

export function AnnotationSection(props: { selectedSentence: number }) {
    return <RootDiv>
        <InnerDiv>
            {annotationComponents[props.selectedSentence]}
        </InnerDiv>
    </RootDiv>
}

