import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Confirmado() {
    const voltarParaHome = () => {
        router.replace('/home'); // ou router.push('/home') se quiser manter no histórico
    };

    return (
        <View style={styles.container}>
        <Text style={styles.titulo}>Pedido criado com sucesso!</Text>
        <Text style={styles.subtitulo}>Olhe para as máquinas 👀🤖</Text>

        <TouchableOpacity style={styles.botao} onPress={voltarParaHome}>
            <Text style={styles.botaoTexto}>Voltar para Home</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
        marginBottom: 24,
    },
    botao: {
        backgroundColor: '#003b61',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});