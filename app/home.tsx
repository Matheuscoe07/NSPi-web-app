import { View, Text, Image, Pressable, StyleSheet, ScrollView, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

const screenWidth = Dimensions.get('window').width;
const isSmallScreen = screenWidth < 600;

const bases = [
    { id: '1', nome: 'Base Transparente', imagem: require('../assets/images/ba_transparente.png') },
    { id: '2', nome: 'Base Branca', imagem: require('../assets/images/ba_branco.png') },
    { id: '3', nome: 'Base Cinza Clara', imagem: require('../assets/images/ba_cinzaCA.png') },
    { id: '4', nome: 'Base Cinza Escura', imagem: require('../assets/images/ba_cinzaES.png') },
    { id: '5', nome: 'Base Preta', imagem: require('../assets/images/ba_preto.png') },
];

const suportes = [
    { id: '1', nome: 'Suporte Amarelo', imagem: require('../assets/images/sup_amarelo.png') },
    { id: '2', nome: 'Suporte Azul', imagem: require('../assets/images/sup_azul.png') },
    { id: '3', nome: 'Suporte Verde', imagem: require('../assets/images/sup_verde.png') },
    { id: '4', nome: 'Suporte Vermelho', imagem: require('../assets/images/sup_vermelho.png') },
];

export default function Home() {
    const handleCreateNow = () => {
        // Redireciona diretamente para a página de pedidos ou outra página relevante
        router.push('/pedido');  // Atualize se necessário
    };

   const renderItem = ({ item }: any) => (
       <View style={styles.catalogItem}>
           <View style={styles.imageWrapper}>
               <Image
                   source={item.imagem}
                   style={styles.catalogImage}
                   resizeMode="cover" // "cover" para preencher a área com arredondamento
               />
           </View>
           <Text style={styles.catalogTitle}>{item.nome}</Text>
       </View>
   );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Image source={require('../assets/images/logo2.png')} style={styles.logo} />
                </View>

                {/* Hero Section */}
                <View style={styles.hero}>
                    <Text style={[styles.title, isSmallScreen && { textAlign: 'center', alignSelf: 'center' }]}>
                        Núcleo de Sistemas Produtivos Inteligentes
                    </Text>
                    <Text style={[styles.description, isSmallScreen && { textAlign: 'center' }]}>
                        O Centro de Pesquisa em Soluções Inovadoras para Sistemas Produtivos Inteligentes tem como missão
                        fundamental a investigação científica, o desenvolvimento tecnológico e a aplicação prática de conhecimentos
                        voltados à transformação dos sistemas produtivos tradicionais em estruturas inteligentes, adaptáveis e sustentáveis.
                    </Text>
                    <Pressable style={styles.ctaButtonWrapper} onPress={handleCreateNow}>
                        <View style={styles.ctaButton}>
                            <Text style={styles.ctaText}>Crie o seu agora mesmo!</Text>
                        </View>
                    </Pressable>
                </View>

                {/* Catálogo de produtos */}
                <View style={styles.productsSection}>
                    <Text style={styles.productsTitle}>Conheça nossos produtos manufaturados</Text>

                    <Text style={styles.catalogHeader}>Suportes</Text>
                    <FlatList
                        data={suportes}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.catalogList}
                    />

                    <Text style={styles.catalogHeader}>Bases</Text>
                    <FlatList
                        data={bases}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.catalogList}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        padding: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 64,
        height: 64,
        resizeMode: 'contain',
    },
    hero: {
        padding: 24,
        backgroundColor: '#003b61',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: isSmallScreen ? 32 : 42,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 24,
    },
    description: {
        fontSize: isSmallScreen ? 16 : 20,
        color: 'white',
        marginBottom: 24,
    },
    ctaButtonWrapper: {
        alignSelf: 'center',
        marginTop: 8,
    },
    ctaButton: {
        backgroundColor: '#89c9ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    ctaText: {
        fontWeight: 'bold',
        fontSize: isSmallScreen ? 16 : 20,
    },
    productsSection: {
        padding: 24,
    },
    productsTitle: {
        fontSize: isSmallScreen ? 24 : 32,
        fontWeight: 'bold',
        marginBottom: 12,
        borderBottomWidth: 1,
        paddingBottom: 8,
    },
    catalogHeader: {
        fontSize: isSmallScreen ? 20 : 26,
        fontWeight: '600',
        marginVertical: 12,
    },
    catalogList: {
        paddingBottom: 16,
    },
    
    catalogItem: {
        marginRight: 16,
        alignItems: 'center',
        width: isSmallScreen ? 160 : 220,
    },

    imageWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    width: isSmallScreen ? 160 : 220,
    height: isSmallScreen ? 90 : 140,
    backgroundColor: '#fff',
    },

    catalogImage: {
        width: '100%',
        height: '100%',
    },
    
    catalogTitle: {
        marginTop: 6,
        fontSize: isSmallScreen ? 14 : 18,
        textAlign: 'center',
    },
});
