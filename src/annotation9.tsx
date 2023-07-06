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

export function Annotation9() {
    let matrix: Array<Array<number>> = generateMatrix(sequenceB.length, sequenceA.length).map((row, rowIndex) =>
        row.map((entry, columnIndex) => sequenceA[columnIndex] == sequenceB[rowIndex] ? 1 : 0)
    )
    matrix[sequenceB.length - 3][sequenceA.length - 3] = 2
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
                highlightedCells={[...[[sequenceB.length - 1, sequenceA.length - 1],
                    [sequenceB.length - 2, sequenceA.length - 1],
                    [sequenceB.length - 1, sequenceA.length - 2],
                    [sequenceB.length - 2, sequenceA.length - 2],
                    [sequenceB.length - 3, sequenceA.length - 1],
                    [sequenceB.length - 3, sequenceA.length - 2],
                    [sequenceB.length - 2, sequenceA.length - 3],
                    [sequenceB.length - 1, sequenceA.length - 3],
                ].map(x => ({coordinates: x, color: "#CE93D8"})),
                    {coordinates: [sequenceB.length - 3, sequenceA.length - 3] as any, color: "#AB47BC"}
                ]}
                matrix={matrix}
                rowHeaders={[...sequenceB]}
                columnHeaders={[...sequenceA]}/>
        </TableDiv>
    </>
}
