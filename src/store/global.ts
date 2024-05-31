import { atom } from 'nanostores';
import { getStoreValueFromLocalStorage } from 'store/utils';
import { Global } from 'types/types';

export const $global = atom<Global>(getStoreValueFromLocalStorage('global'));

export function updateGlobal(global: Global) {
    $global.set({
        ...$global.get(),
        ...global,
    });
}

$global.listen((global) => {
    const serializedSettings = JSON.stringify(global);
    localStorage.setItem('global', serializedSettings);
});
