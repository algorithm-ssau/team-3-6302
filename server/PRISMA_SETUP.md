# Настройка Prisma

## Шаги для развертывания Prisma

### 1. Установка зависимостей

```bash
cd server
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в папке `server/` со следующим содержимым:

```env
# Database URL для Prisma
DATABASE_URL="postgresql://user:password@localhost:5432/recipes?schema=public"

**Важно:** Замените `user`, `password`, `localhost`, `5432` и `recipes` на ваши реальные данные подключения к PostgreSQL.

### 3. Генерация Prisma Client

```bash
npm run prisma:generate
```

### 4. Создание миграций базы данных

```bash
npm run prisma:migrate
```

Или, если вы хотите просто синхронизировать схему без создания миграций:

```bash
npm run prisma:push
```

### 5. Использование Prisma в коде

Импортируйте Prisma Client:

```typescript
import prisma from './utils/prisma'

// Пример использования
const recipes = await prisma.recipe.findMany()
```

## Доступные команды Prisma

- `npm run prisma:generate` - Генерация Prisma Client
- `npm run prisma:migrate` - Создание и применение миграций
- `npm run prisma:push` - Синхронизация схемы с БД (без миграций)
- `npm run prisma:studio` - Открыть Prisma Studio (GUI для БД)

## Структура модели Recipe

Модель Recipe включает следующие поля:
- `id` - UUID (автоматически генерируется)
- `title` - Название рецепта
- `description` - Описание (опционально)
- `ingredients` - Массив ингредиентов
- `instructions` - Массив инструкций
- `category` - Категория (опционально)
- `imageUrl` - URL изображения (опционально)
- `createdAt` - Дата создания (автоматически)
- `updatedAt` - Дата обновления (автоматически)

