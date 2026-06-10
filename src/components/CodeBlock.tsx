'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Icon from './Icon';

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  { ssr: false }
);

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language = 'javascript',
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const trimmedCode = code.trim();
  const isRounded = !className.includes('rounded-none');

  const getLanguage = () => {
    if (language === 'vue') {
      return 'markup';
    }
    const languageMap: Record<string, string> = {
      ts: 'typescript',
      tsx: 'tsx',
      js: 'javascript',
      jsx: 'jsx',
      json: 'json',
      bash: 'bash',
      shell: 'bash',
      html: 'markup',
      css: 'css',
      scss: 'scss',
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

  const preStyles = {
    margin: 0,
    padding: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    background: '#1e293b',
    borderRadius: isRounded ? '0.5rem' : '0',
    minWidth: 'fit-content',
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
            <span className="hidden sm:inline">Скопировано</span>
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Icon name="clipboard" size={14} />
            <span className="hidden sm:inline">Копировать</span>
          </span>
        )}
      </button>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={getLanguage()}
          style={vscDarkPlus}
          customStyle={preStyles}
          showLineNumbers={false}
          PreTag="div"
          wrapLines={false}
          wrapLongLines={false}
        >
          {trimmedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
