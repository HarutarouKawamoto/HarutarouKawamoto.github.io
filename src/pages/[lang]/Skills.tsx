import { useI18n } from '../../contexts/I18nContext';
import { skills } from '../../data/skills';

export function Skills() {
  const { lang, t } = useI18n();
  // 言語カードの map 内で `lang` が言語エンティティを指すため、表示言語は別名で持つ
  const currentLang = lang;

  const LANGUAGE_CARD_BG: Record<string, string> = {
    typescript: 'linear-gradient(135deg, rgba(56,189,248,0.22) 0%, rgba(255,255,255,0.04) 100%)',
    javascript: 'linear-gradient(135deg, rgba(250,204,21,0.22) 0%, rgba(255,255,255,0.04) 100%)',
    python:     'linear-gradient(135deg, rgba(59,130,246,0.22) 0%, rgba(250,204,21,0.18) 100%)',
    sql:        'linear-gradient(135deg, rgba(74,222,128,0.22) 0%, rgba(255,255,255,0.04) 100%)',
    'html-css':  'linear-gradient(135deg, rgba(227,79,38,0.22) 0%, rgba(21,114,182,0.18) 100%)',
    java:       'linear-gradient(135deg, rgba(237,139,0,0.22) 0%, rgba(176,39,39,0.18) 100%)',
  };

  // 並びは skills.ts の配列順（見せたい順に並べてある）
  const languages = skills.filter((s) => s.category === 'language');
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
      {/* 背景写真が明るいため、ライトモードでも白文字が読める濃さにする */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
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

                    {/* 作ったもの（学習中の言語は学習している内容） */}
                    {lang.capabilities && (
                      <div className="mt-3">
                        <p className="mb-1.5 text-sm text-white/60">
                          {lang.isLearning ? t.skills.learningLabel : t.skills.builtLabel}
                        </p>
                        <ul className="flex list-disc flex-col gap-1 pl-5 marker:text-white/40">
                          {lang.capabilities[currentLang].map((item) => (
                            <li key={item} className="text-sm leading-relaxed text-white/85">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Frameworks */}
                    {linkedFrameworks.length > 0 && (
                      <>
                        <div className="my-4 border-t border-white/10" />
                        <p className="mb-2 font-mono text-sm uppercase tracking-wider text-white/60">
                          {t.skills.categories.framework}
                        </p>
                        <ul className="flex flex-col gap-2">
                          {linkedFrameworks.map((fw) => (
                            <li key={fw.id} className="text-base text-white/80">
                              {fw.name}
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
