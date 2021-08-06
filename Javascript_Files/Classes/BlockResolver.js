"use strict";
class BlockResolver {
    constructor (matrix, blockSize = 32) {
        this.matrix = matrix;
        this.blockSize = blockSize;
    }

    toIndex (position) {
        return Math.floor(position / this.blockSize);
    }

    toIndexRange (position1, position2) {
        const maxPosition = Math.ceil(position2 / this.blockSize) * this.blockSize;
        const range = [];

        let currentPosition = position1;

        do {
            range.push(this.toIndex(currentPosition))
            currentPosition += this.blockSize;
        } while (currentPosition < maxPosition);

        return range;
    }

    getByIndex (xIndex, yIndex) {
        const block = this.matrix.getMatrix(xIndex, yIndex);
        if (block) {
            const x1 = xIndex * this.blockSize;
            const x2 = x1 + this.blockSize;
            const y1 = yIndex * this.blockSize;
            const y2 = y1 + this.blockSize;
            return {
                block,
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


export default BlockResolver;