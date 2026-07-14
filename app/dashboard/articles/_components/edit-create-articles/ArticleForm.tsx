"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Field } from "@/components/design-system/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost, useUpdatePost } from "@/hooks/usePosts";
import type { Post } from "@/lib/api/posts/interfaces";
import { ARTICLES_PATH } from "@/lib/constants/constants";
import { TagsBox } from "./TagsBox";

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Required field"),
  body: Yup.string().trim().required("Required field"),
});

type ArticleFormValues = {
  title: string;
  description: string;
  body: string;
  tags: string[];
};

export function ArticleForm({ post }: { post?: Post }) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const formik = useFormik<ArticleFormValues>({
    initialValues: {
      title: post?.title ?? "",
      description: "",
      body: post?.body ?? "",
      tags: post?.tags ?? [],
    },
    validationSchema,
    onSubmit: (values) => {
      const backToList = () => router.push(ARTICLES_PATH);
      if (post) {
        updateMutation.mutate({ id: post.id, data: values }, { onSuccess: backToList });
      } else {
        createMutation.mutate(values, { onSuccess: backToList });
      }
    },
  });

  const fieldError = (name: "title" | "body") =>
    formik.touched[name] ? (formik.errors[name] as string | undefined) : undefined;

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 md:flex-row md:items-start">
      <Section title={isEdit ? "Edit article" : "New article"} className="flex-1">
        <div className="flex w-full flex-col gap-3">
          <Field
            htmlFor="title"
            labelText="Title"
            required={false}
            message={Boolean(fieldError("title"))}
            messageText={fieldError("title")}
          >
            <Input
              id="title"
              name="title"
              placeholder="Current title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(fieldError("title"))}
            />
          </Field>

          <Field htmlFor="description" labelText="Description" required={false} message={false}>
            <Input
              id="description"
              name="description"
              placeholder="Current description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Field>

          <Field
            htmlFor="body"
            labelText="Body"
            required={false}
            message={Boolean(fieldError("body"))}
            messageText={fieldError("body")}
          >
            <Textarea
              id="body"
              name="body"
              placeholder="Current body"
              className="min-h-40"
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(fieldError("body"))}
            />
          </Field>

          <Button type="submit" className="self-start" loading={isSubmitting}>
            Submit
          </Button>
        </div>
      </Section>

      <TagsBox
        className="w-full md:w-96"
        value={formik.values.tags}
        onChange={(tags) => formik.setFieldValue("tags", tags)}
      />
    </form>
  );
}
