import axios from 'axios';
// import { useTokenStore } from '@/stores/token';

export const postImage = async (imageFile) => {
  // const tokenStore = useTokenStore();
  // const token = tokenStore.getDataAll()[0];
  const response = await axios.post('/api/board/upload', imageFile, {
    headers: {
      authorization: 'njAtkoWdUivPLz14/9IvNw==',
    },
  });

  return response.data.url;
};
