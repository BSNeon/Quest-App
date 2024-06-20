import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Switch, Modal, ScrollView, ActivityIndicator } from "react-native";
import * as Logger from "./utils/logger";
export default function Loading() {
    let logger = Logger.getLogger();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>This is a placeholder used to test updates</Text>
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
        padding: 20,
        backgroundColor: "#212121",
        borderRadius: 10,
    },
    title: {
        fontSize: 27,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
    },
});
