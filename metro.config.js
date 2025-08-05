const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Adiciona suporte para arquivos .glb
config.resolver.assetExts.push('glb');
config.resolver.assetExts.push('gltf');

module.exports = config; 