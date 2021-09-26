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
  const fetchImages = async ({ pageParam = null }) => {
    const { data } = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    console.log('getApi', data);

    return data;
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
      getNextPageParam: lastPage => lastPage?.after || null,
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const newDataFormatted = data?.pages.flat(2);

    return newDataFormatted;
  }, [data]);

  console.log(data)

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  // eslint-disable-next-line no-nested-ternary
  return isError ? (
    <>
      <Error />
    </>
  ) : isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage ? (
          <Button type="button" onClick={fetchNextPage}>
            Carregar mais
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
