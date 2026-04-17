import { useI18n } from '../../contexts/I18nContext';
import { skills } from '../../data/skills';

export function Skills() {
  const { t } = useI18n();

  const LEVEL_COLORS = ['#FFFFFF', '#FADCC1', '#F4BA83', '#EF9744', '#E97406'];

  const LANGUAGE_CARD_BG: Record<string, string> = {
    typescript: 'linear-gradient(135deg, rgba(56,189,248,0.22) 0%, rgba(255,255,255,0.04) 100%)',
    javascript: 'linear-gradient(135deg, rgba(250,204,21,0.22) 0%, rgba(255,255,255,0.04) 100%)',
    python:     'linear-gradient(135deg, rgba(59,130,246,0.22) 0%, rgba(250,204,21,0.18) 100%)',
    sql:        'linear-gradient(135deg, rgba(74,222,128,0.22) 0%, rgba(255,255,255,0.04) 100%)',
  };

  const languages = skills.filter((s) => s.category === 'language');
  const frameworks = skills.filter((s) => s.category === 'framework');
  const dbs = skills.filter((s) => s.category === 'db' && !s.parentLanguage);
  const tools = skills.filter((s) => s.category === 'tool');
  const certifications = skills.filter((s) => s.category === 'certification');

  return (
    <div
      className="relative min-h-[calc(100vh-3.5rem)]"
      style={{
        backgroundImage: 'url(/images/背景２.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 60%',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
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
              <ul className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <li
                    key={tool.id}
                    className="rounded-full bg-white/10 px-4 py-2 text-base text-white/90 ring-1 ring-white/20 backdrop-blur-sm"
                  >
                    {tool.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <p className="mb-5 font-mono text-sm uppercase tracking-wider text-white/60">
                {t.skills.categories.certification}
              </p>
              <ul className="flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <li
                    key={cert.id}
                    className="rounded-xl bg-white/10 px-5 py-4 ring-1 ring-white/20 backdrop-blur-sm"
                  >
                    <p className="text-base font-[550] text-white">{cert.name}</p>
                    {cert.acquiredDate && (
                      <p className="mt-1 text-sm text-white/60">{cert.acquiredDate}</p>
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
