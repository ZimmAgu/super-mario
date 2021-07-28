class Matrix {
    constructor () {
        this.grid = [];
    }

    setMatrix (column, row, value) {
        if (!this.grid[column]) {   // If there is no value in a certain column of our grid
            this.grid[column] = []; // Then a new array is created that will contain all of the rows in that column 
        }

        this.grid[column][row] = value; // A value is places in the specific row
    }

    getMatrix (column, row) {
        const matrixColumn = this.grid[column];

        if (matrixColumn) {             // If the current column has a matrix
            return matrixColumn[row];   // Return the value in the specified row
        } else {
            return undefined;
        }
    }


    clear () {
        this.grid.length = 0;
    }
}


export default Matrix;