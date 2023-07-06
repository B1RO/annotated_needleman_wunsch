export const findLongestMatchingSubsequence = (seqA: string, seqB: string): {
    indicesA: number[],
    indicesB: number[]
} => {
    const matchScore = 1;
    const mismatchScore = -1;
    const gapPenalty = -1;

    let matrix: number[][] = Array(seqA.length + 1).fill(0).map(() => Array(seqB.length + 1).fill(0));

    for (let i = 1; i <= seqA.length; i++) {
        matrix[i][0] = i * gapPenalty;
    }
    for (let j = 1; j <= seqB.length; j++) {
        matrix[0][j] = j * gapPenalty;
    }

    for (let i = 1; i <= seqA.length; i++) {
        for (let j = 1; j <= seqB.length; j++) {
            const match = matrix[i - 1][j - 1] + (seqA[i - 1] === seqB[j - 1] ? matchScore : mismatchScore);
            const del = matrix[i - 1][j] + gapPenalty;
            const insert = matrix[i][j - 1] + gapPenalty;
            matrix[i][j] = Math.max(match, del, insert);
        }
    }

    let indicesA: number[] = [];
    let indicesB: number[] = [];
    let i = seqA.length;
    let j = seqB.length;

    while (i > 0 && j > 0) {
        if (seqA[i - 1] === seqB[j - 1]) {
            indicesA.push(i - 1);
            indicesB.push(j - 1);
            i--;
            j--;
        } else if (matrix[i][j] === matrix[i - 1][j] + gapPenalty) {
            i--;
        } else {
            j--;
        }
    }

    return {
        indicesA: indicesA.reverse(),
        indicesB: indicesB.reverse()
    };
};
