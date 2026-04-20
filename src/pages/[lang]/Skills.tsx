import { useI18n } from '../../contexts/I18nContext';
import { skills } from '../../data/skills';

export function Skills() {
  const { lang, t } = useI18n();

  const LEVEL_COLORS = ['#FFFFFF', '#FADCC1', '#F4BA83', '#EF9744', '#E97406'];

  const LEVEL_DEFINITIONS = [
    { level: 1, label: { ja: '入門',     en: 'Beginner'     }, description: { ja: '教材に沿ってコードを書き、動かせる', en: 'Can write and run code following tutorials' } },
    { level: 2, label: { ja: '基礎',     en: 'Basic'        }, description: { ja: '教材を離れ、既存のコードを読んで理解・改変できる。公式ドキュメントで自己解決できる', en: 'Can read and modify existing code independently. Can solve problems using official docs' } },
    { level: 3, label: { ja: '自走',     en: 'Independent'  }, description: { ja: '技術選定・設計・実装・デプロイまで一人で完結できる。Gitでソース管理ができる', en: 'Can handle tech selection, design, implementation and deployment solo. Manages source with Git' } },
    { level: 4, label: { ja: '応用',     en: 'Applied'      }, description: { ja: 'OSSや他者のコードを読んで学習・応用できる。パフォーマンスや設計を意識した実装ができる', en: 'Can learn from OSS and others\' code. Implements with performance and design in mind' } },
    { level: 5, label: { ja: '実務自走', en: 'Professional' }, description: { ja: '仕様から実装・テスト・リリースまで一人で完結できる。技術的な質問に根拠をもって回答できる', en: 'Completes from spec to release independently. Answers technical questions with clear reasoning' } },
  ];

  const LANGUAGE_CARD_BG: Record<string, string> = {
    typescript: 'linear-gradient(135deg, rgba(56,189,248,0.22) 0%, rgba(255,255,255,0.04) 100%)',
    javascript: 'linear-gradient(135deg, rgba(250,204,21,0.22) 0%, rgba(255,255,255,0.04) 100%)',
    python:     'linear-gradient(135deg, rgba(59,130,246,0.22) 0%, rgba(250,204,21,0.18) 100%)',
    sql:        'linear-gradient(135deg, rgba(74,222,128,0.22) 0%, rgba(255,255,255,0.04) 100%)',
    'html-css':  'linear-gradient(135deg, rgba(227,79,38,0.22) 0%, rgba(21,114,182,0.18) 100%)',
    java:       'linear-gradient(135deg, rgba(237,139,0,0.22) 0%, rgba(176,39,39,0.18) 100%)',
    cpp:        'linear-gradient(135deg, rgba(0,89,156,0.22) 0%, rgba(101,154,210,0.18) 100%)',
    c:          'linear-gradient(135deg, rgba(168,185,204,0.22) 0%, rgba(0,63,145,0.18) 100%)',
    php:        'linear-gradient(135deg, rgba(119,123,180,0.22) 0%, rgba(79,51,152,0.18) 100%)',
  };

  const languages = skills
    .filter((s) => s.category === 'language')
    .sort((a, b) => (b.level ?? 0) - (a.level ?? 0));
  const frameworks = skills.filter((s) => s.category === 'framework');
  const dbs = skills.filter((s) => s.category === 'db' && !s.parentLanguage);
  const tools = skills.filter((s) => s.category === 'tool');
  const certifications = skills.filter((s) => s.category === 'certification');

  return (
    <div
      className="relative min-h-[calc(100vh-7rem)]"
      style={{
        backgroundImage: 'url(/images/背景２.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 60%',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/20 dark:bg-black/60" />
      <main className="relative mx-auto max-w-7xl px-6 py-16">
        <p className="mb-3 font-mono text-sm uppercase tracking-wider text-white/60">
          {t.skills.eyebrow}
        </p>
        <h1 className="mb-12 text-3xl font-[550] tracking-tight text-white md:text-4xl">
          {t.skills.title}
        </h1>

        <div className="flex flex-col gap-12">
          {/* Languages + linked Frameworks */}
          <section>
            <p className="mb-5 font-mono text-sm uppercase tracking-wider text-white/60">
              {t.skills.levelLabel}
            </p>
            {/* レベル定義表 */}
            <div className="mb-6 overflow-hidden rounded-xl ring-1 ring-white/20 backdrop-blur-sm">
              {LEVEL_DEFINITIONS.map((def, i) => (
                <div
                  key={def.level}
                  className={`flex items-baseline gap-4 px-5 py-3 ${i !== 0 ? 'border-t border-white/10' : ''}`}
                >
                  <div className="flex shrink-0 items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: LEVEL_COLORS[def.level - 1] }}
                    />
                    <span className="w-16 text-sm font-[550] text-white/90">
                      {def.label[lang]}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">
                    {def.description[lang]}
                  </p>
                </div>
              ))}
            </div>

            <p className="mb-5 font-mono text-sm uppercase tracking-wider text-white/60">
              {t.skills.categories.language}
            </p>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {languages.map((lang) => {
                const linkedFrameworks = frameworks.filter((f) => f.parentLanguage === lang.id);
                const linkedDbs = skills.filter(
                  (s) => s.category === 'db' && s.parentLanguage === lang.id
                );
                return (
                  <li
                    key={lang.id}
                    className="flex flex-col rounded-xl p-5 ring-1 ring-white/20 backdrop-blur-sm"
                    style={{ background: LANGUAGE_CARD_BG[lang.id] ?? 'rgba(255,255,255,0.1)' }}
                  >
                    {/* Language name */}
                    <p className="text-lg font-[550] text-white">{lang.name}</p>

                    {/* Proficiency */}
                    <div className="mt-3">
                      <p className="mb-1.5 text-sm text-white/60">{t.skills.levelLabel}</p>
                      <div
                        className="flex gap-1.5"
                        role="img"
                        aria-label={`${t.skills.levelLabel} ${lang.level}/5`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-3 w-3 rounded-full transition-colors"
                            style={
                              i < (lang.level ?? 0)
                                ? { backgroundColor: LEVEL_COLORS[i] }
                                : { backgroundColor: 'rgba(255,255,255,0.2)' }
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Frameworks */}
                    {linkedFrameworks.length > 0 && (
                      <>
                        <div className="my-4 border-t border-white/10" />
                        <p className="mb-2 font-mono text-sm uppercase tracking-wider text-white/60">
                          {t.skills.categories.framework}
                        </p>
                        <ul className="flex flex-col gap-2">
                          {linkedFrameworks.map((fw) => (
                            <li key={fw.id}>
                              <p className="text-base text-white/80">{fw.name}</p>
                              {fw.level !== undefined && (
                                <div
                                  className="mt-1 flex gap-1.5"
                                  role="img"
                                  aria-label={`${t.skills.levelLabel} ${fw.level}/5`}
                                >
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="h-2 w-2 rounded-full transition-colors"
                                      style={
                                        i < fw.level!
                                          ? { backgroundColor: LEVEL_COLORS[i] }
                                          : { backgroundColor: 'rgba(255,255,255,0.2)' }
                                      }
                                    />
                                  ))}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Linked DBs */}
                    {linkedDbs.length > 0 && (
                      <>
                        <div className="my-4 border-t border-white/10" />
                        <p className="mb-2 font-mono text-sm uppercase tracking-wider text-white/60">
                          {t.skills.categories.db}
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {linkedDbs.map((db) => (
                            <li key={db.id} className="text-base text-white/80">
                              {db.name}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Databases */}
          {dbs.length > 0 && (
            <section>
              <p className="mb-5 font-mono text-sm uppercase tracking-wider text-white/60">
                {t.skills.categories.db}
              </p>
              <ul className="flex flex-wrap gap-2">
                {dbs.map((db) => (
                  <li
                    key={db.id}
                    className="rounded-full bg-white/10 px-4 py-2 text-base text-white/90 ring-1 ring-white/20 backdrop-blur-sm"
                  >
                    {db.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tools */}
          {tools.length > 0 && (
            <section>
              <p className="mb-5 font-mono text-sm uppercase tracking-wider text-white/60">
                {t.skills.categories.tool}
              </p>
              <div className="overflow-hidden rounded-xl ring-1 ring-white/20 backdrop-blur-sm">
                {[
                  { group: '開発環境',           ids: ['vscode', 'cmd'] },
                  { group: 'バージョン管理・CI/CD', ids: ['git', 'github-cli', 'github-actions'] },
                  { group: 'コンテナ',           ids: ['docker', 'docker-compose'] },
                  { group: 'ビルド',             ids: ['vite'] },
                  { group: 'AI / CLI',           ids: ['claude-cli', 'gemini-cli'] },
                  { group: 'API',                ids: ['gemini-api', 'openai-api', 'anki-api', 'discord-dev'] },
                  { group: 'セキュリティ',        ids: ['jwt', 'bcrypt'] },
                  { group: 'その他',             ids: ['postman', 'formspree', 'obsidian'] },
                ].map(({ group, ids }, i) => {
                  const groupTools = ids.map((id) => tools.find((t) => t.id === id)).filter(Boolean);
                  if (groupTools.length === 0) return null;
                  return (
                    <div
                      key={group}
                      className={`flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:gap-0 ${
                        i !== 0 ? 'border-t border-white/10' : ''
                      }`}
                    >
                      <p className="w-44 shrink-0 text-sm font-[550] text-white/70">
                        {group}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {groupTools.map((tool) => (
                          <li key={tool!.id} className="text-sm text-white/80">
                            {tool!.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <p className="mb-5 font-mono text-sm uppercase tracking-wider text-white/60">
                {t.skills.categories.certification}
              </p>
              <ul className="grid grid-cols-1 gap-4">
                {certifications.map((cert) => (
                  <li
                    key={cert.id}
                    className="flex items-center justify-between rounded-xl bg-white/10 px-8 py-6 ring-1 ring-white/20 backdrop-blur-sm"
                  >
                    <p className="text-xl font-[550] text-white">{cert.name}</p>
                    {cert.acquiredDate && (
                      <p className="text-sm text-white/60">{cert.acquiredDate}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
