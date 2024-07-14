import { SumaryCreateParamFormType, SumaryCreateParams } from "../types";

const MODELS = [
  {
    value: "gpt-3.5-turbo-16k",
    label: "gpt-3.5-turbo",
  },
  {
    value: "gpt-4",
    label: "gpt-4",
  },
  {
    value: "gpt-4-1106-preview",
    label: "gpt-4-turbo",

  },
  {
    value: "gpt-4o",
    label: "gpt-4o",
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
    value: "prompt0-english-",
    label: "prompt 0 - english",
  },
  {
    value: "prompt0-spanish-",
    label: "prompt 0 - spanish",
  },
  {
    value: "prompt1-english-",
    label: "prompt 1 - english",
  },
  {
    value: "prompt1-spanish-",
    label: "prompt 1 - spanish",
  },
  /*{
    value: "prompt2",
    label: "prompt 2",
  },*/

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
    name: "model",
    type: "select",
    values: MODELS,
    defaultValue: "gpt-4o",//"gpt-4-1106-preview",
    costeable: true,
  },
  {
    name: "length",
    type: "select",
    values: LENGTHS,
    defaultValue: "long",
    costeable: false,
  },
  {
    name: "prompt",
    type: "select",
    values: PROMPTS,
    defaultValue: "prompt1-english-",
    costeable: false,
    // defaultValue: "Summarize the text, extract relevant information, explaining themes, key concepts and ideas in a detailed and long summary (not bullet points or numbered).",
  },
];

export const DEFAULT_SUMMARY_PARAMS:SumaryCreateParams = {
  method: "sections_refine",
  model: "gpt-4o",//"gpt-4-1106-preview",//"gpt-4",
  length: "long",
  prompt: "prompt1-english-",
};
