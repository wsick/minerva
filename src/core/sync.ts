module minerva.core {
    export interface ISyncer<T> {
        (src: T, dest: T);
    }
    export function sync<T> (updater: Updater, name: string, newValue: any, syncer?: ISyncer<T>) {
        if (syncer)
            syncer(newValue, updater.assets[name]);
        else
            updater.assets[name] = newValue;
    }
}