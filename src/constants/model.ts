import { SumaryCreateParamFormType } from "../types";

const MODELS = [
  {
    value: "gpt-3.5-turbo-16k",
    label: "gpt-3.5 (fast)",
  },
  {
    value: "gpt-4",
    label: "gpt-4  (slow)",
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
  }
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
    defaultValue: "sections2",
    costeable: true
  },
  {
    name: "m1",
    type: "select",
    values: MODELS,
    defaultValue: "gpt-3.5-turbo-16k",
    costeable: true
  },
  {
    name: "m2",
    type: "select",
    values: MODELS,
    defaultValue: "gpt-3.5-turbo-16k",
    costeable: true
  },
  {
    name: "length",
    type: "select",
    values: LENGTHS,
    defaultValue: "medium",
    costeable: false
  },
  {
    name: "p1",
    type: "textarea",
    defaultValue: "",
    costeable: false
    // defaultValue: "Summarize the text, extract relevant information, explaining themes, key concepts and ideas in a detailed and long summary (not bullet points or numbered).",
  },
  {
    name: "p2",
    type: "textarea",
    defaultValue: "",
    costeable: false
    //defaultValue: "Give a informative title and summarize the text in three bullet points. The summary must contain insights and relevant ideas.",
  },
  {
    name: "recurrency",
    type: "number",
    defaultValue: 5,
    costeable: false
  }
];