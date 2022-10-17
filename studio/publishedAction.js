// import {useDocumentOperation, useEditState} from '@sanity/react-hooks'


// export function publishedAction(props) {
//   const ops = useDocumentOperation(props.id, 'animal')
//   // const data = useEditState(`publish-metadata.${props.id}`, 'publish.metadata')

//   // console.log("data",data, "ops", ops)
//   console.log("publishedAction props",props)
//   // is document draft
//   if (props.draft) {
//     return null
//   }

// //   const published = !data._rev = props._published?._rev;
  
//   // revId in metadata matches current _rev of document, disable the button
//   // if(data && data.draft.revId === props.draft._rev){
//   //   return {
//   //     disabled:true,
//   //     label: 'marked for publish',
//   //     onHandle: () => {
//   //     },
//   //   }
//   // }

//   return {
//     disabled: true,
//     label: 'Published',
//   }
// }