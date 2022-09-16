type Log = any[];

type Watched = {
    [key: string]: Log,
}

type Logs = {
    watched: Watched,
    writeOnce: Log[],
};

const logs: Logs = {
    watched: {},
    writeOnce: [],
};

let oldLogs = {};

export const watch = (identifier: string, ...args: Log) => {
    logs.watched[identifier] = args;
}

export const write = (...args: Log) => {
    logs.writeOnce.push(args);
}

const watchedList = () => {
    let output = "";
    Object.keys(logs.watched).forEach(key => {
        output += `${key} -> ${logs.watched[key]}\n`;
    });
    return output;
}

const writeOnce = () => {
    let output = "";
    logs.writeOnce.forEach((log) => {
        output += `${log}`;
    });
    return output;
}

export const update = () => {
    if (JSON.stringify(logs) === JSON.stringify(oldLogs)){
        //return;
    }

    oldLogs = {...logs};
}