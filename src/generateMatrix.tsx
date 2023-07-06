export function generateMatrix(n: number, m: number): (null | number)[][] {
    const matrix: (null | number)[][] = [];

    for (let i = 0; i < n; i++) {
        const row: (null | number)[] = [];

        for (let j = 0; j < m; j++) {
            row.push(null);
        }

        matrix.push(row);
    }

    return matrix;
}
