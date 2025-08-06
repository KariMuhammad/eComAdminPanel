// ➊ أداة صغيرة لاختيار المفاتيح (keys) التي نوعها Array
export type ArrayKeys<T> = {
  [K in keyof T]-?: NonNullable<T[K]> extends readonly any[] // حافظ على الـ key // هل قيمته Array؟
  ? K // ✓ احفظه
  : never; // ✗ تجاهله
}[keyof T];

// ➋ أداة لاستخراج نوع العنصر داخل الـ Array
export type ElementOf<T> = T extends readonly (infer U)[] ? U : never;

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
}

export enum ModalSizes {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  full = "full"
}