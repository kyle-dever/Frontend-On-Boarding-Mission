import instance from '@/utils/send';

export const postImage = async (imageFile) => {
  try {
    // 위에서 지정한 baseURL 뒤에 다음 URL이 붙는다.
    const response = await instance.post('/api/board/upload', imageFile);
    return response.data.url;
  } catch (error) {
    console.log(error);
    return error;
  }
};
