import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { detectInitialLanguage, saveLang } from '../../../src/lib/i18n';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe('detectInitialLanguage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.stubGlobal('navigator', { language: 'en-US' });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('localStorageに保存済みのjaを優先して返す', () => {
    localStorage.setItem('lang', 'ja');
    expect(detectInitialLanguage()).toBe('ja');
  });

  it('localStorageに保存済みのenを優先して返す', () => {
    localStorage.setItem('lang', 'en');
    expect(detectInitialLanguage()).toBe('en');
  });

  it('未保存かつブラウザ言語がja-JPの場合はjaを返す', () => {
    vi.stubGlobal('navigator', { language: 'ja-JP' });
    expect(detectInitialLanguage()).toBe('ja');
  });

  it('未保存かつブラウザ言語がjaの場合はjaを返す', () => {
    vi.stubGlobal('navigator', { language: 'ja' });
    expect(detectInitialLanguage()).toBe('ja');
  });

  it('未保存かつブラウザ言語がen-USの場合はenを返す', () => {
    expect(detectInitialLanguage()).toBe('en');
  });

  it('未保存かつブラウザ言語がzh-CNの場合はenを返す', () => {
    vi.stubGlobal('navigator', { language: 'zh-CN' });
    expect(detectInitialLanguage()).toBe('en');
  });
});

describe('saveLang', () => {
  beforeEach(() => localStorageMock.clear());

  it('localStorageにlangを保存する', () => {
    saveLang('ja');
    expect(localStorage.getItem('lang')).toBe('ja');
  });

  it('enをlocalStorageに保存する', () => {
    saveLang('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });
});
