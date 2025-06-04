console.log('⚠️ Tela de registro carregada');

import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '../src/services/supabase';
import bcrypt from 'bcryptjs';

export default function RegisterScreen() {
  console.warn('🚀 Tela registrar MONTADA');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    console.log('🔥 handleRegister chamado');
    console.log('Botão foi clicado!');

    if (!nome || !sobrenome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const senha_hash = bcrypt.hashSync(senha, 10);
    const data_cadastro = new Date().toISOString();

    const { error } = await supabase.from('usuarios').insert([
      {
        nome,
        sobrenome,
        email,
        senha_hash,
        data_cadastro,
        tipo_usuario: 'aluno',
      },
    ]);

    if (error) {
      console.error('Erro ao registrar:', error);
      Alert.alert('Erro', 'Não foi possível registrar. Verifique os dados.');
      return;
    }

    Alert.alert('Sucesso', 'Registro realizado com sucesso!');
    router.replace('/login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Registrar</Text>

      <View style={styles.formWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={sobrenome}
          onChangeText={setSobrenome}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        
        <TouchableOpacity
  style={styles.button}
  onPress={() => {
    console.log('🟢 Botão (TouchableOpacity) clicado');
    handleRegister();
  }}
>
  <Text style={styles.buttonText}>Registrar</Text>
</TouchableOpacity>


        <Text style={styles.loginPrompt}>
          Já tem uma conta?{' '}
          <Link href="/login">
            <Text style={styles.loginLink}>Entrar</Text>
          </Link>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 48,
    marginBottom: 24,
    textAlign: 'center',
  },
  formWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#003b61',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginPrompt: {
    textAlign: 'center',
    fontSize: 14,
  },
  loginLink: {
    color: '#003b61',
    fontWeight: 'bold',
  },

  
});
