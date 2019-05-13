class Grid {
  constructor(width = 3, height = 3) {
    this.width = width;
    this.height = height;

    this.cells = [];

    for (let i = 0; i < this.width; i++) {
      this.cells.push([]);
      for (let j = 0; j < this.height; j++) {
        this.cells[i].push(false);
      }
    }
  }

  cloneGridWithNewDimensions(newWidth, newHeight) {
    const clonedGrid = new Grid(newWidth, newHeight);

    clonedGrid.cells.forEach((row, currentRowNumber) => {
      row.forEach((_, currentColumnNumber) => {
        if (currentRowNumber < this.width && currentColumnNumber < this.height) {
          clonedGrid.cells[currentRowNumber][currentColumnNumber] = this.cells[currentRowNumber][currentColumnNumber];
        }
      });
    });

    return clonedGrid;
  }

  reset() {
    this.cells.forEach(row => {
      row.map(_ => false);
    });
  }

  randomize(ratio = 0.05) {
    this.reset();
    if (ratio < 0.01) ratio = 0.01;
    if (ratio > 0.5) ratio = 0.5;

    let i = 0;
    while (i < this.width * this.height * ratio) {
      const w = getRandomNumber(0, this.width - 1);
      const h = getRandomNumber(0, this.height - 1);

      if (this.cells[w][h] === false) {
        this.cells[w][h] = true;
      }
      i++;

    }
  }

  getAliveNeighbors(row, column) {
    let count = 0;

    const nbRows = this.width;
    const nbColumns = this.height;

    const rowBefore = row === 0 ? nbRows - 1 : row - 1;
    const rowAfter = row === nbRows - 1 ? 0 : row + 1;
    const columnBefore = column === 0 ? nbColumns - 1 : column - 1;
    const columnAfter = column === nbColumns - 1 ? 0 : column + 1;

    const neighbors = [
      [rowBefore, columnBefore],
      [rowBefore, column],
      [rowBefore, columnAfter],
      [row, columnBefore],
      [row, columnAfter],
      [rowAfter, columnBefore],
      [rowAfter, column],
      [rowAfter, columnAfter],
    ];

    neighbors.forEach(neighbor => {
      if (this.cells[neighbor[0]][neighbor[1]]) {
        count++;
      }
    });

    return count;
  }

  nextGrid() {
    const nextGrid = new Grid(this.width, this.height);

    this.cells.forEach((row, currentRow) => {
      row.forEach((currentCellState, currentColumn) => {
        const numberOfAliveNeighbors = this.getAliveNeighbors(currentRow, currentColumn);

        if (numberOfAliveNeighbors === 3) {
          nextGrid.cells[currentRow][currentColumn] = true;
        } else if (numberOfAliveNeighbors === 2 && currentCellState) {
          nextGrid.cells[currentRow][currentColumn] = true;
        }
      });
    });

    return nextGrid;
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = Grid;
