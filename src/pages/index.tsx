import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetchImages = ({ pageParam = null }) => {
    const datas = api
      .get(`/api/images?after=${pageParam}`)
      .then(response => response.data);

    return datas;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchImages,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    }
  );

  /*
    return {
      title: project.title,
      description: project.description,
      url: project.url,
      ts: project.ts,
      id: project.id,
    };
  */

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const datas = api.get(`/api/images`).then(response => response.data);

    return datas;
  }, [data]);

  console.log(formattedData);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
