import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable} boolean store. Alert.svelteの表示有無. */
const isAlertOpen = writable(false);
const alertMessage = writable("sample message");
const alertColor = writable("clear");

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


export { isAlertOpen, alertMessage, alertColor, openAlertFor };