import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TelaOperador() {
    return (
        <View style={styles.container}>
        <Text style={styles.texto}>Bem-vindo à tela de operador</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#003b61',
        textAlign: 'center',
    },
});