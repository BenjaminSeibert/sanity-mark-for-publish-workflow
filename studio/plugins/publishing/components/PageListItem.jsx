import { useDocumentOperation } from '@sanity/react-hooks'
import React from 'react'

const PageListItem = ({id, title}) => {
    const documentId = id.replace('drafts.','')
    const pageOps = useDocumentOperation(documentId, 'animal');
    const metaOps = useDocumentOperation(`publish-metadata.${documentId}`, 'publish.metadata');
    
    const onPublishHandler= () => {
        pageOps.publish.execute()
        metaOps.delete.execute()
        // after publishing, execute a refetch
        refetchPages()
    }
    
  return(
    <div>
      <h2>{title}</h2>
      <span>{id}</span>
      <button onClick={() => onPublishHandler()}>publish</button>
    </div>
  )
}

export {PageListItem}