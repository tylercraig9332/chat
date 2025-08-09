export interface ChatModel {
  id: string;
  name: string;
  value: string;
  provider: string;
  description?: string;
  providerOptions?: ProviderOptions;
}

export type ProviderOptions = GPT5ProviderOptions | GeminiProviderOptions;

export interface GPT5ProviderOptions {
  reasoningEffort: "minimal" | "low" | "medium" | "high";
}

export interface GeminiProviderOptions {
  thinkingConfig: {
    thinkingBudget: number;
    includeThoughts: boolean;
  };
}

export const models: ChatModel[] = [
  {
    id: "gpt-5",
    name: "GPT-5",
    value: "openai/gpt-5",
    provider: "openai",
    providerOptions: {
      reasoningEffort: "high",
    },
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    value: "google/gemini-2.5-pro",
    provider: "google",
    providerOptions: {
      thinkingConfig: {
        thinkingBudget: 8192,
        includeThoughts: true,
      },
    },
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    value: "google/gemini-2.5-flash",
    provider: "google",
    providerOptions: {
      thinkingConfig: {
        thinkingBudget: 1024,
        includeThoughts: true,
      },
    },
  },
];

export const DEFAULT_MODEL = models[0];
export const DEFAULT_SERVICE_MODEL = models.find(
  (model) => model.id === "gemini-2.5-flash"
) as ChatModel;

export const getReasoningEffort = (model: ChatModel) => {
  // Default will be the first index of the array
  // TODO: Change this to be based on if model supports reasoning or not rather than provider
  switch (model.provider) {
    case "openai":
      return ["medium", "minimal", "low", "high"];
    case "google":
      return ["Dynamic", "Off"];
    default:
      return [];
  }
};

export const translateReasoningEffort = (
  model: ChatModel,
  reasoningEffort: string
) => {
  switch (model.provider) {
    case "openai":
      return {
        reasoningEffort: reasoningEffort,
      };
    case "google":
      return {
        thinkingConfig: {
          thinkingBudget: -1,
          includeThoughts: true,
        },
      };
    default:
      return {};
  }
};
