import cx from "classnames";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { memo, startTransition, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAttachFile, MdImage } from "react-icons/md";
import useSaveDraft from "../hooks/useSaveDraft.js";
import { delay } from "../utils/time.js";

type EditFormProps = {
  onSubmit?: (data: FormValues) => void;
};

export type FormValues = {
  title: string;
  content: string;
};

const EditForm = ({ onSubmit }: EditFormProps) => {
  const [draft, setDraft] = useSaveDraft();
  const titleId = useId();
  const editorId = useId();
  const form = useForm<FormValues>({
    defaultValues: draft ?? { title: "", content: "" },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setDraft(data);
    onSubmit?.(data);
  });

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const timerId = window.setInterval(async () => {
      setIsSaving(true);
      setDraft(form.getValues());
      await delay(500);
      setIsSaving(false);
    }, 10 * 1_000);

    return () => window.clearInterval(timerId);
  }, [form, setDraft, setIsSaving]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4 gap-y-2">
        <Label htmlFor={titleId}>제목</Label>
        <TextInput
          id={titleId}
          color={!!form.formState.errors.title ? "failure" : undefined}
          type="text"
          placeholder="제목을 입력해주세요"
          {...form.register("title", { required: true })}
        />
      </div>
      <div
        className={cx(
          "w-full mb-4 border border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 focus-within:ring-1",
          !!form.formState.errors.content
            ? "text-red-900 border-red-500 placeholder-red-700 focus-within:border-red-500 focus-within:ring-red-500"
            : "focus-within:ring-cyan-500 focus-within:border-cyan-500"
        )}
      >
        <div className="flex items-center px-3 py-2 border-b dark:border-gray-600 gap-x-1">
          <button
            className={cx(
              "p-2",
              "cursor-not-allowed focus:outline-none opacity-50"
            )}
            disabled
          >
            <MdAttachFile />
            <span className="sr-only">Attach file</span>
          </button>

          <button
            className={cx(
              "p-2",
              "cursor-not-allowed focus:outline-none opacity-50"
            )}
            disabled
          >
            <MdImage />
            <span className="sr-only">Upload image</span>
          </button>
        </div>
        <div className="bg-gray-50 rounded-b-lg dark:bg-gray-800">
          <label htmlFor={editorId} className="sr-only">
            Editor
          </label>
          <Textarea
            id={editorId}
            rows={8}
            className="outline-none border-none focus:ring-0 text-sm"
            color={!!form.formState.errors.content ? "failure" : undefined}
            placeholder="Write an article..."
            {...form.register("content", {
              required: true,
              onChange: (e) => {
                startTransition(() => {
                  e.currentTarget.style.height = "auto";
                  e.currentTarget.style.height = `${e.target.scrollHeight}px`;
                });
              },
            })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-x-2">
        <Button
          color="gray"
          isProcessing={isSaving}
          onClick={() => {
            setDraft(form.getValues());
            window.alert("Saved draft!");
          }}
        >
          {isSaving ? "...saving" : "Save Draft"}
        </Button>
        <Button type="submit">Preview Post</Button>
      </div>
    </form>
  );
};

export default memo(EditForm);
