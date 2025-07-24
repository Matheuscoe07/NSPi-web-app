import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { criarPedidoSimples } from '../src/lib/criarPedido';

type CorItem = {
  id: number;
  cor: string | any;
  imagem: any;
};

const coresSuporte: CorItem[] = [
  { id: 1, cor: 'blue', imagem: require('../assets/images/sup_azul.png') },
  { id: 2, cor: 'red', imagem: require('../assets/images/sup_vermelho.png') },
  { id: 3, cor: 'yellow', imagem: require('../assets/images/sup_amarelo.png') },
  { id: 4, cor: 'green', imagem: require('../assets/images/sup_verde.png') },
];

const coresBase: CorItem[] = [
  { id: 5, cor: 'black', imagem: require('../assets/images/ba_preto.png') },
  { id: 6, cor: 'lightgray', imagem: require('../assets/images/ba_cinzaCA.png') },
  { id: 8, cor: 'darkgray', imagem: require('../assets/images/ba_cinzaES.png') },
  { id: 9, cor: 'white', imagem: require('../assets/images/ba_branco.png') },
  { id: 10, cor: require('../assets/images/transparente.png'), imagem: require('../assets/images/ba_transparente.png') },
];

export default function Pedido() {
  const [corSuporte, setCorSuporte] = useState<CorItem>(coresSuporte[0]);
  const [corBase, setCorBase] = useState<CorItem>(coresBase[0]);
  const [etapa, setEtapa] = useState<'suporte' | 'base'>('suporte');

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
    lista: Array<CorItem>,
    selecionado: CorItem,
    setSelecionado: React.Dispatch<React.SetStateAction<CorItem>>
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
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleFeito} style={styles.prontoBotao}>
          <Text style={styles.prontoTexto}>Pronto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.visualizacao}>
        <Image
          source={etapa === 'suporte' ? corSuporte.imagem : corBase.imagem}
          style={styles.imagem}
          resizeMode="contain"
        />
      </View>

      <View style={styles.controles}>
        <TouchableOpacity onPress={() => setEtapa(etapa === 'suporte' ? 'base' : 'suporte')}>
          <Text style={styles.seta}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.etapaTitulo}>{etapa === 'suporte' ? 'Suporte' : 'Base'}</Text>

        <TouchableOpacity onPress={() => setEtapa(etapa === 'suporte' ? 'base' : 'suporte')}>
          <Text style={styles.seta}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {etapa === 'suporte'
        ? renderCores(coresSuporte, corSuporte, setCorSuporte)
        : renderCores(coresBase, corBase, setCorBase)}
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
  },
  topBar: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 10,
  },
  prontoBotao: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
  },
  prontoTexto: {
    fontSize: 14,
  },
  visualizacao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: Platform.OS === 'web' ? width * 0.4 : width * 0.8,
    height: Platform.OS === 'web' ? width * 0.4 : width * 0.8,
  },
  controles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  etapaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seta: {
    fontSize: 24,
  },
  listaCores: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  bolinhaWrapper: {
    padding: 4,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  selecionado: {
    borderColor: '#000',
    borderWidth: 3,
  },
  bolinha: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bolinhaImagem: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});