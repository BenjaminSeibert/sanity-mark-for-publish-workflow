import {useDocumentOperation, useEditState} from '@sanity/react-hooks'

const unmarkForPublish = (ops) => {
  ops.delete.execute()
}

export function UnmarkForPublishAction(props) {
  const ops = useDocumentOperation(`publish-metadata.${props.id}`, 'publish.metadata')
  const data = useEditState(`publish-metadata.${props.id}`, 'publish.metadata')

  const marked = data.draft && props.draft && data.draft.revId === props.draft._rev;

  return marked ? {
    label: 'Unmark',
    disabled: !marked,
    onHandle: () => {
      unmarkForPublish(ops)
    },
  } : null
}