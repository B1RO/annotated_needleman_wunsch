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

export function Annotation7() {
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
                highlightedCells={[{
                    color: "#CE93D8",
                    coordinates: [sequenceB.length-1, sequenceA.length-1]
                }]}
                matrix={generateMatrix(sequenceB.length, sequenceA.length).map((row, rowIndex) =>
                    row.map((entry, columnIndex) => sequenceA[columnIndex] == sequenceB[rowIndex] ? 1 : 0)
                )}
                rowHeaders={[...sequenceB]}
                columnHeaders={[...sequenceA]}/>
        </TableDiv>
    </>
}
