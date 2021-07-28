class BrickResolver {
    constructor (matrix, brickSize = 32) {
        this.matrix = matrix;
        this.brickSize = brickSize;
    }

    toIndex (position) {
        return Math.floor(position / this.brickSize);
    }

    toIndexRange (position1, position2) {
        const maxPosition = Math.ceil(position2 / this.brickSize) * this.brickSize;
        const range = [];

        let currentPosition = position1;

        do {
            range.push(this.toIndex(currentPosition))
            currentPosition += this.brickSize;
        } while (currentPosition < maxPosition);

        return range;
    }

    getByIndex (xIndex, yIndex) {
        const brick = this.matrix.getMatrix(xIndex, yIndex);
        if (brick) {
            const x1 = xIndex * this.brickSize;
            const x2 = x1 + this.brickSize;
            const y1 = yIndex * this.brickSize;
            const y2 = y1 + this.brickSize;
            return {
                brick,
                x1,
                x2,
                y1,
                y2
            };
        }
    }

    searchByPosition (xPosition, yPosition) {
        return this.getByIndex(this.toIndex(xPosition), this.toIndex(yPosition));
    }


    searchByRange (x1, x2, y1, y2) {
        const matches = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);

                if (match) {
                    matches.push(match)
                }
            });
        });

        return matches;
    } 
}


export default BrickResolver;