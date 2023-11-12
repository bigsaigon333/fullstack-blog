import { Button, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { Post } from "../models/post.js";

type Props = {
  open: boolean;
  onOpenChange: (force: boolean) => void;
  onConfirm: () => Promise<Post>;
};

const PublishConfirmModal = ({ open, onOpenChange, onConfirm }: Props) => {
  const onClose = () => onOpenChange(false);
  const [isPending, setIsPending] = useState(false);

  const handleConfirm = async () => {
    try {
      await onConfirm();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Modal size="md" popup show={open} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            정말로 아티클을 게시하시겠습니까?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="gray" onClick={onClose} disabled={isPending}>
              아니오, 취소하겠습니다
            </Button>
            <Button
              color="failure"
              isProcessing={isPending}
              processingSpinner={<Spinner color="failure" />}
              onClick={handleConfirm}
            >
              네, 게시하겠습니다
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PublishConfirmModal;
