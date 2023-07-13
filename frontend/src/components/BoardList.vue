<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">
                    번호
                </th>
                <th class="text-left">
                    제목
                </th>
                <th class="text-left">
                    작성자
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in list" :key="item.id">
                <td class="text-left">{{ item.id }}</td>
                <td class="text-left">{{ item.title }}</td>
                <td class="text-left">{{ item.writer }}</td>
            </tr>
        </tbody>
    </v-table>
</template>
<script setup>
const list = [
    { id: 1, title: '첫 번째 게시글', writer: 'artistjay' },
    { id: 2, title: '두 번째 게시글', writer: 'artistjay' },
    { id: 3, title: '세 번째 게시글', writer: 'artistjay' },
    { id: 4, title: '네 번째 게시글', writer: 'artistjay' },
    { id: 5, title: '다섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
    { id: 6, title: '여섯 번째 게시글', writer: 'artistjay' },
]
</script>