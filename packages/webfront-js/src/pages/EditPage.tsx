import { useState } from "react";
import EditForm from "../components/EditForm.js";
import { EditPreview, EditPreviewProps } from "../components/EditPreview.js";

const EditPage = () => {
  const [data, setData] = useState<EditPreviewProps | null>(null);

  return (
    <div className="space-y-8">
      <EditForm onSubmit={setData} />
      {data && <EditPreview {...data} />}
    </div>
  );
};

export default EditPage;
