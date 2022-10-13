import React, {useEffect, useState} from 'react'
import {Box, Button, Stack} from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({
  //TODO im Bemer projekt mit SANITY_API_VERSION ersetzen
  apiVersion: "v2021-04-23",
});



function Publishing() {
const [pages, setPages] = useState([]);



const query= `*[_type == 'animal' && _id in *[_type == 'publish.metadata'].documentId && _rev in *[_type == 'publish.metadata'].revId]`;
const getPages = async() => {
  const pages = await client.fetch(query);
  setPages(pages)
};

  useEffect(() => {
    getPages()
  }, []);

    return (
      <Box padding={4} paddingY={5}>
        <Stack>
          <Stack space={4}>
            {pages.length && pages.map(page => {
              console.log(page)
              return <div><h2>{page.title}</h2><span>{page._id}</span></div>
            })}
          </Stack>
          <Button onClick>Publish marked pages</Button>
        </Stack>
      </Box>
    )
}

export default Publishing
