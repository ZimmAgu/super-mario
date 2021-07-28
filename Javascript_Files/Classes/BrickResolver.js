class BrickResolver {
    constructor (matrix, brickSize = 32) {
        this.matrix = matrix;
        this.brickSize = brickSize;
    }

    toIndex (position) {
        return Math.floor(position / this.brickSize);
    }

    getByIndex (xIndex, yIndex) {
        const brick = this.matrix.getMatrix(xIndex, yIndex);
        if (brick) {
            const y1 = yIndex * this.brickSize;
            const y2 = y1 + this.brickSize;
            return {
                brick,
                y1,
                y2
            };
        }
    }

    matchByPosition (xPosition, yPosition) {
        return this.getByIndex(this.toIndex(xPosition), this.toIndex(yPosition));
    }
}


export default BrickResolver;