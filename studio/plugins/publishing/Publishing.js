import React, { createRef, useCallback, useEffect, useState } from "react";
import { Box, Button, Stack } from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";
import { performPublishingOperation } from "./PublishingOperations";
import { PageListItem } from "./components/PageListItem";
import { useRef } from "react";
import { publishPages } from "../../operations";

const client = sanityClient.withConfig({
  //TODO im Bemer projekt mit SANITY_API_VERSION ersetzen
  apiVersion: "v2021-04-23",
});

function Publishing() {
  const [pages, setPages] = useState([]);
  const [markedPages, setMarkedPages] = useState([])
  
  const query = `*[_type == 'animal' && _id in *[_type == 'publish.metadata'].documentId && _rev in *[_type == 'publish.metadata'].revId]`;
  
  const getPages = async () => {
    console.log("updating pages")
    const result = await client.fetch(query)
    console.log("pages",result)
    setPages(result);
  };
  
  useEffect(() => {
    getPages();
  }, []);

  // const elRef = useCallback(node => {
  //   console.log('useCallback node', node);
  //   if(pages.length){
  //     elementsRef = useRef(pages.map(() => createRef()));
  //   }
  // }, [pages]);

  const removePage = (id) => {
    console.log("removing page ",id)
    const newPageArr = pages.filter((page) => page._id !== `drafts.${id}`);
    console.log("expected new state of pages",newPageArr)
    setPages(newPageArr.filter(page => page !== null));
    return;
  };

  const removePages = (removedPages) => {
    const newPageArr = pages.map(page => {
      const idx = removedPages.indexOf(page)
      if (idx < 0) {
        return page
      }
      return null
    }).filter(page => page !== null)
    setPages(newPageArr)
    return;
  };

  const markPage = (page) => {
    setMarkedPages(markedPages.concat(page))
  }
  const unmarkPage = (page) => {
    setMarkedPages(markedPages.filter(markedPage => markedPage._id !== page._id))
  }

  useEffect(() => {
    console.log("markedPages",markedPages)
  }, [markedPages]);

  useEffect(() => {
    console.log("pages", pages)
  }, [pages])

  return (
    <Box padding={4} paddingY={5}>
      <Stack>
        <Stack space={4}>
          {pages.length ? (
            pages.map((page, index) => {
              return (
                <PageListItem
                  page={page}
                  removePage={() => removePage(page._id)}
                  markPage={() => markPage(page)}
                  unmarkPage={() => unmarkPage(page)}
                />
              );
            })
          ) : (
            <span>No documents marked for publishing.</span>
          )}
        </Stack>

        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Button onClick={() => publishPages(markedPages, removePages)} style={{width: '40%', textAlign: 'center'}}>
          Publish marked pages
        </Button>
        <Button onClick={() => publishPages(pages,removePages)}  style={{width: '40%', textAlign: 'center'}}>
          Publish all pages
        </Button>
          </div>
      </Stack>
    </Box>
  );
}

export default Publishing;
