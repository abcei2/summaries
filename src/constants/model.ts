import { SurveyCreateParamFormType } from "../../types";

const MODELS = [
  {
    value: "gpt-3.5-turbo-16k",
    label: "gpt-3.5-turbo-16k",
  },
  {
    value: "gpt-4",
    label: "gpt-4",
  }
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
    value: "clustering",
    label: "clustering",
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
    value: "large",
    label: "large",
  },
];

export const PARAMS: SurveyCreateParamFormType[] = [
  {
    name: "methods",
    type: "select",
    values: METHODS,
    defaultValue: "sections1",
  },
  {
    name: "m1",
    type: "select",
    values: MODELS,
    defaultValue: "gpt-3.5-turbo-16k",
  },
  {
    name: "m2",
    type: "select",
    values: MODELS,
    defaultValue: "gpt-3.5-turbo-16k",
  },
  {
    name: "length",
    type: "select",
    values: LENGTHS,
    defaultValue: "medium",
  },
  {
    name: "p1",
    type: "textarea",
    defaultValue: "Summarize the text, extract relevant information, explaining themes, key concepts and ideas in a detailed and long summary (not bullet points or numbered).",
  },
  {
    name: "p2",
    type: "textarea",
    defaultValue: "Give a informative title and summarize the text in three bullet points. The summary must contain insights and relevant ideas.",
  },
  {
    name: "temp",
    type: "number",
    defaultValue: 0.5,
  },
];