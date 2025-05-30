import { View, Text, Image, Pressable, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Link, router } from 'expo-router';

const isUserLoggedIn = false;
const screenWidth = Dimensions.get('window').width;

export default function Home() {
    const handleCreateNow = () => {
        if (isUserLoggedIn) {
            router.push('/pedido');
        } else {
            router.push('/login');
    }
};

const isSmallScreen = screenWidth < 600;

return (
    <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <View style={styles.authButtons}>
            <Link href="/login"><Text style={styles.link}>Entrar</Text></Link>
            <Link href="/registrar"><Text style={styles.registerButton}>Registrar</Text></Link>
        </View>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
        <Text style={styles.title}>Núcleo de Sistemas Produtivos Inteligentes</Text>
        <Text style={styles.description}>
            O Centro de Pesquisa em Soluções Inovadoras para Sistemas Produtivos Inteligentes tem como missão
            fundamental a investigação científica, o desenvolvimento tecnológico e a aplicação prática de conhecimentos
            voltados à transformação dos sistemas produtivos tradicionais em estruturas inteligentes, adaptáveis e sustentáveis.
        </Text>
        <Pressable style={styles.ctaButton} onPress={handleCreateNow}>
            <Text style={styles.ctaText}>Crie o seu agora mesmo!</Text>
        </Pressable>
        </View>

        {/* Produtos */}
        <View style={styles.productsSection}>
        <Text style={styles.productsTitle}>Conheça nossos produtos manufaturados</Text>
        <View style={[styles.productRow, isSmallScreen && styles.productColumn]}>
            <Text style={styles.productText}>
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa{'\n'}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </Text>
            <Image
            source={require('../assets/images/teste.png')}
            style={[
                styles.productImage,
                isSmallScreen && { width: '100%', height: 200 },
            ]}
            />
        </View>
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        padding: 16,
        paddingTop: 48,
        backgroundColor: '#003b61',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: { width: 60, height: 60, resizeMode: 'contain' },
    authButtons: { flexDirection: 'row', gap: 12 },
    link: { color: 'white', fontSize: 16 },
    registerButton: {
        backgroundColor: '#0a4c82',
        color: 'white',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
        overflow: 'hidden',
    },
    hero: {
        padding: 24,
        backgroundColor: '#003b61',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 24,
    },
    ctaButton: {
        backgroundColor: '#89c9ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#003b61',
    },
    ctaText: { fontWeight: 'bold', fontSize: 16 },
    productsSection: { padding: 24 },
    productsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
        borderBottomWidth: 1,
        paddingBottom: 4,
    },
    productRow: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 16,
        alignItems: 'center',
    },
    productColumn: {
        flexDirection: 'column',
    },
    productText: {
        flex: 1,
        fontSize: 14,
        textAlign: 'justify',
    },
    productImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});