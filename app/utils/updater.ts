import axios from 'axios';
import * as Updates from 'expo-updates';

export async function checkForUpdates() {
    try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
            return true;
        }
        return false;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function downloadUpdate() {
    try {
        await Updates.fetchUpdateAsync();
        return true;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function applyUpdate() {
    try {
        await Updates.reloadAsync();
    } catch (err) {
        console.warn(err);
    }
}