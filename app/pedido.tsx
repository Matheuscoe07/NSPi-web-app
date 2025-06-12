import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { criarPedidoSimples } from '../src/lib/criarPedido';

// Tipo para itens de cor que pode ser string (cor) ou imagem
// Agora com id para uso no backend
type CorItem = {
    id: number;
    cor: string | any;
    imagem: any;
};

const coresSuporte: CorItem[] = [
    { id: 1, cor: 'blue', imagem: require('../assets/images/teste.png') },
    { id: 2, cor: 'red', imagem: require('../assets/images/teste.png') },
    { id: 3, cor: 'yellow', imagem: require('../assets/images/teste.png') },
    { id: 4, cor: 'green', imagem: require('../assets/images/teste.png') },
];

const coresBase: CorItem[] = [
    { id: 5, cor: 'black', imagem: require('../assets/images/teste.png') },
    { id: 6, cor: 'lightgray', imagem: require('../assets/images/teste.png') },
    { id: 7, cor: 'gray', imagem: require('../assets/images/teste.png') },
    { id: 8, cor: 'darkgray', imagem: require('../assets/images/teste.png') },
    { id: 9, cor: 'white', imagem: require('../assets/images/teste.png') },
    { id: 10, cor: require('../assets/images/transparente.png'), imagem: require('../assets/images/teste.png') },
];

export default function Pedido() {
    const [corSuporte, setCorSuporte] = useState<CorItem>(coresSuporte[0]);
    const [corBase, setCorBase] = useState<CorItem>(coresBase[0]);

    const handleFeito = async () => {
        const usuarioIdString = await AsyncStorage.getItem('usuario_id');
        const id_usuario = usuarioIdString ? parseInt(usuarioIdString, 10) : null;

        if (!id_usuario) {
        Alert.alert('Erro', 'Usuário não identificado. Faça login novamente.');
        return;
        }

        const nome_customizado = `Suporte ${corSuporte.cor} + Base ${corBase.cor}`;
        const result = await criarPedidoSimples({
        id_usuario,
        id_base: corBase.id,
        id_suporte: corSuporte.id,
        nome_customizado,
        });

        if (result.error) {
        Alert.alert('Erro', result.error);
        } else {
        router.push('/confirmado');
        }
    };

    const renderCores = (
        lista: CorItem[],
        selecionado: CorItem,
        setSelecionado: (item: CorItem) => void
    ) => (
        <View style={styles.listaCores}>
        {lista.map((item, index) => {
            const isSelecionado = selecionado.cor === item.cor;
            return (
            <Pressable
                key={index}
                onPress={() => setSelecionado(item)}
                style={[styles.bolinhaWrapper, isSelecionado && styles.selecionado]}
            >
                {typeof item.cor === 'string' ? (
                <View style={[styles.bolinha, { backgroundColor: item.cor }]} />
                ) : (
                <View style={styles.bolinha}>
                    <Image source={item.cor} style={styles.bolinhaImagem} />
                </View>
                )}
            </Pressable>
            );
        })}
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>MONTANDO O SEU EQUIPAMENTO</Text>

        <View style={styles.secao}>
            <Text style={styles.subtitulo}>ESCOLHA A COR DO SEU SUPORTE</Text>
            <View style={styles.opcoes}>
            {renderCores(coresSuporte, corSuporte, setCorSuporte)}
            <Image source={corSuporte.imagem} style={styles.imagem} resizeMode="contain" />
            </View>
        </View>

        <View style={styles.secao}>
            <Text style={styles.subtitulo}>ESCOLHA A COR DA SUA BASE</Text>
            <View style={styles.opcoes}>
            {renderCores(coresBase, corBase, setCorBase)}
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
        justifyContent: 'flex-start',
        gap: 20,
    },
    listaCores: {
        flexDirection: 'column',
        gap: 10,
    },
    bolinhaWrapper: {
        padding: 2,
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 2,
    },
    selecionado: {
        borderColor: '#000',
        borderWidth: 3,
    },
    bolinha: {
        width: 24,
        height: 24,
        borderRadius: 12,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bolinhaImagem: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imagem: {
        width: 180,
        height: 140,
        marginLeft: 16,
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
