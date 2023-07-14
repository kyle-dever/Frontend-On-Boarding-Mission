import { defineStore } from 'pinia';

export const useBoardStore = defineStore('board', {
  state: () => {
    return {
      list: [
        { id: 1, title: '첫 번째 게시글', writer: 'artistjay' },
        { id: 2, title: '두 번째 게시글', writer: 'artistjay' },
        { id: 3, title: '세 번째 게시글', writer: 'artistjay' },
        { id: 4, title: '네 번째 게시글', writer: 'artistjay' },
        { id: 5, title: '다섯 번째 게시글', writer: 'artistjay' },
        { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 7, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 8, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 9, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 10, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 11, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 12, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 13, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 15, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 14, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 19, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 18, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 17, title: '여섯 번째 게시글', writer: 'artistjay' },
        { id: 16, title: '여섯 번째 게시글', writer: 'artistjay' },
      ],
      rows: 0,
    };
  },
  actions: {
    getFirstList(category) {
      category;
      return this.list.slice(0, 10);
    },
    getSecondList() {
      return this.list.slice(11, 20);
    },
    getList(category, page) {
      category;
      const start = (page - 1) * 10 + 1;
      const end = page * 10;
      return this.list.slice(start, end);
    },
    getRows(category) {
      category;
      return this.list.length;
    },
  },
});
