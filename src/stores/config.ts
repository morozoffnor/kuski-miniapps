import { writable } from 'svelte/store';

export let config = writable({
})

export type Config = {
	BOTAPI_HOST: string,
	BOTAPI_PORT: string,
	BOTAPI_TOKEN: string,
	ENV: string,
}