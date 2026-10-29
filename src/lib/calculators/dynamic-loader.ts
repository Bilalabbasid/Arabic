import { CalculationResult, CalculationFunction } from '@/types/calculator';

const ENGINE_CACHE = new Map<string, CalculationFunction>();

const MODULE_LOADERS: Record<string, () => Promise<{ [key: string]: any }>> = {
  cars: () => import('@/lib/calculators/cars'),
  tax: () => import('@/lib/calculators/tax'),
  finance: () => import('@/lib/calculators/finance'),
  salary: () => import('@/lib/calculators/salary'),
  electricity: () => import('@/lib/calculators/electricity'),
  health: () => import('@/lib/calculators/health'),
  math: () => import('@/lib/calculators/math'),
};

const ENGINE_MAP: Record<string, { moduleKey: string; fnName: string }> = {
  'cars.calculateCarFuelCost': { moduleKey: 'cars', fnName: 'calculateCarFuelCost' },
  'tax.calculateVat': { moduleKey: 'tax', fnName: 'calculateVat' },
  'tax.calculateZakatWealth': { moduleKey: 'tax', fnName: 'calculateZakatWealth' },
  'finance.calculateLoan': { moduleKey: 'finance', fnName: 'calculateLoan' },
  'salary.calculateEndOfService': { moduleKey: 'salary', fnName: 'calculateEndOfService' },
  'electricity.calculateElectricityBill': { moduleKey: 'electricity', fnName: 'calculateElectricityBill' },
  'health.calculateBmi': { moduleKey: 'health', fnName: 'calculateBmi' },
  'math.calculatePercentage': { moduleKey: 'math', fnName: 'calculatePercentage' },
};

/**
 * Lazy loads the calculation engine function on demand in client components.
 */
export async function loadCalculatorEngine(engineId: string): Promise<CalculationFunction | null> {
  if (ENGINE_CACHE.has(engineId)) {
    return ENGINE_CACHE.get(engineId)!;
  }

  const entry = ENGINE_MAP[engineId];
  if (!entry || !MODULE_LOADERS[entry.moduleKey]) {
    return null;
  }

  try {
    const mod = await MODULE_LOADERS[entry.moduleKey]();
    const fn = mod[entry.fnName];
    if (typeof fn === 'function') {
      ENGINE_CACHE.set(engineId, fn);
      return fn;
    }
  } catch (err) {
    console.error(`Failed to dynamically load calculation engine: ${engineId}`, err);
  }

  return null;
}
