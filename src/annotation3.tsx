import React from "react";
import styled from "styled-components";
import Matrix from "./Matrix";
import {
    LongestMatchingSubsequenceComponent,
    useLongestMatchingSubsequence
} from "./longestMatchingSubsequenceComponent";
import {generateMatrix} from "./generateMatrix";


const Description = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: block;
`;

export const Annotation3: React.FC = () => {
    const sequenceLength = 16;
    const {sequenceA, sequenceB, matchingIndicesA, matchingIndicesB} = useLongestMatchingSubsequence(sequenceLength);


    return (
        <>
            <LongestMatchingSubsequenceComponent sequenceA={sequenceA} sequenceB={sequenceB}
                                                 matchingIndicesA={matchingIndicesA}
                                                 matchingIndicesB={matchingIndicesB}/>
            <Description>
                For example the longest match can be represented in a matrix as follows.
            </Description>
            <Matrix
                highlightedCells={[...Array(matchingIndicesA.length)].map((_, index) => ({
                    coordinates: [matchingIndicesA[index], matchingIndicesB[index]],
                    color: "#A5D6A7"
                }))}
                matrix={generateMatrix(sequenceLength, sequenceLength)} rowHeaders={[...sequenceA]}
                columnHeaders={[...sequenceB]}/>
        </>
    );
}
