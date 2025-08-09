"use client";

import { ChatModel, models } from "@/lib/models";
import {
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
} from "@/components/ai-elements/prompt-input";
import { useModel } from "@/hooks/model";
import { SelectGroup, SelectLabel } from "@/components/ui/select";

export default function ModelSelect() {
  const { selectedModel, setSelectedModel } = useModel();

  return (
    <PromptInputModelSelect
      onValueChange={(value) =>
        setSelectedModel(models.find((m) => m.value === value)!)
      }
      value={selectedModel?.value ?? models[0].value}
    >
      <PromptInputModelSelectTrigger>
        <PromptInputModelSelectValue />
      </PromptInputModelSelectTrigger>
      <PromptInputModelSelectContent>
        <SelectGroup>
          <SelectLabel>Model</SelectLabel>
          {models.map((model) => (
            <PromptInputModelSelectItem key={model.value} value={model.value}>
              {model.name}
            </PromptInputModelSelectItem>
          ))}
        </SelectGroup>
      </PromptInputModelSelectContent>
    </PromptInputModelSelect>
  );
}
