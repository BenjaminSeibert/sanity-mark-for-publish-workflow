import {useDocumentOperation, useEditState} from '@sanity/react-hooks'




const loading = (props, ops) => {
  ops.patch.execute([{setIfMissing: {documentId: props.id}}, {set: {revId: props.draft._rev}}])
  
  // metadata -> aktuelle id, mutate revId mit neuen props.RevId
}


export function LoadingAction(props) {
  const ops = useDocumentOperation(`publish-metadata.${props.id}`, 'publish.metadata')
  const data = useEditState(`publish-metadata.${props.id}`, 'publish.metadata')

  console.log("data",data, "ops", ops)

  // is document draft
  if (props.ready) {
    return null
  }

  return {
    disabled: true,
    label: "Loading..."
  }
}