import React from "react";
import styled from "styled-components";
import {Text} from './common'

const RootDiv = styled.div`
  display: flex;
  width: 50vw;
  height: 100vh;
  text-align: start;
  overflow: hidden;
`;

const InnerDiv = styled.div`
  padding-top: 4rem;
  display: flex;
  padding-left: 8rem;
  padding-right: 8rem;
  flex-direction: column;
  height: 100vh;
`;

const Heading = styled(Text)`
  font-family: 'Inter', sans-serif;
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.25;
  padding-bottom: 4rem;
`;

const Subheading = styled(Text)`
  color: #4A148C;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Sentence = styled.span<{ isSelected: boolean }>`
  font-size: 1.25rem;
  background-color: ${props => props.isSelected ? "#E1BEE7" : "initial"};

  &:hover {
    background-color: ${props => props.isSelected ? "#BA68C8" : "#E1BEE7"};
  }

  transition: all 0.2s;
`;


export function PaperSection(props: {
    onChooseSentence: (sentenceNumber: number) => unknown,
    selectedSentenceNumber: number
}) {
    const sentences = [
        "The smallest unit of comparison is a pair of amino acids, one from each protein.",
        "The maximum match can be defined as the largest number of amino acids of one protein that can be matched with those of another protein while allowing for all possible deletions.",
        "The maximum match can be determined by representing in a two-dimensional array, all possible pair combinations that can be constructed from the amino acid sequences of the proteins, A and B, being compared.",
        "If the amino acids are numbered from the N-terminal end, Aj is the jth amino acid of protein A and Bi is the ith amino acid of protein B. The Aj represent the columns and the Bi the rows of the two-dimensional \n" +
        "array, MAT. Then the cell, MATij, represents a pair combination that contains Aj and Bi.",
        "Every possible comparison can now be represented by pathways through the array.",
        "In the simplest method, MATij is assigned the value, one, if Aj is the same kind of amino acid as Bi; if they are different amino acids, MATij is assigned the value, zero.",
        "The maximum-match pathway can be obtained by beginning at the terminals of the sequences (i = y, j = z)",
        "and proceeding toward the origins, first by adding to the value of each cell possessing indices i = y - 1 and/or j = z - 1, the maximum value from among all the cells which lie on a pathway to it.",
        "The process is repeated for indices i = y - 2 and/or j = z - 2.",
        "This increment in the indices is continued until all cells in the matrix have been operated upon."
    ]

    return <RootDiv>
        <InnerDiv>
            <Subheading>Annotated paper</Subheading>
            <Heading>
                A General Method Applicable to the Search for Similarities
                in the Amino Acid Sequence of Two Proteins
            </Heading>
            <Text>
                {sentences.map((sentence, index) => <Sentence
                    isSelected={props.selectedSentenceNumber == index}
                    onClick={() => props.onChooseSentence(index)}>{sentence}</Sentence>)}
            </Text>
        </InnerDiv>
    </RootDiv>
}
