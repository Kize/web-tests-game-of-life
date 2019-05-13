<script>
  import Grid from './grid/grid-display.svelte';
  import Controls from './controls/controls.svelte';
	export let projectType;

	const toto = Grid || Controls;
</script>

<style>
  .title-container {
    display: inline-block;
  }

	h3 {
		color: purple;
	}
</style>

<div class="app">
  <div class="title-container">
    <h1>Game Of Life ! </h1>
    <h3><i>{projectType} version</i></h3>
  </div>

  <Controls></Controls>

  <Grid></Grid>
</div>
