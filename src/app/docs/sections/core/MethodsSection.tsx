'use client';

import NextPageLink from '../../components/NextPageLink';
import MethodCard from '../../components/MethodCard';
import type { NavigationProps } from '../../types';

export default function MethodsSection({ nextSection, nextTitle, onNavigate }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Методы</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          API методы для работы с блоками
        </p>
      </div>

      {/* CRUD Methods */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          CRUD операции
        </h2>
        <div className="space-y-4">
          <MethodCard name="createBlock" signature="blockBuilder.createBlock(block: CreateBlockDto): Promise&lt;Block&gt;" description="Создает новый блок с указанными параметрами" color="blue" />
          <MethodCard name="getBlock" signature="blockBuilder.getBlock(id: string): Promise&lt;Block | null&gt;" description="Возвращает блок по идентификатору" color="blue" />
          <MethodCard name="getAllBlocks" signature="blockBuilder.getAllBlocks(): Promise&lt;Block[]&gt;" description="Возвращает список всех созданных блоков" color="blue" />
          <MethodCard name="updateBlock" signature="blockBuilder.updateBlock(id: string, updates: UpdateBlockDto): Promise&lt;Block&gt;" description="Обновляет существующий блок по идентификатору" color="blue" />
          <MethodCard name="deleteBlock" signature="blockBuilder.deleteBlock(id: string): Promise&lt;boolean&gt;" description="Удаляет блок по идентификатору" color="blue" />
        </div>
      </section>

      {/* Utility Methods */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          Утилиты
        </h2>
        <div className="space-y-4">
          <MethodCard name="duplicateBlock" signature="blockBuilder.duplicateBlock(id: string): Promise&lt;Block&gt;" description="Дублирует блок" color="purple" />
          <MethodCard name="getBlocksCount" signature="blockBuilder.getBlocksCount(): Promise&lt;number&gt;" description="Возвращает количество блоков" color="purple" />
          <MethodCard name="getBlocksByType" signature="blockBuilder.getBlocksByType(type: string): Promise&lt;Block[]&gt;" description="Возвращает блоки по типу" color="purple" />
          <MethodCard name="exportBlocks" signature="blockBuilder.exportBlocks(): string" description="Экспортирует блоки в JSON" color="purple" />
          <MethodCard name="importBlocks" signature="blockBuilder.importBlocks(json: string): boolean" description="Импортирует блоки из JSON" color="purple" />
        </div>
      </section>

      {/* Custom Renderers Methods */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          Кастомные рендереры
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 border-2 border-yellow-500 shadow-sm">
            <span>⭐</span>
            <span>PRO</span>
          </span>
        </h2>
        <div className="space-y-4">
          <MethodCard name="registerCustomFieldRenderer" signature="blockBuilder.registerCustomFieldRenderer(renderer: CustomFieldRenderer): void" description="Регистрирует кастомный рендерер поля. Доступно только в PRO версии." color="orange" isPro={true} />
          <MethodCard name="registerCustomFieldRenderers" signature="blockBuilder.registerCustomFieldRenderers(renderers: CustomFieldRenderer[]): void" description="Массовая регистрация нескольких кастомных рендереров полей. Доступно только в PRO версии." color="orange" isPro={true} />
          <MethodCard name="getCustomFieldRenderer" signature="blockBuilder.getCustomFieldRenderer(id: string): CustomFieldRenderer | null" description="Получает кастомный рендерер по ID. Доступно только в PRO версии." color="orange" isPro={true} />
          <MethodCard name="hasCustomFieldRenderer" signature="blockBuilder.hasCustomFieldRenderer(id: string): boolean" description="Проверяет наличие кастомного рендерера. Доступно только в PRO версии." color="orange" isPro={true} />
          <MethodCard name="getAllCustomFieldRenderers" signature="blockBuilder.getAllCustomFieldRenderers(): Map&lt;string, CustomFieldRenderer&gt;" description="Возвращает все зарегистрированные кастомные рендереры. Доступно только в PRO версии." color="orange" isPro={true} />
          <MethodCard name="unregisterCustomFieldRenderer" signature="blockBuilder.unregisterCustomFieldRenderer(id: string): boolean" description="Удаляет кастомный рендерер. Доступно только в PRO версии." color="orange" isPro={true} />
        </div>
      </section>

      <NextPageLink nextSection={nextSection} nextTitle={nextTitle} onNavigate={onNavigate} color="primary" />
    </div>
  );
}

