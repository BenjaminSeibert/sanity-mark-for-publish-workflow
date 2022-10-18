import { useDocumentOperation } from "@sanity/react-hooks";
import React from "react";

const PageListItem = ({ id, title, removePage }) => {
  const documentId = id.replace("drafts.", "");
  const pageOps = useDocumentOperation(documentId, "animal");
  const metaOps = useDocumentOperation(
    `publish-metadata.${documentId}`,
    "publish.metadata"
  );

  const onPublishHandler = () => {
    pageOps.publish.execute();
    metaOps.delete.execute();
    removePage();
  };

  return (
    <div>
      <h2>{title}</h2>
      <span>{id}</span>
      <button onClick={() => onPublishHandler()}>publish</button>
    </div>
  );
};

export { PageListItem };
