import { useDocumentOperation } from "@sanity/react-hooks";
import React, { useState, useEffect } from "react";

const PageListItem = ({ page, markPage, unmarkPage }) => {
  const [checked, setChecked] = useState(false);
  const documentId = page._id.replace("drafts.", "");
  const pageOps = useDocumentOperation(documentId, "animal");
  const metaOps = useDocumentOperation(
    `publish-metadata.${documentId}`,
    "publish.metadata"
  );

  const onPublishHandler = (id) => {
    pageOps.publish.execute();
    metaOps.delete.execute();
    removePage(id);
  };

  useEffect(() => {
    if(checked){
      markPage(page)
    }
    else {
      unmarkPage(page)
    }
  },[checked])

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <input type='checkbox' value='publish?' onChange={() => setChecked(!checked)}  />
      <h2>{page.title}</h2>
      <span>{page._id}</span>
      <button onClick={() => onPublishHandler(page._id)}>publish</button>
    </div>
  );
};

export { PageListItem };
