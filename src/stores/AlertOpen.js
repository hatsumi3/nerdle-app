import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable} boolean store. Alert.svelteの表示有無. */
const isAlertOpen = writable(false);

/**
 * 表示.millisecond秒後非表示.
 *
 * @param {number} millisecond
 */
const openAlertFor = (millisecond) => {
    isAlertOpen.set(true);
    setTimeout(() => {
        isAlertOpen.set(false);
    }, millisecond);
}


export { isAlertOpen, openAlertFor };