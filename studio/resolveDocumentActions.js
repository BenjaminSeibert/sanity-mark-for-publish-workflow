
import defaultResolve from 'part:@sanity/base/document-actions'
import {
  DeleteAction,
  UnpublishAction,
  PublishAction
} from 'part:@sanity/base/document-actions';

import {markableTypes} from './config/workflow'
import { MarkForPublishAction} from './markForPublishAction'
import { LoadingAction } from './loadingAction';
import { UnmarkForPublishAction } from './unmarkForPublishAction';

function resolveMarkForPublishWorkflow(props) {
  return [
    LoadingAction,
    MarkForPublishAction,
    UnmarkForPublishAction,
    PublishAction,
    UnpublishAction,
    DeleteAction,
  ]
}



export default function resolveDocumentActions(props) {
  
  if (markableTypes.includes(props.type)) {
    return resolveMarkForPublishWorkflow(props)
  }
  else return defaultResolve(props)
}