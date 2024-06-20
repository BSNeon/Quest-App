import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Switch, Modal, ScrollView, ActivityIndicator } from "react-native";
import * as Logger from "./utils/logger";

export default function Loading() {
    const [showLogs, setShowLogs] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    Logger.getLogger().subscribe((logs) => {
        setLogs(logs.map((log) => `${log.timestamp}: ${log.message}`));
    });

    let logger = Logger.getLogger();

    useEffect(() => {
        logger.log("Starting the app... 🚀");
        logger.log("Checking for updates...");
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center" }}>
                    <Text style={[styles.title, styles.title1]}>Ne</Text>
                    <Text style={[styles.title, styles.title2]}>on</Text>
                    <Text style={[styles.title, styles.title3]}> is</Text>
                    <Text style={[styles.title, styles.loadingText]}> loading</Text>
                </View>
                {!showLogs && <ActivityIndicator size="large" color="#6200EE" style={styles.loadingIndicator} />}
                {showLogs && (
                    <View style={styles.logContainer}>
                        <ScrollView>
                            {logs.map((log, index) => (
                                <Text key={index} style={styles.logText}>{log}</Text>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
            <View style={styles.toggleSwitch}>
                <Text style={styles.toggleLabel}>Show Logs</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={showLogs ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setShowLogs(!showLogs)}
                    value={showLogs}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 27,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "sans-serif-thin",
        color: "#FFF",
    },
    title1: {
        color: "#0000EE",
    },
    title2: {
        color: "#FF0000",
    },
    title3: {
        color: "#00FF00",
    },
    loadingText: {
        fontSize: 27,
        fontWeight: "bold",
    },
    pulseText: {
        animationName: {
            "0%": { opacity: 0.4 },
            "50%": { opacity: 1 },
            "100%": { opacity: 0.4 },
        },
        animationDuration: "1.5s",
        animationIterationCount: "infinite",
    },
    loadingIndicator: {
        marginLeft: 5,
    },
    toggleSwitch: {
        position: "absolute",
        bottom: 20,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    toggleLabel: {
        marginRight: 10,
        color: "#FFF",
    },
    logContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 10,
        maxHeight: 200,
        maxWidth: "50%",
        width: "50%",
        minHeight: 200,
        minWidth: "50%",
    },
    logText: {
        fontSize: 14,
        color: "#FFF",
        marginBottom: 5,
    },
});
