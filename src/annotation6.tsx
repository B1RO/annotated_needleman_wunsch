import {SequenceComponent} from "./sequenceComponent";
import {sequenceA, sequenceB} from "./constants";
import React from "react";
import {generateMatrix} from "./generateMatrix";
import Matrix from "./Matrix";
import styled from "styled-components";

const TableDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
`;


function findIndexPairs(sequenceA: string, sequenceB: string): Array<[number, number]> {
    const indexPairs : Array<[number,number]> = [];

    for (let indexA = 0; indexA < sequenceA.length; indexA++) {
        for (let indexB = 0; indexB < sequenceB.length; indexB++) {
            if (sequenceA[indexA] === sequenceB[indexB]) {
                indexPairs.push([indexB,indexA]);
            }
        }
    }

    return indexPairs;
}

export function Annotation6() {
    return <>
        <SequenceComponent
            sequence={sequenceA}
            label={"Sequence A"}
        />
        <SequenceComponent
            sequence={sequenceB}
            label={"Sequence B"}
        />
        <TableDiv>
            <Matrix
                highlightedCells={findIndexPairs(sequenceA, sequenceB).map((coordinates) => ({
                    coordinates,
                    color: "#CE93D8"
                }))}
                matrix={generateMatrix(sequenceB.length, sequenceA.length).map((row, rowIndex) =>
                    row.map((entry, columnIndex) => sequenceA[columnIndex] == sequenceB[rowIndex] ? 1 : 0)
                )}

                rowHeaders={[...sequenceB]}
                columnHeaders={[...sequenceA]}/>
        </TableDiv>
    </>
}
