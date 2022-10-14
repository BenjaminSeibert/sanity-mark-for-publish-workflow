import { useDocumentOperation } from '@sanity/react-hooks'
import { publish } from '../../operations'
import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({
    //TODO im Bemer projekt mit SANITY_API_VERSION ersetzen
    apiVersion: "v2021-04-23",
  });

export function performPublishingOperation(page) {
    // const pageOps = useDocumentOperation(page._id, 'animal');
    // const metaOps = useDocumentOperation(`publish-metadata.${page._id}`, 'publish.metadata');
    try {
        // do something like this
    client.delete(`drafts.publish-metadata${page._id.replace("drafts.","")}`)
        // client.createOrReplace(page)
    }
    catch (err){
        console.log(err)
    }
}