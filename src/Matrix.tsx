import React from 'react';
import styled from 'styled-components';

export type HighlightedCells = { coordinates: [number, number]; color: string }[];

interface MatrixProps {
    matrix: (number | null)[][];
    rowHeaders: string[];
    columnHeaders: string[];
    highlightedCells?: HighlightedCells
}


interface TdProps {
    highlightColor?: string;
}

const Td = styled.td<TdProps>`
  border: 1px solid black;
  padding: 0.1rem;
  background-color: ${(props) => props.highlightColor || 'transparent'};
  width: 2rem; /* Set the width to the desired size (e.g., 2rem) */
  height: 2rem; /* Set the height to the same value as width */
`;

const ThDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Th = styled.th`
  margin: 0;
  padding: 0;
`;

const Tr = styled.tr`
  th {
    text-align: end;
    padding-right: 1rem;
  }
`;


const Table = styled.table<{ width: number | string }>`
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  border-spacing: 0;
  width: ${props => props.width};
`;

const Matrix: React.FC<MatrixProps> = ({
                                           matrix,
                                           rowHeaders,
                                           columnHeaders,
                                           highlightedCells = [],
                                       }) => {
    return (
        <Table width={`${2 * (matrix.length + 2)}rem`}>
            <thead>
            <tr>
                <Th></Th>
                {columnHeaders.map((header, index) => (
                    <Th key={index}>{header}</Th>
                ))}
            </tr>
            </thead>
            <tbody>
            {matrix.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                    <Th>{rowHeaders[rowIndex]}</Th>
                    {row.map((cell, cellIndex) => {
                        const cellCoordinates = [rowIndex, cellIndex];
                        const highlightedCell = highlightedCells.find(
                            (cell) =>
                                JSON.stringify(cell.coordinates) ===
                                JSON.stringify(cellCoordinates)
                        );
                        const highlightColor = highlightedCell?.color;

                        return (
                            <Td key={cellIndex} highlightColor={highlightColor}>
                                <ThDiv>
                                {cell}
                                </ThDiv>
                            </Td>
                        );
                    })}
                </Tr>
            ))}
            </tbody>
        </Table>
    );
};

export default Matrix;
