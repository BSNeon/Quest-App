import React, { useState, useEffect } from "react";

export type Log = {
    message: string;
    timestamp: string;
};

class Logger {
    private logs: Log[] = [];
    private listeners: ((logs: Log[]) => void)[] = [];

    constructor() {
    }

    public log(message: string) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = { message, timestamp };
        this.logs.push(logEntry);
        this.notifyListeners();
    }

    public clear() {
        this.logs = [];
        this.notifyListeners();
    }

    public getLogs() {
        return this.logs;
    }

    public subscribe(listener: (logs: Log[]) => void) {
        this.listeners.push(listener);
    }

    public unsubscribe(listener: (logs: Log[]) => void) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    private notifyListeners() {
        this.listeners.forEach((listener) => listener(this.logs));
    }
}

let logger: Logger;

export function getLogger() {
    if (!logger) {
        logger = new Logger();
    }
    return logger;
}
