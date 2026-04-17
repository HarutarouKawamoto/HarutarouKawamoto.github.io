import { useI18n } from '../../contexts/I18nContext';
import { SkillCard } from '../../components/SkillCard';
import { skills } from '../../data/skills';
import type { SkillCategory } from '../../types';

const CATEGORIES: SkillCategory[] = ['language', 'framework', 'tool'];

export function Skills() {
  const { t } = useI18n();

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
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/60">
          {t.skills.eyebrow}
        </p>
        <h1 className="mb-10 text-3xl font-[550] tracking-tight text-white md:text-4xl">
          {t.skills.title}
        </h1>
        <div className="flex flex-col gap-10">
          {CATEGORIES.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat);
            if (catSkills.length === 0) return null;
            return (
              <section key={cat}>
                <p className="mb-4 font-mono text-xs uppercase tracking-wider text-white/60">
                  {t.skills.categories[cat]}
                </p>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {catSkills.map((skill) => (
                    <li key={skill.id}>
                      <SkillCard skill={skill} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
