<script>
  import { get } from 'svelte/store';
  import { isPausedStore, widthStore, heightStore, randomizeEventsSubject } from '../grid/grid-store';

  function onClickPause() {
    isPausedStore.update(is => !is)
  }

  function onClickRandomize() {
    randomizeEventsSubject.next();
  }

  function onChangeWidth() {
    widthStore.set(width);
  }

  function onChangeHeight() {
    heightStore.set(height);
  }

  let isPaused = false;
  let width = get(widthStore);
  let height = get(heightStore);

  isPausedStore.subscribe(is => {
    isPaused = is;
  });
</script>

<style>
  .controls-bar {
    display: inline-block;
  }

  fieldset {
    display: inline-block;
  }
</style>

<div class="controls-bar">
  <fieldset>
    <label for="width-input">Width : {width}</label>
    <input id="width-input" type="range" bind:value={width} on:input={onChangeWidth}
           min="9" max="450" step="1">
  </fieldset>

  <fieldset>
    <label for="height-input">Height : {height}</label>
    <input id="height-input" type="range" bind:value={height} on:input={onChangeHeight}
           min="9" max="180" step="1">
  </fieldset>

  <button type="button" on:click={onClickRandomize}>
    Randomize
  </button>

  <button type="button" on:click={onClickPause}>
    {isPaused ? "resume": "stop"}
  </button>

  <span>Grid size : {width * height} cells.</span>
</div>
