import {SequenceComponent} from "./sequenceComponent";
import {sequenceA, sequenceB} from "./constants";
import React, {useState, useEffect} from "react";
import {generateMatrix} from "./generateMatrix";
import Matrix from "./Matrix";
import styled from "styled-components";

const TableDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
`;

export function Annotation10() {
    let [bestScore, setBestScore] = useState<number>([])
    let [optimalPath, setOptimalPath] = useState<Array<[number, number]>>([])
    let [isDone, setIsDone] = useState(false);
    let [iteration, setIteration] = useState(0);
    const [currentCell, setCurrentCell] = useState<[number, number]>([sequenceA.length - 1, sequenceB.length - 1]);
    let [matrix, setMatrix] = useState<Array<Array<number>>>(generateMatrix(sequenceA.length, sequenceB.length).map((row, rowIndex) =>
        row.map((entry, columnIndex) => sequenceA[rowIndex] == sequenceB[columnIndex] ? 1 : 0)
    ));
    const [visited, setVisited] = useState<Array<[number, number]>>([])

    const Description = styled.div`
      font-size: 1.5rem;
      margin-bottom: 1rem;
      display: block;
    `;

    function updateMatrix(newCurrentCell: [number, number]) {
        setMatrix(matrix.map((row, rowIndex) => row.map((value, columnIndex) => {
            if (rowIndex == newCurrentCell[0] && columnIndex == newCurrentCell[1]) {
                const frontier = matrix.flatMap((row, rowIndex) => row.filter((value, columnIndex) => {
                    return isFrontier([rowIndex, columnIndex], newCurrentCell)
                }));
                let currentValue = matrix[newCurrentCell[0]][newCurrentCell[1]];
                const maxScore = Math.max(...frontier, 0);
                const newScore = currentValue + maxScore
                if (newScore > bestScore) {
                    setOptimalPath([...optimalPath, newCurrentCell])
                    setBestScore(newScore);
                }
                return newScore
            }
            return value;
        })));
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isDone) {
                if (currentCell[0] == sequenceA.length && currentCell[1] < -2) {
                    setIsDone(true)
                    return;
                }
                setIteration(iteration + 1);
                let newCurrentCell: [number, number] = [currentCell[0] - 1, currentCell[1] + 1];
                while ((newCurrentCell[0] < 0 && newCurrentCell[1] < sequenceB.length)
                || (newCurrentCell[1] < 0)) {
                    newCurrentCell = [newCurrentCell[0] - 1, newCurrentCell[1] + 1]
                }
                if (newCurrentCell[1] >= sequenceB.length) {
                    newCurrentCell = [sequenceA.length - 1, newCurrentCell[0] + 1]
                }
                updateMatrix(newCurrentCell)
                setVisited([...visited, currentCell]);
                setCurrentCell(newCurrentCell);
            }
        }, 1);
        if (isDone) {
            clearInterval(timer)
        }
        return () => clearInterval(timer);
    }, [iteration, currentCell, isDone]);

    function isFrontier(coordinates: [number, number], currentCell: [number, number]) {
        if (isDone)
            return false
        return (coordinates[0] == currentCell[0] + 1 && coordinates[1] >= currentCell[1] + 1
            || (coordinates[1] == currentCell[1] + 1 && coordinates[0] >= currentCell[0] + 1));
    }


    return (
        <>
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
                    highlightedCells={[...isDone ? [] : [{
                        color: "#9C27B0",
                        coordinates: currentCell
                    }],
                        ...optimalPath.map(coordinates => ({
                            color: "#9C27B0",
                            coordinates: coordinates
                        })),
                        ...visited.map(coordinates => ({
                            color: isFrontier(coordinates, currentCell) ? "#7E57C2" : "#CE93D8",
                            coordinates: coordinates
                        })),
                    ]}
                    matrix={matrix}
                    rowHeaders={[...sequenceA]}
                    columnHeaders={[...sequenceB]}/>
            </TableDiv>
            <Description>
                The optimal match is
            </Description>
            <SequenceComponent
                sequence={sequenceA}
                label={"Sequence A"}
                letterColor={index => {
                    return optimalPath.map(x => x[0]).includes(index) ? "#A5D6A7" : "initial"
                }}
            />
            <SequenceComponent
                sequence={sequenceB}
                label={"Sequence B"}
                letterColor={index => {
                    return optimalPath.map(x => x[1]).includes(index) ? "#A5D6A7" : "initial"
                }}
            />
        </>
    )
}
