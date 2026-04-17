import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { detectInitialTheme, saveTheme, applyTheme } from '../../../src/lib/theme';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

const matchMediaMock = (matches: boolean) => ({
  matches,
  media: '',
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

describe('detectInitialTheme', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.stubGlobal('window', {
      matchMedia: vi.fn().mockReturnValue(matchMediaMock(false)),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('localStorageにdarkが保存されていればdarkを返す', () => {
    localStorage.setItem('theme', 'dark');
    expect(detectInitialTheme()).toBe('dark');
  });

  it('localStorageにlightが保存されていればlightを返す', () => {
    localStorage.setItem('theme', 'light');
    expect(detectInitialTheme()).toBe('light');
  });

  it('未保存でシステムがdarkならdarkを返す', () => {
    vi.stubGlobal('window', {
      matchMedia: vi.fn().mockReturnValue(matchMediaMock(true)),
    });
    expect(detectInitialTheme()).toBe('dark');
  });

  it('未保存でシステムがlightならlightを返す', () => {
    expect(detectInitialTheme()).toBe('light');
  });
});

describe('saveTheme', () => {
  beforeEach(() => localStorageMock.clear());

  it('localStorageにthemeを保存する', () => {
    saveTheme('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});

describe('applyTheme', () => {
  it('darkのとき html に dark クラスを追加する', () => {
    const classList = { add: vi.fn(), remove: vi.fn() };
    vi.stubGlobal('document', { documentElement: { classList } });
    applyTheme('dark');
    expect(classList.add).toHaveBeenCalledWith('dark');
  });

  it('lightのとき html から dark クラスを削除する', () => {
    const classList = { add: vi.fn(), remove: vi.fn() };
    vi.stubGlobal('document', { documentElement: { classList } });
    applyTheme('light');
    expect(classList.remove).toHaveBeenCalledWith('dark');
  });
});
