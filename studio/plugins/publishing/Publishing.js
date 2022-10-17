import React, {useEffect, useState} from 'react'
import {Box, Button, Stack} from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client';
import { performPublishingOperation } from './PublishingOperations';
import { PageListItem } from './components/PageListItem';

const client = sanityClient.withConfig({
  //TODO im Bemer projekt mit SANITY_API_VERSION ersetzen
  apiVersion: "v2021-04-23",
});



function publishPages(pages){
  pages.map(page => {
    performPublishingOperation(page)
  })
}

function Publishing() {
  const [pages, setPages] = useState([]);
  const query = `*[_type == 'animal' && _id in *[_type == 'publish.metadata'].documentId && _rev in *[_type == 'publish.metadata'].revId]`;

  const PageContext = React.createContext(null);

  const getPages = async() => {
    client.fetch(query).then((result) => setPages(result))
};

  useEffect(() => {
    getPages()
  }, []);
  
  // use useContext

    return (
      <PageContext.Provider value={pages}>
        <Box padding={4} paddingY={5}>
          <Stack>
            <Stack space={4}>
              {pages.length ? pages.map(page => {
                return(
                <PageListItem key={page._id} id={page._id} title={page.title}/>
                )
              }) : <span>No documents marked for publishing.</span>
            }
            </Stack>
            <Button onClick={() => publishPages(pages)}>Publish marked pages</Button>
          </Stack>
        </Box>
      </PageContext.Provider>
    )
}

export default Publishing
