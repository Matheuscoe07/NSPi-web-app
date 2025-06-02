import { View, Text, Image, Pressable, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { Link, router } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const isSmallScreen = screenWidth < 600;
const isUserLoggedIn = false;

export default function Home() {
    const handleCreateNow = () => {
        if (isUserLoggedIn) {
            router.push('/pedido');
        } else {
            router.push('/login');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Image source={require('../assets/images/logo2.png')} style={styles.logo} />
                    <View style={styles.authButtons}>
                        <Link href="/login">
                            <Text style={styles.link}>Entrar</Text>
                        </Link>

                        <Link href="/registrar" asChild>
                            <Pressable style={styles.registerButton}>
                                <Text style={styles.registerButtonText}>Registrar</Text>
                            </Pressable>
                        </Link>
                    </View>
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

                {/* Produtos */}
                <View style={styles.productsSection}>
                    <Text style={[styles.productsTitle, isSmallScreen && { textAlign: 'center' }]}>
                        Conheça nossos produtos manufaturados
                    </Text>
                    <View style={[styles.productRow, isSmallScreen && styles.productColumn]}>
                        <Text style={[styles.productText, isSmallScreen && { textAlign: 'center' }]}>
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa{'\n'}
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
    authButtons: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    link: {
        color: '#0a4c82',
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: '#0a4c82',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    hero: {
        padding: 24,
        backgroundColor: '#003b61',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 24,
    },
    description: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
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
        fontSize: 16,
    },
    productsSection: {
        padding: 24,
    },
    productsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'left',
        borderBottomWidth: 1,
        paddingBottom: 8,
    },
    productRow: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 16,
        alignItems: 'flex-start',
    },
    productColumn: {
        flexDirection: 'column',
    },
    productText: {
        flex: 1,
        fontSize: 14,
        textAlign: 'left',
    },
    productImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});