import { useState } from "react";
import { useParams } from "react-router-dom";
import { decodeNumber } from "use-query-params";
import EditForm from "../components/EditForm.js";
import { EditPreview, EditPreviewProps } from "../components/EditPreview.js";
import usePost from "../hooks/queries/usePost.js";
import usePostContent from "../hooks/queries/usePostContent.js";

const throwError = ({ message }: { message: string }) => {
  throw new Error(message);
};

const PostEditPage = () => {
  const params = useParams();
  const id =
    decodeNumber(params.id) ?? throwError({ message: "postId is required" });

  const { title } = usePost({ id });
  const { content } = usePostContent({ id });
  const initialData = { title, content };
  const [data, setData] = useState<EditPreviewProps | null>(initialData);

  return (
    <div className="space-y-8">
      <EditForm onSubmit={setData} defaultValues={data} />
      {data && <EditPreview {...data} />}
    </div>
  );
};

export default PostEditPage;
