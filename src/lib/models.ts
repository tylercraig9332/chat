export interface ChatModel {
    id: string;
    name: string;
    value: string;
    description?: string;
}

export const chatModels: ChatModel[] = [
    {
        id: "gpt-5",
        name: "GPT-5",
        value: "openai/gpt-5",
    },
];