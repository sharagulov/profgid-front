const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9010, // Укажите нужный порт
    host: '0.0.0.0', // Позволяет доступ с других устройств в локальной сети
    hot: true, // Включает HMR
    liveReload: true,
    client: {
      webSocketURL: {
        hostname: 'localhost', // Внешний IP-адрес сервера
        port: 9010, // Проброшенный порт для WebSocket
        protocol: 'ws' // Используем WebSocket (ws)
      }
    },
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'], // Пути для наблюдения
      options: {
        usePolling: true // Включает polling
      }
    }
  }
})

// client: {
//   webSocketURL: {
//     hostname: '5.149.150.126', // Внешний IP-адрес сервера
//     port: 61288, // Проброшенный порт для WebSocket
//     protocol: 'ws' // Используем WebSocket (ws)
//   }
// },
