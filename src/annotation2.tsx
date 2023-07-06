import React from "react";
import styled from "styled-components";
import {
    LongestMatchingSubsequenceComponent,
    useLongestMatchingSubsequence
} from "./longestMatchingSubsequenceComponent";


const Description = styled.div`
  font-size: 1.5rem;
`;

export const Annotation2: React.FC = () => {
    const sequenceLength = 16;
    const {sequenceA, sequenceB, matchingIndicesA, matchingIndicesB} = useLongestMatchingSubsequence(sequenceLength);


    return (
        <>
            <LongestMatchingSubsequenceComponent sequenceA={sequenceA} sequenceB={sequenceB}
                                                 matchingIndicesA={matchingIndicesA}
                                                 matchingIndicesB={matchingIndicesB}/>
            <Description>
                The maximum match is {matchingIndicesA.map(x => sequenceA[x]).join("")} and has
                length {matchingIndicesA.length}
            </Description>
        </>
    );
}
