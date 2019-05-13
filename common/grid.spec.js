const Grid = require('./grid');

describe('neighborhood', () => {
  it('returns 0 if the grid is empty', function () {
    const grid = new Grid(3, 3);
    expect(grid.getAliveNeighbors(0, 0, grid)).toBe(0);
  });

  it('returns 1 when the cell selected has 1 alive neighbor', function () {
    const grid = new Grid(3, 3);
    grid.cells[0][1] = true;

    expect(grid.getAliveNeighbors(0, 0, grid)).toBe(1);
  });

  it('returns 3 when the cell selected has 3 alive neighbors', function () {
    const grid = new Grid(3, 3);
    grid.cells[0][1] = true;
    grid.cells[2][0] = true;
    grid.cells[2][2] = true;

    expect(grid.getAliveNeighbors(1, 1, grid)).toBe(3);
  });

  it('returns 8 when all neighbors are alive', function () {
    const grid = new Grid(5, 3);

    grid.cells[0][0] = true;
    grid.cells[0][1] = true;
    grid.cells[0][2] = true;

    grid.cells[1][1] = true;
    grid.cells[1][2] = true;

    grid.cells[2][0] = true;
    grid.cells[2][1] = true;
    grid.cells[2][2] = true;

    expect(grid.getAliveNeighbors(1, 0, grid)).toBe(8);
  });

});
