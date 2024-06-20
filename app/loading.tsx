import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Switch, Modal, ScrollView, ActivityIndicator } from "react-native";
import * as Logger from "./utils/logger";
import * as updater from "./utils/updater";
import { useNavigation } from "@react-navigation/native";

export default function Loading() {
    const [showLogs, setShowLogs] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    Logger.getLogger().subscribe((logs) => {
        setLogs(logs.map((log) => `${log.timestamp}: ${log.message}`));
    });

    let logger = Logger.getLogger();

    const navigation = useNavigation();

    useEffect(() => {
        if(!loading) return;
        logger.log("Starting the app... 🚀");
        logger.log("Checking for updates...");
        
        const checkForUpdates = async () => {
            const updateAvailable = await updater.checkForUpdates();
            if (updateAvailable) {
                logger.log("Update available, downloading...");
                const downloadSuccess = await updater.downloadUpdate();
                if (downloadSuccess) {
                    logger.log("Update downloaded, applying...");
                    await updater.applyUpdate();
                } else {
                    logger.log("Failed to download the update.");
                }
            } else {
                logger.log("No updates available.");
            }
            setLoading(false);
        };

        checkForUpdates().then(() => {
            setTimeout(() => {
                logger.log("App started successfully.");
                logger.log("Welcome to Neon! 🎉");

                setTimeout(() => {
                    navigation.navigate("gameselection");
                }, 500);
            }, 2000);
        });

        setLoading(false);
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    logText: {
        fontSize: 14,
        color: "#FFF",
        marginBottom: 5,
    },
});
