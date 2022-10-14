import { useDocumentOperation } from '@sanity/react-hooks'
import { publish } from '../../operations'

export function performPublishingOperation(page) {
    console.log("perform ops", page)
    // const pageOps = useDocumentOperation(page._id, 'animal');
    // const metaOps = useDocumentOperation(`publish-metadata.${page._id}`, 'publish.metadata');
    try {
        publish(page._id, page._rev)
        // console.log("ops", pageOps, metaOps)
        // pageOps.execute.publish()
        // metaOps.execute.delete()
        return "success"
    }
    catch (err){
        return console.log(err)
    }
}