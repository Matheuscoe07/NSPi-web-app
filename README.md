# NSPi App Web

Aplicativo e site conectados a um processo de manufatura avançada desenvolvido pelo Núcleo de Sistemas Produtivos Inteligentes (NSPi) do Instituto Mauá de Tecnologia. O sistema permite que o usuário selecione peças e personalize suportes para celulares e tablets, que são montados fisicamente por uma linha de produção inteligente.

## 🚀 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo Router](https://expo.dev/router)
- [Supabase](https://supabase.com/) (backend e banco de dados)
- [Node.js / Python](https://nodejs.org/) (servidores de integração industrial)
- SQL (banco relacional hospedado no Supabase)

## 🧰 Funcionalidades

- Cadastro e login de usuários
- Escolha e personalização de peças
- Gravação personalizada (nome, imagem, etc.)
- Acompanhamento em tempo real do status do pedido
- Visualização de histórico de pedidos
- Integração futura com gravadora a laser e puncionadeira

## 📱 Navegação de Páginas

| Página               | Caminho         | Descrição                             |
|----------------------|------------------|-----------------------------------------|
| Página Inicial       | `/`              | Apresentação institucional + CTA       |
| Login                | `/login`         | Autenticação de usuários                |
| Registrar            | `/registrar`     | Cadastro de novos usuários              |
| Personalizar Produto | `/personalizar`  | Seleção e montagem de peças             |
| Pedido               | `/pedido/[id]`   | Detalhes e status do pedido             |

## 🛠️ Como rodar localmente

### Pré-requisitos:
- Node.js 18+
- Expo CLI (`npm install -g expo`)
- Git

### Instalação:

```bash
# Clone o repositório
git clone https://github.com/seuusuario/nspi-web-app.git

# Acesse a pasta do projeto
cd nspi-web-app

# Instale as dependências
npm install

# Rode o app
npx expo start
