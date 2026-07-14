"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { EllipsisIcon } from "@/components/icons";
import { ActionSheet } from "@/components/design-system/action-sheet";
import { Modal } from "@/components/design-system/modal";
import { Button } from "@/components/ui/button";
import { ConfirmationContent } from "@/components/ui/confirmation-content";
import { DropdownMenu, type DropdownMenuAction } from "@/components/ui/dropdown-menu";
import { useDeletePost } from "@/hooks/usePosts";
import { ARTICLES_PATH } from "@/lib/constants/constants";
import { Post } from "@/lib/api/posts/interfaces";

type ArticleRowActionsProps = {
  post: Post;
  /** `menu` on desktop (dropdown), `sheet` on mobile (bottom sheet). */
  as: "menu" | "sheet";
};

export function ArticleRowActions({ post, as }: ArticleRowActionsProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deleteMutation = useDeletePost();

  const items: DropdownMenuAction[] = [
    {
      title: "Edit",
      onClick: () => {
        setMenuOpen(false);
        router.push(`${ARTICLES_PATH}/${post.id}`);
      },
    },
    {
      title: "Delete",
      onClick: () => {
        setMenuOpen(false);
        setConfirmOpen(true);
      },
    },
  ];

  const trigger = (
    <Button variant="secondary" size="icon" aria-label={`Actions for ${post.title}`}>
      <EllipsisIcon className="size-5" />
    </Button>
  );

  return (
    <>
      {as === "menu" ? (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} trigger={trigger} items={items} />
      ) : (
        <ActionSheet title={post.title} trigger={trigger} items={items} />
      )}

      <Modal
        isOpen={confirmOpen}
        title="Delete article"
        danger
        confirmButtonText="Delete"
        confirmLoading={deleteMutation.isPending}
        cancelButtonAction={() => {
          setConfirmOpen(false);
        }}
        confirmButtonAction={() =>
          deleteMutation.mutate(post.id, { onSuccess: () => setConfirmOpen(false) })
        }
      >
        <ConfirmationContent type="error" message="Are you sure you want to delete this article?" />
      </Modal>
    </>
  );
}
