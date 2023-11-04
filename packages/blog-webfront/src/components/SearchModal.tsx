import { Button, Label, Modal, TextInput } from "flowbite-react";
import { startTransition, useId } from "react";
import { useForm } from "react-hook-form";
import { NumberParam, StringParam, useQueryParam } from "use-query-params";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: Props) {
  const keywordId = useId();
  const forms = useForm({ defaultValues: { keyword: "" } });
  const [, setPage] = useQueryParam("page", NumberParam);
  const [, setQ] = useQueryParam("q", StringParam);

  return (
    <>
      <Modal show={open} size="md" popup onClose={onClose} dismissible={true}>
        <Modal.Header />
        <Modal.Body>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={forms.handleSubmit(({ keyword }) => {
              startTransition(() => (setPage(1), setQ(keyword)));
              onClose();
            })}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor={keywordId} value="검색어" />
              </div>
              <TextInput
                id={keywordId}
                placeholder="검색어를 입력해주세요"
                type="search"
                color={forms.formState.errors.keyword ? "failure" : undefined}
                autoFocus
                {...forms.register("keyword", { required: true })}
              />
            </div>
            <Button type="submit">검색하기</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
