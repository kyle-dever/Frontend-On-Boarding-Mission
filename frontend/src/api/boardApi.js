import instance from '@/utils/send';

export const postImage = async (imageFile) => {
  try {
    // 위에서 지정한 baseURL 뒤에 다음 URL이 붙는다.
    const response = await instance.post('/api/board/upload/image', imageFile);
    return response.data.url;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postBoard = async (params) => {
  const board = {
    userId: params.userId,
    writer: params.userName,
    category: params.category,
    title: params.title,
    thumbnail: params.thumbnail,
    content: params.content,
  };

  const response = await instance.post('/api/board/upload/board', board);
  return response;
};
