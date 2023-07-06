export const generateRandomSequence = (length: number): string => {
    const aminoAcids = "ACDEFGHIKLMNPQRSTVWY";
    let sequence = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * aminoAcids.length);
        sequence += aminoAcids.charAt(randomIndex);
    }

    return sequence;
};
