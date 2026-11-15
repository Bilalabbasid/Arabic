import { CalculationResult } from '../../types/calculator';

/** Common admission weight splits (high school / Qudurat / Tahsili). Universities announce their own. */
export const WEIGHT_PRESETS: Record<string, [number, number, number]> = {
  '30-30-40': [30, 30, 40],
  '40-30-30': [40, 30, 30],
  '50-50-0': [50, 50, 0],
  '25-25-50': [25, 25, 50],
};

export interface WeightedPercentageInputs {
  preset?: string;
  highSchool: number | string;
  qudurat: number | string;
  tahsili?: number | string;
  weightHighSchool?: number | string;
  weightQudurat?: number | string;
  weightTahsili?: number | string;
  targetPercent?: number | string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const fmt = (n: number) => String(round2(n));

function resolveWeights(inputs: WeightedPercentageInputs): [number, number, number] {
  const preset = String(inputs.preset || '30-30-40');
  if (preset !== 'custom' && WEIGHT_PRESETS[preset]) return WEIGHT_PRESETS[preset];
  return [
    Number(inputs.weightHighSchool) || 0,
    Number(inputs.weightQudurat) || 0,
    Number(inputs.weightTahsili) || 0,
  ];
}

export function calculateWeightedPercentage(inputs: WeightedPercentageInputs): CalculationResult {
  const [w1, w2, w3] = resolveWeights(inputs);
  const hs = Number(inputs.highSchool);
  const q = Number(inputs.qudurat);
  const t = w3 > 0 ? Number(inputs.tahsili) : 0;

  const scores: Array<[string, number]> = [['نسبة الثانوية', hs], ['درجة القدرات', q]];
  if (w3 > 0) scores.push(['درجة التحصيلي', t]);
  for (const [name, val] of scores) {
    if (!Number.isFinite(val) || val < 0 || val > 100) {
      return {
        primary: { label: 'النسبة الموزونة', value: 0, formattedValue: '-' },
        error: `${name} يجب أن تكون رقماً بين 0 و 100.`,
      };
    }
  }

  if ([w1, w2, w3].some((w) => w < 0)) {
    return {
      primary: { label: 'النسبة الموزونة', value: 0, formattedValue: '-' },
      error: 'الأوزان لا يمكن أن تكون سالبة.',
    };
  }

  const sum = w1 + w2 + w3;
  if (Math.abs(sum - 100) > 0.001) {
    return {
      primary: { label: 'النسبة الموزونة', value: 0, formattedValue: '-' },
      error: `مجموع الأوزان يجب أن يساوي 100%، والمجموع الحالي ${fmt(sum)}%. عدّل الأوزان لتصبح مثلاً 30 + 30 + 40.`,
    };
  }

  const c1 = (hs * w1) / 100;
  const c2 = (q * w2) / 100;
  const c3 = (t * w3) / 100;
  const weighted = c1 + c2 + c3;

  const steps = [
    `نصيب الثانوية = ${hs} × ${w1}% = ${fmt(c1)}`,
    `نصيب القدرات = ${q} × ${w2}% = ${fmt(c2)}`,
  ];
  if (w3 > 0) steps.push(`نصيب التحصيلي = ${t} × ${w3}% = ${fmt(c3)}`);
  steps.push(`النسبة الموزونة = ${[c1, c2, ...(w3 > 0 ? [c3] : [])].map(fmt).join(' + ')} = ${fmt(weighted)}%`);

  const secondary: CalculationResult['secondary'] = [
    { id: 'hsShare', label: `نصيب الثانوية (${w1}%)`, value: round2(c1), formattedValue: fmt(c1) },
    { id: 'qShare', label: `نصيب القدرات (${w2}%)`, value: round2(c2), formattedValue: fmt(c2) },
  ];
  if (w3 > 0) {
    secondary.push({ id: 'tShare', label: `نصيب التحصيلي (${w3}%)`, value: round2(c3), formattedValue: fmt(c3) });
  }

  const warnings: string[] = [];
  const target = Number(inputs.targetPercent) || 0;
  if (target > 0) {
    if (target > 100) {
      warnings.push('النسبة المستهدفة لا يمكن أن تتجاوز 100%.');
    } else if (w3 > 0) {
      // Score needed in the Tahsili to reach the target, keeping the other two fixed.
      const needed = ((target - c1 - c2) * 100) / w3;
      let msg: string;
      if (needed <= 0) msg = 'تحققت النسبة المستهدفة بالثانوية والقدرات وحدهما';
      else if (needed > 100) msg = `غير ممكن بالتحصيلي وحده (يلزم ${fmt(needed)} من 100)`;
      else msg = `${fmt(needed)} من 100`;
      secondary.push({ id: 'tahsiliNeeded', label: `درجة التحصيلي اللازمة لبلوغ ${target}%`, value: needed > 0 && needed <= 100 ? round2(needed) : msg, formattedValue: msg });
      steps.push(`التحصيلي اللازم = (${target} − ${fmt(c1)} − ${fmt(c2)}) ÷ ${w3}% = ${fmt(needed)}`);
    } else {
      const needed = ((target - c1) * 100) / w2;
      const msg = needed <= 0 ? 'تحققت النسبة المستهدفة بالثانوية وحدها' : needed > 100 ? `غير ممكن بالقدرات وحدها (يلزم ${fmt(needed)})` : `${fmt(needed)} من 100`;
      secondary.push({ id: 'quduratNeeded', label: `درجة القدرات اللازمة لبلوغ ${target}%`, value: msg, formattedValue: msg });
    }
  }

  const gap = target > 0 && target <= 100 ? round2(weighted - target) : undefined;

  return {
    primary: {
      id: 'weighted',
      label: 'نسبتك الموزونة',
      value: round2(weighted),
      formattedValue: `${fmt(weighted)}%`,
      badge: `${w1}/${w2}/${w3}`,
      highlight: true,
    },
    directAnswer: `نسبتك الموزونة ${fmt(weighted)}% بأوزان ثانوي ${w1}% وقدرات ${w2}%${w3 > 0 ? ` وتحصيلي ${w3}%` : ''}.${
      gap !== undefined ? (gap >= 0 ? ` أعلى من هدفك بـ ${gap} نقطة.` : ` أقل من هدفك بـ ${Math.abs(gap)} نقطة.`) : ''
    }`,
    secondary,
    details: [
      { label: 'الأوزان المستخدمة', value: `ثانوي ${w1}% + قدرات ${w2}% + تحصيلي ${w3}% = 100%` },
      { label: 'الدرجات المدخلة', value: `ثانوي ${hs} | قدرات ${q}${w3 > 0 ? ` | تحصيلي ${t}` : ''}` },
    ],
    calculationSteps: steps,
    warnings: warnings.length ? warnings : undefined,
    assumptions: [
      'الأوزان المعروضة تقسيمات شائعة فقط؛ لكل جامعة وكل تخصص أوزان يعلنها في دليل القبول، فتحقق منها قبل المقارنة بنسب القبول.',
    ],
  };
}
