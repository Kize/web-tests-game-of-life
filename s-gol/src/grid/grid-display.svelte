<script>
  import Grid from '../../../common/grid';
  import { isPausedStore, widthStore, heightStore, randomizeEventsSubject } from './grid-store'

  export let width = 1;
  export let height = 1;

  let isPaused = false;

  let displayedGrid = new Grid(width, height);
  displayedGrid.randomize();

  isPausedStore.subscribe(is => {
    isPaused = is;
  });

  function updateDisplayedGrid(grid) {
    displayedGrid = grid;
  }

  function onClickCell() {
    const row = parseInt(this.getAttribute('datarow'));
    const col = parseInt(this.getAttribute('datacol'));

    displayedGrid.cells[row][col] = !displayedGrid.cells[row][col];
  }

  widthStore.subscribe(newWidth => {
    width = newWidth;
    updateDisplayedGrid(displayedGrid.cloneGridWithNewDimensions(width, height));
  });

  heightStore.subscribe(newHeight => {
    height = newHeight;
    updateDisplayedGrid(displayedGrid.cloneGridWithNewDimensions(width, height));
  });

  randomizeEventsSubject.subscribe(() => {
    const nextrid = new Grid(width, height);
    nextrid.randomize();
    updateDisplayedGrid(nextrid);
  });

  window.setInterval(() => {
    if (!isPaused) {
      updateDisplayedGrid(displayedGrid.nextGrid());
    }
  }, 10);

</script>

<style>
  .row {
    display: inline-block;
  }

  .cell {
    padding: 2px;
  }

  .cell-alive {
    background-color: #dddddd;
  }

  .cell-dead {
    background-color: #333333;
  }
</style>

<div>
  {#each displayedGrid.cells as row, cRow}
  <div class="row">
    {#each row as cell, cCol}
    <div class="cell {cell ? 'cell-alive' : 'cell-dead'}" on:click={onClickCell} dataRow={cRow} dataCol={cCol}>
    </div>
    {/each}
  </div>
  {/each}
</div>
