# BlockBuilder Landing Page

Современный лендинг для npm пакета [@mushket-co/block-builder](https://www.npmjs.com/package/@mushket-co/block-builder) — библиотеки для создания блочных конструкторов с чистой архитектурой.

## 🚀 Технологии

- **Next.js 14** - React фреймворк с SSR
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **App Router** - Новая архитектура Next.js

## 📦 Установка и запуск

### Установка зависимостей

```bash
npm install
```

### Режим разработки

```bash
npm run dev
```

Откройте [http://localhost:3005](http://localhost:3005) в браузере.

### Production сборка

```bash
# Сборка
npm run build

# Запуск production версии
npm run start
```

## 🏗️ Структура проекта

```
landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Главная страница
│   │   └── globals.css      # Глобальные стили
│   └── components/
│       ├── Navigation.tsx   # Навигационное меню
│       ├── Hero.tsx         # Hero секция
│       ├── Features.tsx     # Особенности
│       ├── CodeExamples.tsx # Примеры кода
│       ├── Architecture.tsx # Архитектура
│       ├── Installation.tsx # Установка
│       └── Footer.tsx       # Подвал
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Возможности

- ✅ **Server-Side Rendering (SSR)** - Быстрая загрузка и SEO
- ✅ **Адаптивный дизайн** - Отлично выглядит на всех устройствах
- ✅ **Темная тема** - Автоматическое переключение
- ✅ **Анимации появления** - Fade in, Zoom in, Scale up
- ✅ **Параллакс эффекты** - Интерактивные элементы при скролле
- ✅ **IntersectionObserver** - Оптимизированные анимации
- ✅ **Hover эффекты** - Интерактивные элементы
- ✅ **Оптимизация производительности** - Быстрая загрузка
- ✅ **SEO оптимизация** - Meta-теги и структура

## 📝 Секции лендинга

1. **Hero** - Главная секция с призывом к действию
   - Анимированный фон с плавающими элементами
   - Постепенное появление контента
   - Интерактивные бейджи с hover эффектами

2. **Features** - Ключевые возможности библиотеки (9 карточек)
   - Разнообразные анимации появления (Fade in, Zoom in)
   - Последовательное появление с задержкой
   - Hover эффекты со scale трансформацией

3. **Code Examples** - Интерактивные примеры кода
   - Табы с примерами (Vue 3, React, API-only)
   - Анимация scale для блока кода
   - Hover эффекты на карточках

4. **Architecture** - Описание архитектуры проекта
   - Анимация слева-направо для слоев
   - Параллакс эффект на диаграмме
   - Zoom анимация для статистики

5. **Installation** - Инструкции по установке
   - Анимированные шаги установки
   - Copy-to-clipboard функциональность
   - Hover эффекты на ресурсах

6. **Footer** - Подвал с ссылками
   - Ссылки на GitHub, документацию, примеры

## 🎯 Deployment

### Vercel (рекомендуется)

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel
```

### Другие платформы

Проект поддерживает деплой на любую платформу, поддерживающую Next.js:
- Netlify
- Railway
- Docker
- AWS
- Google Cloud

## 🔧 Настройка

### Изменение порта

По умолчанию используется порт `3005`. Чтобы изменить:

```json
// package.json
"scripts": {
  "dev": "next dev -p YOUR_PORT",
  "start": "next start -p YOUR_PORT"
}
```

### Настройка Tailwind

Отредактируйте `tailwind.config.ts` для изменения цветовой схемы, анимаций и т.д.

## 📄 Лицензия

MIT

