Проект был реализован в двух версиях: с написанным сервером для отдачи данных (ветка main) и без него (ветка serverless).

# Инструкция по запуску проекта c локальным сервером (backend)

1. Cклонировать репозиторий:

```bash
git clone https://github.com/GerlakhA/vk-test-group.git && cd vk-test-group
```

2. Перейти в папку с фронтендом:

```bash
cd vkTestGroup
```

3. Установить все зависимости для react-приложения:

```bash
npm i
```

4. Запустить react-приложение через команду:

```bash
npm run dev
```

5. Перейти в папку с сервером:

```bash
cd vk-test-group-backend
```

6. Установить все зависимости для сервера:

```bash
 npm i
```

7. Запустить сервер через команду:

```bash
 npm start
```

# Инструкция по запуску проекта c моками (из groups.json) без сервера

Инструкция по запуску react-приложения с моками из исходного файла groups.json без поднятния локального сервера описана в README.md на ветке [serverless](https://github.com/GerlakhA/vk-test-group/tree/serverless).
