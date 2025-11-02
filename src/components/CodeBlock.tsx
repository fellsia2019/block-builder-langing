'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({ 
  code, 
  language = 'javascript',
  className = '' 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const trimmedCode = code.trim();
  const isRounded = !className.includes('rounded-none');
  
  // Определяем язык для подсветки
  // react-syntax-highlighter с Prism не поддерживает 'vue' напрямую
  // Для Vue компонентов используем 'markup' (HTML), так как основная часть Vue - это template
  const getLanguage = () => {
    if (language === 'vue') {
      // Используем markup для Vue, так как он хорошо подсвечивает HTML/XML синтаксис
      // который является основной частью Vue компонентов (template секция)
      return 'markup';
    }
    // Маппинг других языков если нужно
    const languageMap: Record<string, string> = {
      'ts': 'typescript',
      'tsx': 'tsx',
      'js': 'javascript',
      'jsx': 'jsx',
      'json': 'json',
      'bash': 'bash',
      'shell': 'bash',
      'html': 'markup',
      'css': 'css',
      'scss': 'scss',
    };
    
    return languageMap[language] || language;
  };
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <div className={`${isRounded ? 'rounded-lg' : ''} overflow-hidden relative group ${className}`}>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors opacity-0 group-hover:opacity-100"
        title={copied ? 'Скопировано!' : 'Копировать'}
      >
        {copied ? (
          <span className="flex items-center gap-1">
            <span>✓</span>
            <span>Скопировано</span>
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <span>📋</span>
            <span>Копировать</span>
          </span>
        )}
      </button>
      <SyntaxHighlighter
        language={getLanguage()}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          background: '#1e293b', // slate-800
          borderRadius: isRounded ? '0.5rem' : '0',
        }}
        showLineNumbers={false}
        PreTag="div"
      >
        {trimmedCode}
      </SyntaxHighlighter>
    </div>
  );
}

