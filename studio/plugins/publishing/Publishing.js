import React from 'react'
import {Box, Text, Stack} from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({
  //TODO im Bemer projekt mit SANITY_API_VERSION ersetzen
  apiVersion: "v2021-04-23",
});


function Publishing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const query= `*[_type == 'animal' && _id in *[_type == 'publish.metadata'].documentId && _rev in *[_type == 'publish.metadata'].revId]`;


  const getPages = async() => {
    const pages = await client.fetch(query);
  };

  useEffect(() => {
    getPages();
  }, []);

  useEffect(() => {
    
  console.log(pages)
  }, [pages]);

    return (
      <Box padding={4} paddingY={5}>
        <Stack space={4}>
          {pages.map(page => {
            return <div>test</div>
          })}
        </Stack>
      </Box>
    )
}

export default Publishing
