
import defaultResolve from 'part:@sanity/base/document-actions'
import {
  DeleteAction,
  UnpublishAction,
  PublishAction
} from 'part:@sanity/base/document-actions';

import {markableTypes} from './config/workflow'
import { MarkForPublishAction} from './markForPublishAction'
import { LoadingAction } from './loadingAction';
// import { publishedAction } from './publishedAction';
import { UnmarkForPublishAction } from './unmarkForPublishAction';

function resolveMarkForPublishWorkflow(props) {
  return [
    LoadingAction,
    // publishedAction,
    MarkForPublishAction,
    UnmarkForPublishAction,
    PublishAction,
    UnpublishAction,
    DeleteAction,
  ]
}



export default function resolveDocumentActions(props) {
  console.log("resolver",props)
  
  if (markableTypes.includes(props.type)) {
    return resolveMarkForPublishWorkflow(props)
  }
  else return defaultResolve(props)
}