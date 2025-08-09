"use client";

import {
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
} from "@/components/ai-elements/prompt-input";
import { SelectGroup, SelectLabel } from "@/components/ui/select";
import { useModel } from "@/hooks/model";

export default function ReasoningSelect() {
  const { reasoningOptions, setReasoningEffort, reasoningEffort } = useModel();
  if (reasoningOptions.length === 0) return null;
  const isReasonSupported = reasoningEffort
    ? reasoningOptions.includes(reasoningEffort)
    : false;
  return (
    <PromptInputModelSelect
      onValueChange={(value) => {
        setReasoningEffort(value);
      }}
      value={
        isReasonSupported ? (reasoningEffort as string) : reasoningOptions[0]
      }
    >
      <PromptInputModelSelectTrigger>
        <PromptInputModelSelectValue />
      </PromptInputModelSelectTrigger>
      <PromptInputModelSelectContent>
        <SelectGroup>
          <SelectLabel>Reasoning Effort</SelectLabel>
          {reasoningOptions.map((option) => (
            <PromptInputModelSelectItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </PromptInputModelSelectItem>
          ))}
        </SelectGroup>
      </PromptInputModelSelectContent>
    </PromptInputModelSelect>
  );
}
