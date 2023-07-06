import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Matrix, {HighlightedCells} from "./Matrix";
import {generateMatrix} from "./generateMatrix";
import {generateRandomSequence} from "./generate_random_sequence";
import {SequenceComponent} from "./sequenceComponent";

const Description = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: block;
`;


function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const Annotation5: React.FC = () => {
    const sequenceLength = 20;
    let [sequenceA, setSequenceA] = useState(generateRandomSequence(sequenceLength));
    let [sequenceB, setSequenceB] = useState(generateRandomSequence(sequenceLength));

    let numberOfIndicesToCompare = Math.floor(Math.random() * sequenceA.length);

    function generateNewIndices() {
        return Array.from({length: numberOfIndicesToCompare}, () => getRandomNumber(1, sequenceLength))
    }

    let [randomIndicesA, setRandomIndicesA] = useState(generateNewIndices());
    let [randomIndicesB, setRandomIndicesB] = useState(generateNewIndices());

    let [highlightedCells, setHighlightedCells] = useState<HighlightedCells>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            let newSequenceA = generateRandomSequence(20);
            let newSequenceB = generateRandomSequence(20);
            let numberOfIndicesToCompare = Math.floor(Math.random() * newSequenceA.length / 2);

            let newRandomIndicesA = generateNewIndices()
            newRandomIndicesA.sort((a, b) => a - b)
            let newRandomIndicesB = generateNewIndices()
            newRandomIndicesB.sort((a, b) => a - b)

            setSequenceA(newSequenceA);
            setSequenceB(newSequenceB);
            setRandomIndicesA(newRandomIndicesA);
            setRandomIndicesB(newRandomIndicesB);

            setHighlightedCells(newRandomIndicesA.map((indexA, i) => {
                const indexB = newRandomIndicesB[i];
                const color = "#CE93D8"
                return {coordinates: [indexA, indexB], color};
            }));

        }, 500);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const getColor = (index: number, randomIndices: Array<number>, otherRandomIndices: Array<number>, sequence: string, otherSequence: string) => {
        const randomIndex = randomIndices.indexOf(index);
        if (randomIndex == -1) {
            return "initial"
        }
        return "#CE93D8"
    };

    return (
        <>
            <SequenceComponent
                sequence={sequenceA}
                label={"Sequence A"}
                letterColor={(index) => getColor(index, randomIndicesA, randomIndicesB, sequenceA, sequenceB)}
            />
            <SequenceComponent
                sequence={sequenceB}
                label={"Sequence B"}
                letterColor={(index) => getColor(index, randomIndicesB, randomIndicesA, sequenceB, sequenceA)}
            />
            <Description>
            </Description>
            <Matrix
                highlightedCells={highlightedCells}
                matrix={generateMatrix(sequenceB.length, sequenceA.length)} rowHeaders={[...sequenceB]}
                columnHeaders={[...sequenceA]}/>
        </>
    );
}
