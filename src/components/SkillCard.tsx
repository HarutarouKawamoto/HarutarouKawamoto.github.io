import type { Skill } from '../types';
import { useI18n } from '../contexts/I18nContext';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const { t } = useI18n();
  const showLevel = skill.category === 'language' && skill.level !== undefined;

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white p-4 ring-1 ring-neutral-950/10 shadow-sm dark:bg-neutral-900 dark:ring-white/10">
      <p className="text-sm font-medium text-neutral-950 dark:text-white">{skill.name}</p>
      {showLevel && (
        <div>
          <p className="mb-1 text-xs text-neutral-500 dark:text-neutral-400">
            {t.skills.levelLabel} {skill.level}/5
          </p>
          <div className="flex gap-1" role="img" aria-label={`${t.skills.levelLabel} ${skill.level}/5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < (skill.level ?? 0)
                    ? 'bg-primary dark:bg-primary-light'
                    : 'bg-neutral-200 dark:bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
