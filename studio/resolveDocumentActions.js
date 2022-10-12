
import defaultResolve from 'part:@sanity/base/document-actions'
import {
  DeleteAction,
} from 'part:@sanity/base/document-actions';

import {markableTypes} from './config/workflow'
import { MarkForPublishAction} from './MarkForPublishAction'

function resolveMarkForPublishWorkflow(props) {
  return [
    MarkForPublishAction,
    DeleteAction,
    // UnpublishAction,
    // UnmarkAction
  ]
}



export default function resolveDocumentActions(props) {
  
  if (markableTypes.includes(props.type)) {
    return resolveMarkForPublishWorkflow(props)
  }
  else return defaultResolve(props)
}