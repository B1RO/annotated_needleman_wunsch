import styled from "styled-components";
import {useEffect, useState} from "react";
import {sequenceA, sequenceB} from "./constants";
import {SequenceComponent} from "./sequenceComponent";

const Description = styled.div`
  font-size: 1.5rem;
`;

export function Annotation1() {
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
        }, 1000);

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [sequenceA, sequenceB]);

    return (
        <>
            <SequenceComponent
                sequence={sequenceA}
                label={"Sequence A"}
                letterColor={
                    index => index === positionA
                        ? sequenceA[positionA] === sequenceB[positionB]
                            ? "#A5D6A7" // Highlighted with matching letters
                            : "#EF9A9A" // Highlighted with non-matching letters
                        : "initial" // Unhighlighted letters
                }
            />
            <SequenceComponent
                sequence={sequenceB}
                label={"Sequence B"}
                letterColor={
                    index => index === positionB
                        ? sequenceA[positionA] === sequenceB[positionB]
                            ? "#A5D6A7" // Highlighted with matching letters
                            : "#EF9A9A" // Highlighted with non-matching letters
                        : "initial" // Unhighlighted letters
                }
            />
            <Description>
                The amino
                acid {sequenceA[positionA]} {sequenceA[positionA] == sequenceB[positionB] ? "does" : "does not"} match
                the amino acid {sequenceB[positionB]}.
            </Description>
        </>

    );
}
