import { ConditionValue } from "./FilterElement/ConditionValue";

export const CONTROL_DEFAULTS = {
  text: "",
  number: "",
  "number.range": [] as unknown as [string, string],
  multiselect: [] as ConditionValue,
  select: "",
  combobox: "",
};

export const getDefaultByControlName = (name: string): ConditionValue =>
  CONTROL_DEFAULTS[name as keyof typeof CONTROL_DEFAULTS];
