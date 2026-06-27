'use client';

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { GITHUB_EXAMPLES_API_USAGE, GITHUB_EXAMPLES_VUE3_CORE_API } from '@/lib/urls';
import DocHeading from '../../components/DocHeading';
import type { NavigationProps } from '../../types';

export default function ClassesSection(_props: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Обзор API</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Headless-слой <code className="text-primary-700 dark:text-primary-400">@mushket-co/block-builder/core</code>{' '}
          — открытая доменная логика без готового редактора. Vue/React UI поверх него — опция, не обязательный путь.
        </p>
      </div>

      <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
        <DocHeading id="why">Что такое core</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          <code>BlockBuilder</code> — фасад: CRUD блоков, схема полей, валидация, кастомные рендереры форм,
          import/export. Без готовой панели редактора — её дают{' '}
          <code>@mushket-co/block-builder/vue</code> и <code>/react</code>, используя те же правила и типы.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Core не «заставляет» отказываться от UI. Это запасной чистый слой: хотите — собираете свой редактор или
          работаете только с данными; устраивает готовый — берите компонент из Vue/React.
        </p>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
        <DocHeading id="when">Когда что использовать</DocHeading>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Выбор за вами. Ниже — типичные сценарии, не догма.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-white/60 dark:bg-slate-800/40 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              <code>BlockBuilderComponent</code> (Vue / React)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Готовый редактор «из коробки» — быстрый старт, если вас устраивает его UX и UI.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>SSR публичных страниц — в{' '}
                <Link href="/docs/nuxt" className="text-primary-600 hover:underline">Nuxt</Link>,{' '}
                <Link href="/docs/next" className="text-primary-600 hover:underline">Next.js</Link>{' '}
                (рендер блоков на сервере + гидратация редактора в админке)
              </li>
              <li>
                <Link href="/docs/vue/getting-started" className="text-primary-600 hover:underline">Vue</Link>
                {' / '}
                <Link href="/docs/react/getting-started" className="text-primary-600 hover:underline">React</Link>
                {' '}— документация по компоненту
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-white/60 dark:bg-slate-800/40 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              <code>BlockBuilder</code> (core) напрямую
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Когда готовый UI не подходит или редактор вообще не нужен — только логика и данные.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>Свой админ-UI: дизайн-система сайта, жёсткие макеты — встроенный редактор не вписывается</li>
              <li>Свой редактор на core (формы, списки, порядок блоков — как решите вы)</li>
              <li>Только данные: скрипты, тесты, API без монтирования UI (Node и браузер)</li>
              <li>
                Примеры:{' '}
                <a
                  href={GITHUB_EXAMPLES_API_USAGE}
                  className="text-primary-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  examples/api-usage
                </a>
                ,{' '}
                <a
                  href={GITHUB_EXAMPLES_VUE3_CORE_API}
                  className="text-primary-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vue3-core-api
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <DocHeading id="import">Импорт и конструктор</DocHeading>
        <CodeBlock
          language="typescript"
          code={`import { BlockBuilder } from '@mushket-co/block-builder/core'
import type { IBlockBuilderOptions } from '@mushket-co/block-builder/core'

const blockBuilder = new BlockBuilder({
  blockConfigs,       // обязательно: схема типов блоков и fields
  initialBlocks,      // опционально: IBlockDto[]
  autoInit: true,     // по умолчанию — загрузить initialBlocks при создании
} satisfies IBlockBuilderOptions)`}
          className="mb-4"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Полный тип опций —{' '}
          <Link href="/docs/core/types" className="text-primary-600 hover:underline">
            IBlockBuilderOptions
          </Link>
          . Публичные поля экземпляра — в разделе{' '}
          <Link href="/docs/core/properties" className="text-primary-600 hover:underline">
            Свойства
          </Link>
          .
        </p>
      </section>

      <section>
        <DocHeading id="example">Минимальный пример</DocHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Конфиг типа блока задаёт поля формы; методы создают и обновляют блоки в репозитории (по умолчанию — in-memory).
        </p>
        <CodeBlock
          language="typescript"
          code={`const blockConfigs = {
  text: {
    title: 'Текст',
    fields: [
      {
        field: 'content',
        label: 'Содержимое',
        type: 'textarea',
        rules: [{ type: 'required', field: 'content' }],
      },
    ],
  },
}

const blockBuilder = new BlockBuilder({ blockConfigs, initialBlocks: [] })

const block = await blockBuilder.createBlock({
  type: 'text',
  props: { content: '<p>Привет</p>' },
})

const all = await blockBuilder.getAllBlocks()
const json = blockBuilder.exportBlocks()`}
          className="mb-4"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Схема полей — в{' '}
          <Link href="/docs/core/form-fields" className="text-primary-600 hover:underline">
            Поля форм
          </Link>
          . Список методов —{' '}
          <Link href="/docs/core/methods" className="text-primary-600 hover:underline">
            Методы
          </Link>
          .
        </p>
      </section>

      <section className="rounded-xl p-6 border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
        <DocHeading id="map">Карта раздела «Справочник API»</DocHeading>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            →{' '}
            <Link href="/docs/core/methods" className="text-primary-600 hover:underline">
              Методы
            </Link>{' '}
            — CRUD, режим редактирования, кастомные рендереры
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/properties" className="text-primary-600 hover:underline">
              Свойства
            </Link>{' '}
            — опции конструктора (<code>blockConfigs</code>, <code>initialBlocks</code>, …)
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/types" className="text-primary-600 hover:underline">
              Типы
            </Link>{' '}
            — TypeScript-интерфейсы
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/form-fields" className="text-primary-600 hover:underline">
              Поля форм
            </Link>{' '}
            — типы полей, валидация, кастомные рендереры
          </li>
          <li>
            →{' '}
            <Link href="/docs/core/utilities" className="text-primary-600 hover:underline">
              Утилиты
            </Link>{' '}
            — spacing, scroll lock, валидация форм
          </li>
        </ul>
      </section>
    </div>
  );
}
