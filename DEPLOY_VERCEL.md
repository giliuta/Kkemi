# Деплой Kkemi Design Studio на Vercel

## Архитектура деплоя

Vercel поддерживает только фронтенд. Для полного деплоя нужны 2 сервиса:

| Компонент | Платформа | Примечание |
|-----------|-----------|------------|
| Frontend (React) | **Vercel** | Основной сайт |
| Backend (FastAPI) | **Railway / Render / Fly.io** | API для контактной формы |
| MongoDB | **MongoDB Atlas** | Бесплатный тир M0 |

---

## Шаг 1: MongoDB Atlas (бесплатно)

1. Зайдите на [cloud.mongodb.com](https://cloud.mongodb.com)
2. Создайте бесплатный кластер (M0)
3. Создайте пользователя БД
4. Добавьте `0.0.0.0/0` в Network Access (Allow from anywhere)
5. Скопируйте Connection String:
   ```
   mongodb+srv://user:password@cluster.mongodb.net/kkemi_db
   ```

---

## Шаг 2: Backend на Railway (рекомендуется)

1. Зайдите на [railway.app](https://railway.app)
2. New Project → Deploy from GitHub (или загрузите папку `backend/`)
3. Добавьте переменные окружения:
   ```
   MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/kkemi_db
   DB_NAME=kkemi_db
   CORS_ORIGINS=https://your-domain.vercel.app
   ```
4. Railway автоматически определит FastAPI и запустит через uvicorn
5. Создайте файл `Procfile` в папке backend:
   ```
   web: uvicorn server:app --host 0.0.0.0 --port $PORT
   ```
6. Запишите URL бэкенда: `https://your-backend.railway.app`

---

## Шаг 3: Frontend на Vercel

### Вариант A: Через GitHub

1. Загрузите папку `frontend/` в GitHub репозиторий
2. Зайдите на [vercel.com](https://vercel.com) → New Project
3. Импортируйте репозиторий
4. Настройки:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend` (если загрузили весь проект)
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`
5. Переменные окружения:
   ```
   REACT_APP_BACKEND_URL=https://your-backend.railway.app
   ```
6. Deploy!

### Вариант B: Через Vercel CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# В папке frontend/
cd frontend
vercel login
vercel

# При первом деплое укажите:
# - Build Command: yarn build
# - Output Directory: build
# - Install Command: yarn install

# Добавьте env переменную
vercel env add REACT_APP_BACKEND_URL
# Введите URL бэкенда
```

---

## Шаг 4: Кастомный домен (опционально)

1. В Vercel Dashboard → Settings → Domains
2. Добавьте ваш домен (например, `kkemi.com.cy`)
3. Настройте DNS записи:
   - A запись: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
4. Обновите CORS_ORIGINS на бэкенде:
   ```
   CORS_ORIGINS=https://kkemi.com.cy,https://www.kkemi.com.cy
   ```

---

## Структура файлов для деплоя

```
frontend/           ← деплоится на Vercel
├── public/
│   ├── index.html
│   ├── favicon.svg
│   ├── favicon.png
│   └── favicon-32.png
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── components/
│   ├── context/
│   └── i18n/
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── craco.config.js

backend/            ← деплоится на Railway/Render
├── server.py
├── requirements.txt
└── .env (НЕ загружать — настроить через панель хостинга)
```

---

## Важно

- **НЕ** загружайте `.env` файлы в репозиторий — используйте панели хостингов
- Убедитесь что `REACT_APP_BACKEND_URL` указывает на правильный URL бэкенда
- На бэкенде `CORS_ORIGINS` должен содержать домен фронтенда
