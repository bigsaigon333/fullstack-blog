import { useState } from "react";
import ColorModeToggle from "../components/ColorModeToggle.js";
import { EditForm } from "../components/EditForm.js";
import { EditPreview, EditPreviewProps } from "../components/EditPreview.js";

const EditPage = () => {
  const [data, setData] = useState<EditPreviewProps | null>(null);

  return (
    <div>
      <div className="flex justify-end my-4">
        <ColorModeToggle />
      </div>

      <EditForm onSubmit={setData} />

      {data && <EditPreview {...data} />}
    </div>
  );
};

export default EditPage;
