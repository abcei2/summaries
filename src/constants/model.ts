import { SumaryCreateParamFormType, SumaryCreateParams } from "../types";

const MODELS = [
  {
    value: "gpt-3.5-turbo-16k",
    label: "gpt-3.5 (fast)",
  },
  {
    value: "gpt-4",
    label: "gpt-4  (slow)",
  },
];

const METHODS = [
  {
    value: "sections1",
    label: "sections1",
  },
  {
    value: "sections2",
    label: "sections2",
  },
  {
    value: "sections_refine",
    label: "sections_refine",
  },
  {
    value: "clustering",
    label: "clustering",
  },
  {
    value: "dummy",
    label: "dummy (10 secs delay for frontend tests)",
  },
];

const PROMPTS = [
  {
    value: "prompt0",
    label: "prompt 0",
  },
  {
    value: "prompt1",
    label: "prompt 1",
  },
  {
    value: "prompt2",
    label: "prompt 2",
  },
];

const LENGTHS = [
  {
    value: "short",
    label: "short",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "long",
    label: "long",
  },
];

export const PARAMS: SumaryCreateParamFormType[] = [
  {
    name: "method",
    type: "select",
    values: METHODS,
    defaultValue: "sections_refine",
    costeable: true,
  },
  {
    name: "m1",
    type: "select",
    values: MODELS,
    defaultValue: "gpt-3.5-turbo-16k",
    costeable: true,
  },
  {
    name: "length",
    type: "select",
    values: LENGTHS,
    defaultValue: "medium",
    costeable: false,
  },
  {
    name: "prompt",
    type: "select",
    values: PROMPTS,
    defaultValue: "prompt1",
    costeable: false,
    // defaultValue: "Summarize the text, extract relevant information, explaining themes, key concepts and ideas in a detailed and long summary (not bullet points or numbered).",
  },
];

export const DEFAULT_SUMMARY_PARAMS:SumaryCreateParams = {
  method: "sections_refine",
  m1: "gpt-4",
  length: "long",
  p1: "prompt1",
};
