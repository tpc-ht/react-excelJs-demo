import { defineConfig } from "umi";

export default defineConfig({

    routes: [
        { path: "/", component: "index" },
    ],
    npmClient: 'pnpm',
    title: 'excelJs demo',
    history: {
        type: 'hash',
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'

});






