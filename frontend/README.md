# Kkemi Design Studio & Typography

Премиальный портфолио-сайт для дизайн-студии Kkemi (Пафос, Кипр).

## Как задеплоить на Vercel

### Шаг 1 — Загрузка на GitHub

```bash
# Создайте новый репозиторий на GitHub, затем:
cd frontend
git init
git add .
git commit -m "Kkemi Design Studio website"
git branch -M main
git remote add origin https://github.com/ВАШ_ЮЗЕРНЕЙМ/kkemi-site.git
git push -u origin main
```

> **Важно:** Загружайте именно содержимое папки `frontend/` как корень репозитория, НЕ всю папку `/app/`.

### Шаг 2 — Деплой на Vercel

1. Зайдите на [vercel.com](https://vercel.com) и войдите через GitHub
2. Нажмите **"Add New..." → "Project"**
3. Найдите и выберите ваш репозиторий `kkemi-site`
4. Vercel автоматически определит настройки. Проверьте:

| Параметр | Значение |
|---|---|
| **Framework Preset** | `Create React App` |
| **Build Command** | `CI=false craco build` *(уже в package.json)* |
| **Output Directory** | `build` |
| **Install Command** | `yarn install` |

5. Environment Variables — **ничего добавлять НЕ нужно**
6. Нажмите **"Deploy"**

Готово! Через 1-2 минуты сайт будет доступен.

### Шаг 3 — Свой домен (по желанию)

1. В Vercel: **Settings → Domains**
2. Добавьте домен (например `kkemi.com.cy`)
3. Настройте DNS у регистратора:
   - **A** запись → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`

---

## Структура проекта

```
├── public/           # Фавиконы и index.html
├── src/
│   ├── components/   # React-компоненты секций
│   ├── context/      # Контекст языка (EN/EL/RU)
│   ├── i18n/         # Переводы
│   ├── App.js        # Главный компонент
│   └── index.css     # Глобальные стили
├── package.json
├── craco.config.js   # Webpack alias (@)
├── tailwind.config.js
├── vercel.json       # SPA routing для Vercel
└── README.md
```

## Контактная форма

При отправке формы открывается WhatsApp с предзаполненным сообщением на номер +35799175772.
