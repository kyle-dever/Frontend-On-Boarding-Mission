import instance from '@/utils/send';
import axios from 'axios';

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

export const getBoardListAll = async () => {
  const response = await axios.get('/api/getBoard/Home');
  return response;
};

export const getBoardListFromCategory = async (category, page) => {
  const response = await axios.get('/api/getBoard/Category', {
    params: {
      category: category,
      page: page,
    },
  });

  return response;
};

export const getBoardFromId = async (boardId) => {
  const response = await axios.get('/api/getBoard/board', {
    params: {
      id: boardId,
    },
  });

  return response;
};

export const deleteBoardFromId = async (boardId) => {
  const response = await instance.delete('/api/board/delete/board', {
    params: { boardId: boardId },
  });

  return response;
};

export const updateBoardFromId = async (params) => {
  const response = await instance.patch('api/board/update/board', params);
  return response;
};

export const getSearchBoardFromKeyword = async (params, page) => {
  const response = await axios.get('/api/getBoard/search', {
    params: {
      category: params.category,
      keyword: params.keyword,
      option: params.option,
      page: page,
    },
  });

  return response;
};
