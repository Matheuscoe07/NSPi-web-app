import { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

// Simula as cores disponíveis e suas respectivas imagens
const coresSuporte = [
    { cor: 'blue', imagem: require('../assets/images/teste.png') },
    { cor: 'red', imagem: require('../assets/images/teste.png') },
    { cor: 'yellow', imagem: require('../assets/images/teste.png') },
    { cor: 'green', imagem: require('../assets/images/teste.png') },
];

const coresBase = [
    { cor: 'black', imagem: require('../assets/images/teste.png') },
    { cor: 'lightgray', imagem: require('../assets/images/teste.png') },
    { cor: 'gray', imagem: require('../assets/images/teste.png') },
    { cor: 'darkgray', imagem: require('../assets/images/teste.png') },
    { cor: 'silver', imagem: require('../assets/images/teste.png') },
];

export default function Pedido() {
    const [corSuporte, setCorSuporte] = useState(coresSuporte[0]);
    const [corBase, setCorBase] = useState(coresBase[0]);

    const handleFeito = () => {
        // Aqui futuramente você chama o backend
        console.log('Pedido enviado:', {
        suporte: corSuporte.cor,
        base: corBase.cor,
        });
        router.push('/confirmado');
    };

    return ( 
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>MONTANDO O SEU EQUIPAMENTO</Text>

        <View style={styles.secao}>
            <Text style={styles.subtitulo}>ESCOLHA A COR DO SEU SUPORTE</Text>
            <View style={styles.opcoes}>
            <View style={styles.cores}>
                {coresSuporte.map((item, index) => (
                <Pressable
                    key={index}
                    onPress={() => setCorSuporte(item)}
                    style={[styles.bolinha, { backgroundColor: item.cor, borderWidth: corSuporte.cor === item.cor ? 2 : 0 }]}
                />
                ))}
            </View>
            <Image source={corSuporte.imagem} style={styles.imagem} resizeMode="contain" />
            </View>
        </View>

        <View style={styles.secao}>
            <Text style={styles.subtitulo}>ESCOLHA A COR DA SUA BASE</Text>
            <View style={styles.opcoes}>
            <View style={styles.cores}>
                {coresBase.map((item, index) => (
                <Pressable
                    key={index}
                    onPress={() => setCorBase(item)}
                    style={[styles.bolinha, { backgroundColor: item.cor, borderWidth: corBase.cor === item.cor ? 2 : 0 }]}
                />
                ))}
            </View>
            <Image source={corBase.imagem} style={styles.imagem} resizeMode="contain" />
            </View>
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleFeito}>
            <Text style={styles.botaoTexto}>Feito!</Text>
        </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    content: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    secao: {
        width: '100%',
        marginVertical: 16,
    },
    subtitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    opcoes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cores: {
        flexDirection: 'column',
        gap: 10,
    },
    bolinha: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderColor: 'black',
    },
    imagem: {
        width: 200,
        height: 150,
    },
    botao: {
        backgroundColor: '#cce6ff',
        padding: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
        marginTop: 24,
    },
    botaoTexto: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
});