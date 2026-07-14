import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { useTagList } from "@/hooks/usePosts";

type UseTagsBoxParams = {
  value: string[];
  onChange: (tags: string[]) => void;
};

/**
 * Owns the tag-box state: the fetched list, the user's custom tags, the search
 * query, filtering, virtualization and the check/add handlers. The component
 * just wires the return values into JSX.
 */
export function useTagsBox({ value, onChange }: UseTagsBoxParams) {
  const { data: fetchedTags, isPending } = useTagList();
  const [newTag, setNewTag] = useState("");
  // Tags the user typed (or that were pre-filled on edit) which aren't in the fetched list. Kept so they stay visible in the box even when unchecked.
  const [customTags, setCustomTags] = useState<string[]>(() => value);

  // The full, stable list: custom tags (not in the fetched list) first, then the sorted fetched tags.
  const allTags = useMemo(() => {
    const sorted = [...(fetchedTags ?? [])].sort((a, b) => a.localeCompare(b));
    const fetchedSet = new Set(sorted);
    const extras = [...new Set(customTags)].filter((tag) => !fetchedSet.has(tag));
    return [...extras, ...sorted];
  }, [fetchedTags, customTags]);

  // The filtered view shown in the box, narrowed by what the user is typing.
  const displayTags = useMemo(() => {
    const query = newTag.trim().toLowerCase();
    if (!query) return allTags;
    return allTags.filter((tag) => tag.toLowerCase().includes(query));
  }, [allTags, newTag]);

  // The tag list can be long, so only the visible rows are rendered.
  const listRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: displayTags.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 28,
    overscan: 8,
  });

  const toggle = (tag: string) => {
    onChange(value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag]);
  };

  const addNewTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;

    if (allTags.includes(trimmed)) {
      // Already listed → Enter just checks/unchecks it.
      toggle(trimmed);
    } else {
      // Brand new → add to the box and check it by default.
      setCustomTags((prev) => [trimmed, ...prev]);
      onChange([...value, trimmed]);
    }
    setNewTag("");
  };

  return { newTag, setNewTag, displayTags, isPending, listRef, virtualizer, toggle, addNewTag };
}
