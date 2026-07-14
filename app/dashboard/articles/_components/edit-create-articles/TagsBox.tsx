"use client";

import { Checkbox } from "@/components/design-system/checkbox";
import { Field } from "@/components/design-system/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useTagsBox } from "../../_hooks/useTagsBox";

type TagsBoxProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  className?: string;
};

export function TagsBox({ value, onChange, className }: TagsBoxProps) {
  const { newTag, setNewTag, displayTags, isPending, listRef, virtualizer, toggle, addNewTag } =
    useTagsBox({ value, onChange });

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-md border border-neutral-st3 bg-neutral-bg1 p-6",
        className,
      )}
    >
      <Field label labelText="Tags" required={false} message={false} htmlFor="new-tag">
        <Input
          id="new-tag"
          placeholder="New tag"
          value={newTag}
          onChange={(event) => setNewTag(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addNewTag();
            }
          }}
        />
      </Field>

      <div ref={listRef} className="max-h-96 overflow-y-auto rounded-2xl border border-neutral-st3">
        {isPending ? (
          <div className="flex justify-center p-4">
            <Spinner className="size-6" />
          </div>
        ) : displayTags.length === 0 ? (
          <p className="p-4 text-body2 text-neutral-fg2">
            {newTag.trim() ? "No matching tags. Press Enter to create it." : "No tags available."}
          </p>
        ) : (
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((item) => {
              const tag = displayTags[item.index];
              return (
                <div
                  key={tag}
                  data-index={item.index}
                  ref={virtualizer.measureElement}
                  className="absolute top-0 left-0 flex w-full items-center px-4 py-1.5"
                  style={{ transform: `translateY(${item.start}px)` }}
                >
                  <Checkbox
                    label={tag}
                    checked={value.includes(tag)}
                    onCheckedChange={() => toggle(tag)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
