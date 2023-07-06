import styled from "styled-components";
import {sequenceA} from "./constants";

export const SequenceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
`;
export const SequenceName = styled.div`
  font-size: 1.5rem;
  padding-bottom: 1rem;
`;
export const Sequence = styled.div`
  font-size: 1rem;
`;
export const SequenceLetter = styled.div<{ color?: string }>`
  display: inline-block;
  background-color: ${props => props.color};
  width: 1rem;
  text-align: center;
`;

export function SequenceComponent(props: { label : string, sequence : string, letterColor? : (index : number)=>string }) {
    return <SequenceContainer>
        <SequenceName>{props.label}</SequenceName>
        <Sequence>
            {[...props.sequence].map((x, index) => (
                <SequenceLetter
                    color={props.letterColor?.(index)}
                >
                    {x}
                </SequenceLetter>
            ))}
        </Sequence>
    </SequenceContainer>;
}
