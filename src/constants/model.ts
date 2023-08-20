const MODELS = [
  {
    value: "gpt-3.5-turbo-16k",
    label: "gpt-3.5-turbo-16k",
  },
];

const METHODS = [
  {
    value: "sections",
    label: "sections",
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

export const PARAMS: {
  name: string;
  type: string;
  values?: {
    value: string;
    label: string;
  }[];
}[] = [
  {
    name: "methods",
    type: "select",
    values: METHODS,
  },
  {
    name: "models",
    type: "select",
    values: MODELS,
  },
  {
    name: "length",
    type: "select",
    values: LENGTHS,
  },
  {
    name: "p1",
    type: "textarea",
  },
  {
    name: "p2",
    type: "textarea",
  },
  {
    name: "temp",
    type: "number",
  },
];
