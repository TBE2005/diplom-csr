# Настройка деплоя на GitHub Pages

## Проблема
Ошибка `No address provided to ConvexReactClient` возникает при деплое на GitHub Pages, потому что переменные окружения из `.env.local` недоступны в production сборке.

## Решение

### 1. Production Convex Deployment
Уже создан production deployment: `https://cool-goldfish-200.convex.cloud`

### 2. GitHub Actions настроен
Файл `.github/workflows/deploy.yml` уже обновлен для использования production URL.

### 3. Локальная разработка
Для локальной разработки используйте:
```bash
npm run dev
```
Это будет использовать URL из `.env.local`: `https://quaint-emu-938.convex.cloud`

### 4. Production сборка
Production сборка автоматически использует URL: `https://cool-goldfish-200.convex.cloud`

## Команды для управления

### Локальная разработка
```bash
npx convex dev  # Запуск dev окружения
npm run dev     # Запуск приложения
```

### Production деплой
```bash
npx convex deploy  # Деплой в production
npm run build      # Сборка приложения
```

## Структура окружений

- **Development**: `https://quaint-emu-938.convex.cloud` (из .env.local)
- **Production**: `https://cool-goldfish-200.convex.cloud` (встроен в GitHub Actions)

## Проверка деплоя

После пуша в main ветку:
1. GitHub Actions автоматически запустится
2. Convex функции будут задеплоены в production
3. Приложение будет собрано с правильным URL
4. Сайт будет доступен на GitHub Pages

Ошибка `No address provided to ConvexReactClient` больше не должна возникать.