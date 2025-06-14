# Инструкция по настройке деплоя на GitHub Pages

## Шаг 1: Создание репозитория на GitHub

1. Создайте новый репозиторий на GitHub с именем `diplom-csr`
2. Не инициализируйте репозиторий с README, .gitignore или лицензией (они уже есть в проекте)

## Шаг 2: Подключение локального репозитория к GitHub

Выполните следующие команды в терминале:

```bash
git init
git add .
git commit -m "Initial commit with GitHub Pages setup"
git branch -M main
git remote add origin https://github.com/[ваш-username]/diplom-csr.git
git push -u origin main
```

## Шаг 3: Настройка GitHub Pages

1. Перейдите в настройки репозитория на GitHub (Settings)
2. Найдите раздел "Pages" в л��вом меню
3. В разделе "Source" выберите "GitHub Actions"
4. Сохраните настройки

## Шаг 4: Автоматический деплой

После настройки GitHub Pages:

1. При каждом push в ветку `main` будет автоматически запускаться деплой
2. Сайт будет доступен по адресу: `https://[ваш-username].github.io/diplom-csr/`
3. Первый деплой может занять несколько минут

## Ручной деплой (альтернативный способ)

Если нужно выполнить деплой вручную:

```bash
npm run deploy
```

## Проверка деплоя

1. Перейдите во вкладку "Actions" в вашем репозитории
2. Убедитесь, что workflow "Deploy to GitHub Pages" выполнился успешно
3. Откройте ваш сайт по адресу `https://[ваш-username].github.io/diplom-csr/`

## Важные файлы для деплоя

- `.github/workflows/deploy.yml` - GitHub Actions workflow для автоматического деплоя
- `vite.config.ts` - настроен base URL для GitHub Pages
- `package.json` - добавлены ��крипты для деплоя и зависимость gh-pages

## Устранение проблем

Если сайт не загружается:
1. Проверьте, что в настройках репозитория включен GitHub Pages
2. Убедитесь, что workflow выполнился без ошибок
3. Проверьте, что base URL в `vite.config.ts` соответствует имени репозитория