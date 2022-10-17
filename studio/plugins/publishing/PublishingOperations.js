import { useDocumentOperation } from '@sanity/react-hooks'
import { publish } from '../../operations'
import sanityClient from 'part:@sanity/base/client';


export function performPublishingOperation(page) {
  console.log("operations page", page)

    // we don't have the published prop in our project in our pages... soooooo...

  try {
  // Method 1: Document Operation Hooks
  // Problem: invalid Hook Calls

    // const pageOps = useDocumentOperation(page._id, 'animal');
    // const metaOps = useDocumentOperation(`publish-metadata.${page._id}`, 'publish.metadata');
    //   pageOps.patch.execute([{set: {_id: page._id.replace('drafts.','')}}])

      // Method 2: Sanity Client fetch

const client = sanityClient.withConfig({
  //TODO im Bemer projekt mit SANITY_API_VERSION ersetzen
  apiVersion: "v2021-04-23",
});
// client.fetch(pageQuery,params).then(res => console.log("res", res))
// client.delete(`drafts.publish-metadata${page._id.replace("drafts.","")}`);
// client.createOrReplace(page,{"_id": `${page._id.replace("drafts.","")}`})

// Method 3: js fetch Operation

//     const id = page._id

//     // curl 'https://<project-id>.api.sanity.io/v2021-06-07/data/mutate/<dataset-name>' \
//     const getUrl = "https://g06ctqja.api.sanity.io/v2021-04-23/data/get/production";
    const postUrl = "https://g06ctqja.api.sanity.io/v2021-04-23/data/mutate/production";
//     // const date = new Date().toString()

//         const pageQuery = `*[id == '${page._id}']`
//         const params = {
//           id
//         };

    const mutations =[{ 
        "mutations": [
            {"delete": {
                "query": "*[_id match 'drafts.publish-metadata.**']"
            }},
          // {"createOrReplace": {
          //     "_id": page._id,
          //     "_published": {...page, _published: new Date()},
          // }},
        ]
      }]

//       const getOptions = {
//         method: 'get',
//       headers: {
//         Authorization: "Bearer skm6HGhbcsKcq911QnI5scIl2z4rZXNfOiVe5MuvXBYFfBq7irqfQdL4YNTT23mBJpWSr3ixIrss1daB2k6r6MXRkNG7gfy32ND42MtPGp8H0A42xD0grTcHqFwXHTkzbBgM30TBg4zSRJUtv9jSgJO3IkzOqI0vfZF33BuGidotMwWJn9vg"
//       },
//     };

const postOptions = {
    method: 'post',
  headers: {
    Authorization: "Bearer skm6HGhbcsKcq911QnI5scIl2z4rZXNfOiVe5MuvXBYFfBq7irqfQdL4YNTT23mBJpWSr3ixIrss1daB2k6r6MXRkNG7gfy32ND42MtPGp8H0A42xD0grTcHqFwXHTkzbBgM30TBg4zSRJUtv9jSgJO3IkzOqI0vfZF33BuGidotMwWJn9vg"
  },
  body: JSON.stringify({mutations})
};

// fetch(getUrl+`?query=*%5B_id%20%3D%3D%20%${page._id}%5D`).then(res => res.json()).then(data => console.log("get", data));
// fetch(getUrl+`?query=*[_id==${page._id}]`).then(res => res.json()).then(data => console.log("get", data));

    // fetch(postUrl, postOptions)
    // .then( res => res.json() )
    // .then( data => console.log("post",data) );

    // Method 4: publish and delete operation
      publish(page._id.replace('drafts.',''), page._rev)
      console.log("delete metadata: ",page._id)
      // fetch(postUrl, postOptions).then( res => res.json() ).then( data => console.log("post",data) );
      // client.delete(`drafts.publish-metadata${page._id.replace("drafts.","")}`);
    }
    catch (err){
        console.log(err)
    }
}