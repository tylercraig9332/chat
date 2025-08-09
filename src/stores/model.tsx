"use client";

import { create } from "zustand";
import { ChatModel, DEFAULT_MODEL, getReasoningEffort } from "@/lib/models";
import { setModelCookie } from "@/actions/model";

interface ModelStore {
  selectedModel: ChatModel;
  setSelectedModel: (model: ChatModel) => void;
  reasoningOptions: string[];
  setReasoningOptions: (options: string[]) => void;
  reasoningEffort: string | null;
  setReasoningEffort: (effort: string | null) => void;
}

export const useModelStore = create<ModelStore>((set) => ({
  selectedModel: DEFAULT_MODEL,
  setSelectedModel: (model) => {
    const reasoningOptions = getReasoningEffort(model);
    set({ selectedModel: model, reasoningOptions });
    setModelCookie(model.value);
  },
  reasoningOptions: [],
  setReasoningOptions: (options) => set({ reasoningOptions: options }),
  reasoningEffort: null,
  setReasoningEffort: (effort) => set({ reasoningEffort: effort }),
}));
