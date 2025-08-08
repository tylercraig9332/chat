"use client";

import { Sources, Source, SourcesContent, SourcesTrigger } from "@/components/ai-elements/source";
import { UIMessage } from "@ai-sdk/react";

export default function SourcesSection({ message }: { message: UIMessage }) {
  return (
    <>
      {message.role === 'assistant' && (
        <Sources>
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'source-url':
                return (
                  <>
                    <SourcesTrigger
                      count={
                        message.parts.filter(
                          (part) => part.type === 'source-url',
                        ).length
                      }
                    />
                    <SourcesContent key={`${message.id}-${i}`}>
                      <Source
                        key={`${message.id}-${i}`}
                        href={part.url}
                        title={part.url}
                      />
                    </SourcesContent>
                  </>
                );
            }
          })}
        </Sources>
      )}
    </>
  )
}