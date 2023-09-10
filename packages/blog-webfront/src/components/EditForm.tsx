import { Button, Label, TextInput } from "flowbite-react";
import { startTransition, useId } from "react";
import { useForm } from "react-hook-form";
import { MdAttachFile, MdImage } from "react-icons/md";
import cx from "classnames";

type EditFormProps = {
  onSubmit?: (data: FormValues) => void;
};

export type FormValues = {
  title: string;
  content: string;
};

export const EditForm = ({ onSubmit }: EditFormProps) => {
  const titleId = useId();
  const editorId = useId();
  const form = useForm<FormValues>({
    defaultValues: { title: "", content: "" },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit?.(data);
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4 gap-y-2">
        <Label htmlFor={titleId}>제목</Label>
        <TextInput
          id={titleId}
          type="text"
          placeholder="제목을 입력해주세요"
          {...form.register("title", { required: true })}
        />
      </div>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex items-center px-3 py-2 border-b dark:border-gray-600 gap-x-1">
          <button
            className={cx(
              "p-2",
              /* disabled style */ "cursor-not-allowed focus:outline-none opacity-50"
            )}
            disabled
          >
            <MdAttachFile />
            <span className="sr-only">Attach file</span>
          </button>

          <button
            className={cx(
              "p-2",
              /* disabled style */ "cursor-not-allowed focus:outline-none opacity-50"
            )}
            disabled
          >
            <MdImage />
            <span className="sr-only">Upload image</span>
          </button>
        </div>
        <div className="px-4 py-2 bg-gray-50 rounded-b-lg dark:bg-gray-800">
          <label htmlFor={editorId} className="sr-only">
            Editor
          </label>
          <textarea
            id={editorId}
            rows={8}
            className="block w-full px-0 text-sm bg-inherit text-gray-800 border-0 dark:bg-gray-800 focus:ring-0 outline-none dark:text-white dark:placeholder-gray-400 resize-none"
            placeholder="Write an article..."
            {...form.register("content", {
              required: true,
              onChange: (e) => {
                startTransition(() => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                });
              },
            })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-x-2">
        <Button color="gray" disabled>
          Save Draft
        </Button>
        <Button type="submit">Preview post</Button>
      </div>
    </form>
  );
};
