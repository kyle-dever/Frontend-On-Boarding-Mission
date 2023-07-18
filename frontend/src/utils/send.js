import axios from 'axios';
import { useTokenStore } from '@/stores/token';
import { useLoginStore } from '@/stores/isLogin';
import { useModalStore } from '@/stores/modal';

/*
    axios 인스턴스를 생성합니다.
    생성할때 사용하는 옵션들 (baseURL, timeout, headers 등)은 다음 URL에서 확인할 수 있습니다.
    https://github.com/axios/axios 의 Request Config 챕터 확인
*/
const instance = axios.create({
  baseURL: '/',
  timeout: 1000,
});

/*
  1. 요청 인터셉터를 작성합니다.
  2개의 콜백 함수를 받습니다.

  1) 요청 바로 직전 - 인자값: axios config
  2) 요청 에러 - 인자값: error
*/
instance.interceptors.request.use(
  function (config) {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    const tokenStore = useTokenStore();
    const accessToken = tokenStore.list.accessToken;

    config.headers['authorization'] = accessToken;
    return config;
  },
  function (error) {
    // 요청 에러 처리를 작성합니다.
    console.log(error);
    return Promise.reject(error);
  }
);

/*
  2. 응답 인터셉터를 작성합니다.
  2개의 콜백 함수를 받습니다.

  1) 응답 정성 - 인자값: http response
  2) 응답 에러 - 인자값: http error
*/
instance.interceptors.response.use(
  (response) => {
    /*
      http status가 200인 경우
      응답 바로 직전에 대해 작성합니다. 
      .then() 으로 이어집니다.
  */
    return response;
  },

  async (error) => {
    /*
      http status가 200이 아닌 경우
      응답 에러 처리를 작성합니다.
      .catch() 으로 이어집니다.    
  */
    if (error.response?.status == 419) {
      alert('토큰 만료');
      // 토큰 재발행
      const tokenStore = useTokenStore();

      // 재발행된 토큰으로 다시 요청
      const accessToken = tokenStore.getAccessToken;
      accessToken;
      // error.config.headers['authorization'] = accessToken;

      // const response = await axios.request(error.config);
      // return response;
    } else if (error.response?.status == 401) {
      alert('로그인 정보가 만료되었습니다.\n다시 로그인 해주세요.');
      // 로그아웃 후 다시 로그인 창 띄우기
      const loginStore = useLoginStore();
      loginStore.changeStatus();

      const modalStore = useModalStore();
      modalStore.openModal('modalLogin');
    } else if (error.response?.status == 500) {
      alert('서버에 문제가 생겼습니다.\n잠시 후 다시 시도해주세요.');
    }
    return Promise.reject(error);
  }
);

// 생성한 인스턴스를 익스포트 합니다.
export default instance;
