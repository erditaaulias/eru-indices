import { RunSheetStep, CommonMistake, WorksheetData } from '../types.ts';

export const RUN_SHEET_STEPS: RunSheetStep[] = [
  {
    id: 1,
    durationMinutes: 5,
    title: 'Phase 1: Predict the Views (Hook)',
    summary: 'Noon is hour 0: 1,000 views, doubling each hour. Challenge students to predict views at 3 pm, 11 am, and 9 am.',
    teacherSay: 'At 12:00, our viral video hits 1,000 views. Each hour it doubles. How many views at 3 pm? How many at 11 am? How many at 9 am?',
    keyPrompt: 'Listen carefully: Do students say 500 views at 11 am (correct) or 0 views? Halving going backward is the doorway to negative indices.'
  },
  {
    id: 2,
    durationMinutes: 10,
    title: 'Phase 2: Build the Table & Discover Negative Indices',
    summary: 'Write powers of 2 from 2³ down to 2⁻³. Notice moving right multiplies by 2, so moving left divides by 2.',
    teacherSay: 'Every step to the right multiplies by 2. What must every step to the left do? Divide by 2! So 2 ÷ 2 = 1, which means 2⁰ = 1. What is 1 ÷ 2? Half! So 2⁻¹ = 1/2.',
    keyPrompt: 'Crucial insight: A negative index does NOT make the number negative. It creates a fraction / reciprocal.'
  },
  {
    id: 3,
    durationMinutes: 10,
    title: 'Phase 3: Discover the Index Laws',
    summary: 'Expand expressions to verify: 2³ × 2² = 2⁵ (add indices), 2⁵ × 2⁻² = 2³ (rules still hold!), 2⁵ ÷ 2² = 2³ (subtract indices).',
    teacherSay: 'Write out 2³ as 2 × 2 × 2 and 2² as 2 × 2. How many 2s multiplied together? Five! So 2³ × 2² = 2⁵. The powers add!',
    keyPrompt: 'Test division: 2⁵ ÷ 2² = (2×2×2×2×2) / (2×2). Cancel two 2s. We are left with 2³, so 5 - 2 = 3.'
  },
  {
    id: 4,
    durationMinutes: 5,
    title: 'Phase 4: Change the Base (Generalisation)',
    summary: 'Switch from base 2 to base 10 (place value) and base 3 to ensure students understand the rule applies to any base a.',
    teacherSay: 'Does this work for base 10? 10³ = 1000, 10² = 100, 10¹ = 10, 10⁰ = 1, 10⁻¹ = 0.1, 10⁻² = 0.01. It is our decimal system!',
    keyPrompt: 'Confirm: a⁰ = 1 and a⁻ⁿ = 1/aⁿ holds for any non-zero base a.'
  },
  {
    id: 5,
    durationMinutes: 15,
    title: 'Phase 5: Practice (Worksheet A)',
    summary: 'Students work through 23 practice questions: Evaluating, Multiplying & Dividing, Missing Exponents, True/False.',
    teacherSay: 'Work through Worksheet A. Check each answer as you go. Watch out for the negative index trap!',
    keyPrompt: 'Targeted support: provide fraction frames 1/(__) for students struggling with negative powers.'
  },
  {
    id: 6,
    durationMinutes: 5,
    title: 'Phase 6: Challenge & Exit Ticket',
    summary: 'Review Worksheet B extension questions and administer the 3-question exit ticket.',
    teacherSay: 'Before you leave, complete the Exit Ticket on your own. Show me: what is 3⁻²? What is 5⁴ ÷ 5⁴? And simplify x³ × x⁻⁵.',
    keyPrompt: 'Quick formative scan to gauge mastery before the next lesson.'
  }
];

export const COMMON_MISTAKES: CommonMistake[] = [
  {
    mistake: '2⁻³ = −8 or −6',
    correction: '2⁻³ = 1 / 2³ = 1/8',
    explanation: 'A negative index does not mean the number is negative. The minus sign in the exponent means reciprocal (division by 2, three times).',
    example: 'Think of 2⁻³ as 1 ÷ 2 ÷ 2 ÷ 2 = 1/8 = 0.125.'
  },
  {
    mistake: '8⁰ = 0',
    correction: '8⁰ = 1',
    explanation: 'Any non-zero number to the power of 0 equals 1. In the pattern 8²=64, 8¹=8, dividing by 8 gives 8⁰ = 8 ÷ 8 = 1.',
    example: '8⁰ = 8¹ ÷ 8¹ = 8/8 = 1.'
  },
  {
    mistake: '2³ × 2⁴ = 4⁷ (multiplying the bases)',
    correction: '2³ × 2⁴ = 2⁷ = 128',
    explanation: 'When multiplying powers with the same base, the base remains unchanged and you add the indices: aᵐ × aⁿ = aᵐ⁺ⁿ.',
    example: '(2 × 2 × 2) × (2 × 2 × 2 × 2) = seven 2s multiplied together = 2⁷.'
  },
  {
    mistake: '2³ × 3² = 6⁵ (adding indices with different bases)',
    correction: '2³ × 3² = 8 × 9 = 72',
    explanation: 'Index laws only apply when the bases are the SAME. If bases differ, calculate each power separately.',
    example: '2³ = 8, 3² = 9, so 8 × 9 = 72. You cannot write 6⁵!'
  },
  {
    mistake: '4² ÷ 4⁵ = 4³ (subtracting in reverse)',
    correction: '4² ÷ 4⁵ = 4²⁻⁵ = 4⁻³ = 1/64',
    explanation: 'Subtract the second index from the first index in exact order: 2 − 5 = −3, NOT 5 − 2 = 3.',
    example: '4² ÷ 4⁵ = (4×4) / (4×4×4×4×4) = 1 / 4³ = 4⁻³.'
  }
];

export const EXIT_TICKET_QUESTIONS = [
  {
    question: '1. What is the exact value of 3⁻² as a fraction?',
    options: ['−9', '−6', '1/9', '1/6'],
    correct: '1/9',
    explanation: '3⁻² = 1 / 3² = 1/9.'
  },
  {
    question: '2. Evaluate 5⁴ ÷ 5⁴ as a single number:',
    options: ['0', '1', '5', '5⁸'],
    correct: '1',
    explanation: '5⁴ ÷ 5⁴ = 5⁴⁻⁴ = 5⁰ = 1. Any non-zero number divided by itself is 1.'
  },
  {
    question: '3. Simplify x³ × x⁻⁵ as a single power of x:',
    options: ['x⁸', 'x⁻²', 'x⁻¹⁵', 'x²'],
    correct: 'x⁻²',
    explanation: 'x³ × x⁻⁵ = x³⁺⁽⁻⁵⁾ = x⁻² (which also equals 1/x²).'
  }
];

export const WORKSHEET_A: WorksheetData = {
  id: 'practice',
  title: 'Worksheet A: Practice',
  code: 'WA-1.3',
  subtitle: 'Positive, Negative & Zero Indices and Multiplication/Division Laws',
  description: '23 structured practice questions to master exponent laws step-by-step.',
  parts: [
    {
      id: 'part1',
      partNumber: 'Part 1',
      title: 'Evaluate',
      subtitle: 'Calculate the exact value of each term (give fractions in simplified form or decimals)',
      questions: [
        { id: 'wa_1', questionNumber: 1, type: 'numeric', promptPrefix: '2⁴ =', expectedAnswer: '16', hint: '2 × 2 × 2 × 2' },
        { id: 'wa_2', questionNumber: 2, type: 'numeric', promptPrefix: '5² =', expectedAnswer: '25', hint: '5 × 5' },
        { id: 'wa_3', questionNumber: 3, type: 'numeric', promptPrefix: '10³ =', expectedAnswer: '1000', hint: '10 × 10 × 10' },
        { id: 'wa_4', questionNumber: 4, type: 'numeric', promptPrefix: '7⁰ =', expectedAnswer: '1', hint: 'Any non-zero number to power 0 equals 1' },
        { id: 'wa_5', questionNumber: 5, type: 'numeric', promptPrefix: '3⁻¹ =', expectedAnswer: '1/3|0.333|0.33', hint: '3⁻¹ = 1/3¹' },
        { id: 'wa_6', questionNumber: 6, type: 'numeric', promptPrefix: '2⁻³ =', expectedAnswer: '1/8|0.125', hint: '2⁻³ = 1 / 2³ = 1/8' },
        { id: 'wa_7', questionNumber: 7, type: 'numeric', promptPrefix: '10⁻² =', expectedAnswer: '1/100|0.01', hint: '10⁻² = 1 / 10² = 1/100' },
        { id: 'wa_8', questionNumber: 8, type: 'numeric', promptPrefix: '4⁻² =', expectedAnswer: '1/16|0.0625', hint: '4⁻² = 1 / 4² = 1/16' }
      ]
    },
    {
      id: 'part2',
      partNumber: 'Part 2',
      title: 'Multiply and Divide',
      subtitle: 'Write each expression as a single power. Fill in the missing exponent.',
      questions: [
        { id: 'wa_9', questionNumber: 9, type: 'power_exponent', base: 3, promptPrefix: '3² × 3⁴ = 3', expectedAnswer: '6', hint: 'Add indices: 2 + 4' },
        { id: 'wa_10', questionNumber: 10, type: 'power_exponent', base: 5, promptPrefix: '5⁷ × 5⁻² = 5', expectedAnswer: '5', hint: 'Add indices: 7 + (-2)' },
        { id: 'wa_11', questionNumber: 11, type: 'power_exponent', base: 2, promptPrefix: '2³ × 2⁻³ = 2', expectedAnswer: '0', hint: 'Add indices: 3 + (-3)' },
        { id: 'wa_12', questionNumber: 12, type: 'power_exponent', base: 6, promptPrefix: '6⁸ ÷ 6³ = 6', expectedAnswer: '5', hint: 'Subtract indices: 8 - 3' },
        { id: 'wa_13', questionNumber: 13, type: 'power_exponent', base: 4, promptPrefix: '4² ÷ 4⁵ = 4', expectedAnswer: '-3', hint: 'Subtract indices: 2 - 5' },
        { id: 'wa_14', questionNumber: 14, type: 'power_exponent', base: 9, promptPrefix: '9⁻² × 9⁶ = 9', expectedAnswer: '4', hint: 'Add indices: -2 + 6' }
      ]
    },
    {
      id: 'part3',
      partNumber: 'Part 3',
      title: 'Find the Missing Index',
      subtitle: 'Find the integer exponent that makes each equation true',
      questions: [
        { id: 'wa_15', questionNumber: 15, type: 'numeric', promptPrefix: '2[ ? ] × 2³ = 2⁸  →  ? =', expectedAnswer: '5', hint: '? + 3 = 8, so ? = 8 - 3' },
        { id: 'wa_16', questionNumber: 16, type: 'numeric', promptPrefix: '7⁹ ÷ 7[ ? ] = 7⁴  →  ? =', expectedAnswer: '5', hint: '9 - ? = 4, so ? = 9 - 4' },
        { id: 'wa_17', questionNumber: 17, type: 'numeric', promptPrefix: '3[ ? ] = 1  →  ? =', expectedAnswer: '0', hint: 'What power gives 1?' },
        { id: 'wa_18', questionNumber: 18, type: 'numeric', promptPrefix: '5[ ? ] = 1/5  →  ? =', expectedAnswer: '-1', hint: '1/5¹ = 5⁻¹' }
      ]
    },
    {
      id: 'part4',
      partNumber: 'Part 4',
      title: 'True or False',
      subtitle: 'Decide whether each statement is mathematically true or false',
      questions: [
        { id: 'wa_19', questionNumber: 19, type: 'true_false', promptPrefix: '2³ × 2² = 2⁶', expectedAnswer: 'false', explanation: 'False: You ADD exponents, so 2³ × 2² = 2⁵, not 2⁶.' },
        { id: 'wa_20', questionNumber: 20, type: 'true_false', promptPrefix: '8⁰ = 0', expectedAnswer: 'false', explanation: 'False: Any non-zero number to power 0 equals 1. So 8⁰ = 1.' },
        { id: 'wa_21', questionNumber: 21, type: 'true_false', promptPrefix: '10⁴ ÷ 10² = 10²', expectedAnswer: 'true', explanation: 'True: 10⁴⁻² = 10² = 100.' },
        { id: 'wa_22', questionNumber: 22, type: 'true_false', promptPrefix: '2⁻¹ = −2', expectedAnswer: 'false', explanation: 'False: Negative index means reciprocal, so 2⁻¹ = 1/2 = 0.5, not -2.' },
        { id: 'wa_23', questionNumber: 23, type: 'true_false', promptPrefix: '5⁻² = 1/25', expectedAnswer: 'true', explanation: 'True: 5⁻² = 1 / 5² = 1/25.' }
      ]
    }
  ]
};

export const WORKSHEET_B: WorksheetData = {
  id: 'challenge',
  title: 'Worksheet B: Challenge',
  code: 'WB-1.3',
  subtitle: 'Combining Laws, Algebraic Indices, Error Analysis & Real-World Context',
  description: '17 challenging multi-step questions to deepen conceptual understanding.',
  parts: [
    {
      id: 'wb_part1',
      partNumber: 'Part 1',
      title: 'Combine the Laws',
      subtitle: 'Apply both multiplication and division rules to simplify as single powers',
      questions: [
        { id: 'wb_1_exp', questionNumber: 1, type: 'power_exponent', base: 2, promptPrefix: '2⁵ × 2⁻² ÷ 2¹ = 2', promptSuffix: '(write exponent)', expectedAnswer: '2', hint: '5 + (-2) - 1 = 2' },
        { id: 'wb_1_val', questionNumber: 1, type: 'numeric', promptPrefix: '... and its exact value is', expectedAnswer: '4', hint: '2² = 4' },
        { id: 'wb_2', questionNumber: 2, type: 'power_exponent', base: 5, promptPrefix: '(5⁻² × 5⁴) ÷ 5⁻¹ = 5', expectedAnswer: '3', hint: '(-2 + 4) - (-1) = 2 - (-1) = 3' },
        { id: 'wb_3', questionNumber: 3, type: 'power_exponent', base: 7, promptPrefix: '7⁻³ × 7³ ÷ 7⁻⁴ = 7', expectedAnswer: '4', hint: '(-3 + 3) - (-4) = 0 - (-4) = 4' }
      ]
    },
    {
      id: 'wb_part2',
      partNumber: 'Part 2',
      title: 'Find the Unknown Index x',
      subtitle: 'Solve each equation for x',
      questions: [
        { id: 'wb_4', questionNumber: 4, type: 'numeric', promptPrefix: '3ˣ × 3⁵ = 3²  →  x =', expectedAnswer: '-3', hint: 'x + 5 = 2  →  x = 2 - 5' },
        { id: 'wb_5', questionNumber: 5, type: 'numeric', promptPrefix: '2ˣ ÷ 2⁻³ = 2⁷  →  x =', expectedAnswer: '4', hint: 'x - (-3) = 7  →  x + 3 = 7' },
        { id: 'wb_6', questionNumber: 6, type: 'numeric', promptPrefix: '5ˣ = 1/25  →  x =', expectedAnswer: '-2', hint: '1/25 = 1/5² = 5⁻²' },
        { id: 'wb_7', questionNumber: 7, type: 'numeric', promptPrefix: '10ˣ = 0.0001  →  x =', expectedAnswer: '-4', hint: '0.0001 = 1/10000 = 10⁻⁴' },
        { id: 'wb_8', questionNumber: 8, type: 'numeric', promptPrefix: '2ˣ × 2ˣ = 2⁻¹⁰  →  x =', expectedAnswer: '-5', hint: 'x + x = 2x = -10' }
      ]
    },
    {
      id: 'wb_part3',
      partNumber: 'Part 3',
      title: 'Compare and Find the Error',
      subtitle: 'Conceptual analysis and reasoning',
      questions: [
        { id: 'wb_9', questionNumber: 9, type: 'expression', promptPrefix: 'Which is larger: 2⁻³ or 3⁻²? (Type "2^-3" or "3^-2")', expectedAnswer: '2^-3|2⁻³|1/8', explanation: '2⁻³ = 1/8 = 0.125, while 3⁻² = 1/9 ≈ 0.111. Since 1/8 > 1/9, 2⁻³ is larger!' },
        { id: 'wb_10', questionNumber: 10, type: 'open_text', promptPrefix: 'Sam writes: "2³ × 2⁴ = 4⁷". What was Sam\'s mistake?', expectedAnswer: 'base|multiply|same base', modelAnswer: 'Sam multiplied the bases (2 × 2 = 4) when the base must stay unchanged. The correct calculation is 2³ × 2⁴ = 2³⁺⁴ = 2⁷ = 128.' }
      ]
    },
    {
      id: 'wb_part4',
      partNumber: 'Part 4',
      title: 'Letters as Indices',
      subtitle: 'Simplify algebraic index expressions',
      questions: [
        { id: 'wb_11', questionNumber: 11, type: 'expression', promptPrefix: 'Simplify: x⁵ × x⁻² ÷ x⁴ =', expectedAnswer: 'x^-1|1/x|x⁻¹', hint: '5 + (-2) - 4 = -1, giving x⁻¹ or 1/x' },
        { id: 'wb_12', questionNumber: 12, type: 'expression', promptPrefix: 'Simplify: y⁻² × y⁷ ÷ y³ =', expectedAnswer: 'y^2|y²', hint: '-2 + 7 - 3 = 2, giving y²' },
        { id: 'wb_13', questionNumber: 13, type: 'expression', promptPrefix: 'Write 8 × 2ⁿ as a single power of 2:', expectedAnswer: '2^(n+3)|2^(3+n)|2^n+3', hint: 'Notice 8 = 2³. So 2³ × 2ⁿ = 2ⁿ⁺³' },
        { id: 'wb_14_exp', questionNumber: 14, type: 'power_exponent', base: 3, promptPrefix: 'Simplify: 3ⁿ⁺² ÷ 3ⁿ = 3', promptSuffix: '(exponent)', expectedAnswer: '2', hint: '(n + 2) - n = 2' },
        { id: 'wb_14_val', questionNumber: 14, type: 'numeric', promptPrefix: '... and its exact numerical value is', expectedAnswer: '9', hint: '3² = 9' }
      ]
    },
    {
      id: 'wb_part5',
      partNumber: 'Part 5',
      title: 'In Context',
      subtitle: 'Real-world modelling with powers and scientific notation',
      questions: [
        { id: 'wb_15', questionNumber: 15, type: 'numeric', promptPrefix: 'Video views model V(t) = 1000 × 2ᵗ. How many views at t = −2?', expectedAnswer: '250', hint: '1000 × 2⁻² = 1000 × (1/4) = 250' },
        { id: 'wb_16', questionNumber: 16, type: 'numeric', promptPrefix: 'By what factor do views increase from t = 2 to t = 5?', expectedAnswer: '8', hint: '2⁵ ÷ 2² = 2³ = 8' },
        { id: 'wb_17', questionNumber: 17, type: 'numeric', promptPrefix: 'Virus diameter is 10⁻⁷ m. Cell diameter is 10⁻⁵ m. How many times wider is the cell?', expectedAnswer: '100', hint: '10⁻⁵ ÷ 10⁻⁷ = 10⁻⁵⁻⁽⁻⁷⁾ = 10² = 100' },
        { id: 'wb_18_a', questionNumber: 18, type: 'numeric', promptPrefix: 'If 2ᵃ × 2ᵇ = 2⁵ and 2ᵃ ÷ 2ᵇ = 2¹, find a:', expectedAnswer: '3', hint: 'a + b = 5 and a - b = 1. Adding gives 2a = 6 → a = 3' },
        { id: 'wb_18_b', questionNumber: 18, type: 'numeric', promptPrefix: '... and find b:', expectedAnswer: '2', hint: '3 + b = 5 → b = 2' }
      ]
    }
  ]
};
