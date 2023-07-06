import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Matrix, {HighlightedCells} from "./Matrix";
import {
    LongestMatchingSubsequenceComponent,
    useLongestMatchingSubsequence
} from "./longestMatchingSubsequenceComponent";
import {generateMatrix} from "./generateMatrix";
import {generateRandomSequence} from "./generate_random_sequence";
import {SequenceComponent} from "./sequenceComponent";
import {sequenceA, sequenceB} from "./constants";


const Description = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: block;
`;

export const Annotation4: React.FC = () => {
    let [sequenceA, setSequenceA] = useState(generateRandomSequence(10));
    let [sequenceB, setSequenceB] = useState(generateRandomSequence(6));

    const [positionA, setPositionA] = useState(0); // State for position in sequence A
    const [positionB, setPositionB] = useState(0); // State for position in sequence B

    useEffect(() => {
        const interval = setInterval(() => {
            // Generate random positions for sequence A and B
            const newPositionA = Math.floor(Math.random() * sequenceA.length);
            const newPositionB = Math.floor(Math.random() * sequenceB.length);

            // Update the states with the new positions
            setPositionA(newPositionA);
            setPositionB(newPositionB);
        }, 5000);

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [sequenceA, sequenceB]);

    const color = sequenceA[positionA] === sequenceB[positionB] ? "#A5D6A7" : "#EF9A9A"
    const AjHighlight: HighlightedCells = [...Array(sequenceB.length)].map((_, index) => ({
        coordinates: [index, positionA],
        color: color
    }))
    const BjHighlight: HighlightedCells = [...Array(sequenceA.length)].map((_, index) => ({
        coordinates: [positionB, index],
        color: color
    }))

    return (
        <>
            <SequenceComponent
                sequence={sequenceA}
                label={"Sequence A"}
                letterColor={
                    index => index === positionA ? color : "initial"
                }
            />
            <SequenceComponent
                sequence={sequenceB}
                label={"Sequence B"}
                letterColor={
                    index => index === positionB ? color : "initial"
                }
            />
            <Description>
                Columns represent letters of the sequence A, rows of B. Intersection of these two
                represents a comparison of a letter from A to the letter of B.
                Here the amino acid A_{positionA}={sequenceA[positionA]} is represented as the {positionA}th column
                and the amino acid B_{positionB}={sequenceB[positionB]} is represented as the {positionB}th row.
                Their intersection in the cell [{positionA},{positionB}] represents a comparison
                between {sequenceA[positionA]} and {sequenceB[positionB]}
            </Description>
            <Matrix
                highlightedCells={[...AjHighlight, ...BjHighlight, {color : "black", coordinates : [positionB,positionA]}]}
                matrix={generateMatrix(sequenceB.length, sequenceA.length)} rowHeaders={[...sequenceB]}
                columnHeaders={[...sequenceA]}/>
        </>
    );
}
