import { CalculatorInput } from '../../types/calculator';

export const zakatSchema: CalculatorInput[] = [
  {
    id: 'cashAmount',
    label: 'النقد والأموال في الحسابات البنكية',
    type: 'currency',
    defaultValue: 50000,
    min: 0,
    required: true,
    helpText: 'الأموال النقدية والودائع والمدخرات التي حال عليها الحول (مر عليها عام هجري).',
    exampleValue: 50000,
  },
  {
    id: 'goldGrams24k',
    label: 'وزن الذهب الزكوي (غرام عيار 24)',
    type: 'number',
    defaultValue: 0,
    min: 0,
    helpText: 'الذهب المدخر للاستثمار أو السبائك (حلي الاستعمال الشخصي معفي عند جمهور الفقهاء).',
  },
  {
    id: 'tradeGoodsValue',
    label: 'قيمة عروض التجارة والسلع المعدة للبيع',
    type: 'currency',
    defaultValue: 0,
    min: 0,
    helpText: 'قيمة البضائع المعدة للبيع بسعر السوق الحالي عند حلول الحول.',
  },
  {
    id: 'debtsOwed',
    label: 'الديون والالتزامات المالية العاجلة',
    type: 'currency',
    defaultValue: 0,
    min: 0,
    helpText: 'الديون التي يطالب بها أصحابها خلال الحول وتخصم من الوعاء الزكوي.',
  },
  {
    id: 'goldPricePerGram',
    label: 'سعر غرام الذهب عيار 24 بالعملة المحلية (اختياري)',
    type: 'currency',
    defaultValue: '',
    helpText: 'أدخل سعر السوق اليوم لغرام الذهب لاحتساب النصاب بدقة تامة.',
  },
  {
    id: 'yearType',
    label: 'نوع الحول (السنة المالية)',
    type: 'select',
    defaultValue: 'hijri',
    options: [
      { value: 'hijri', label: 'سنة هجرية قمرية (نسبة 2.5%)' },
      { value: 'gregorian', label: 'سنة ميلادية شمسية (نسبة 2.577%)' },
    ],
  },
];
