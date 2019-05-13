import { writable } from 'svelte/store';
import { ReplaySubject } from "rxjs";

export const isPausedStore = writable(true);

export const widthStore = writable(300);

export const heightStore = writable(100);

export const randomizeEventsSubject = new ReplaySubject();
