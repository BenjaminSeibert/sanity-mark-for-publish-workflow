import {useDocumentOperation, useEditState} from '@sanity/react-hooks'




const markForPublish = (props, ops) => {
  console.log(props)
  ops.patch.execute([{setIfMissing: {title: props.draft.title, documentId: props.draft._id}}, {set: {revId: props.draft._rev}}])
  
  // metadata -> aktuelle id, mutate revId mit neuen props.RevId
}


export function MarkForPublishAction(props) {
  const ops = useDocumentOperation(`publish-metadata.${props.id}`, 'publish.metadata')
  const data = useEditState(`publish-metadata.${props.id}`, 'publish.metadata')

  // is document draft
  if (!props.draft) {
    return null
  }

  const marked = data.draft && data.draft.revId === props.draft._rev;
  
  // revId in metadata matches current _rev of document, disable the button
  // if(data && data.draft.revId === props.draft._rev){
  //   return {
  //     disabled:true,
  //     label: 'marked for publish',
  //     onHandle: () => {
  //     },
  //   }
  // }

  return {
    disabled: marked,
    label: marked ? 'Marked for publishing' : 'Mark for publishing',
    onHandle: () => {
      markForPublish(props, ops)
    },
  }
}