import {useDocumentOperation, useEditState} from '@sanity/react-hooks'




const markForPublish = (props, ops) => {
  ops.patch.execute([{setIfMissing: {documentId: props.id}}, {set: {revId: props.draft._rev}}])
  
  // metadata -> aktuelle id, mutate revId mit neuen props.RevId
}


export function MarkForPublishAction(props) {
  const ops = useDocumentOperation(`publish-metadata.${props.id}`, 'publish.metadata')
  const data = useEditState(`publish-metadata.${props.id}`, 'publish.metadata')

  // is document draft
  if (!props.draft) {
    return null
  }

  
  // revId in metadata matches current _rev of document, disable the button
  if(data.draft.revId === props.draft._rev){
    return {
      disabled:true,
      label: 'marked for publish',
      onHandle: () => {
      },
    }
  }

  return {
    label: 'mark for publish',
    onHandle: () => {
      markForPublish(props, ops)
    },
  }
}