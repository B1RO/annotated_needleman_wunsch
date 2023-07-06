import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {generateRandomSequence} from "./generate_random_sequence";
import {findLongestMatchingSubsequence} from "./findLongestMatchingSubsequence";

const SequenceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
`;
const SequenceName = styled.div`
  font-size: 1.5rem;
  padding-bottom: 1rem;
`;
const Sequence = styled.div`
  font-size: 1rem;
`;
const SequenceLetter = styled.div<{ color: string }>`
  display: inline-block;
  background-color: ${props => props.color};
  width: 1rem;
  text-align: center;
`;

export function LongestMatchingSubsequenceComponent(props: {
    sequenceA: string,
    matchingIndicesA: Array<number>,
    sequenceB: string,
    matchingIndicesB: Array<number>,
}) {
    return <>
        <SequenceContainer>
            <SequenceName>Sequence A</SequenceName>
            <Sequence>
                {[...props.sequenceA].map((x, index) => (
                    <SequenceLetter
                        key={index}
                        color={props.matchingIndicesA.includes(index) ? "#A5D6A7" : "transparent"}
                    >
                        {x}
                    </SequenceLetter>
                ))}
            </Sequence>
        </SequenceContainer>
        <SequenceContainer>
            <SequenceName>Sequence B</SequenceName>
            <Sequence>
                {[...props.sequenceB].map((x, index) => (
                    <SequenceLetter
                        key={index}
                        color={props.matchingIndicesB.includes(index) ? "#A5D6A7" : "transparent"}>
                        {x}
                    </SequenceLetter>
                ))}
            </Sequence>
        </SequenceContainer>
    </>;
}

export function useLongestMatchingSubsequence(sequenceLength: number) {
    const [sequenceA, setSequenceA] = useState<string>(generateRandomSequence(sequenceLength));
    const [sequenceB, setSequenceB] = useState<string>(generateRandomSequence(sequenceLength));
    const [matchingIndicesA, setMatchingIndicesA] = useState<number[]>(findLongestMatchingSubsequence(sequenceA, sequenceB).indicesA);
    const [matchingIndicesB, setMatchingIndicesB] = useState<number[]>(findLongestMatchingSubsequence(sequenceA, sequenceB).indicesA);


    useEffect(() => {
        const interval = setInterval(() => {
            const newSequenceA = generateRandomSequence(sequenceLength);
            const newSequenceB = generateRandomSequence(sequenceLength);

            const {indicesA, indicesB} = findLongestMatchingSubsequence(newSequenceA, newSequenceB);

            setSequenceA(newSequenceA);
            setSequenceB(newSequenceB);
            setMatchingIndicesA(indicesA);
            setMatchingIndicesB(indicesB);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return {sequenceA, sequenceB, matchingIndicesA, matchingIndicesB};
}
