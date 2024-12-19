# Установим образ Node.js
FROM node:16

# Установим рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальные файлы
COPY . .

# Сборка проекта
RUN npm run build

# Открываем порт для сервера
EXPOSE 80

# Запуск
CMD ["npm", "run", "serve"]
