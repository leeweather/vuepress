module.exports = {
    title: 'webb首页', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: 'webb的学习记录', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/avatar.jpg' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {    
        logo: '/avatar.jpg',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            {
                text: '分类',
                ariaLabel: '分类',
                items: [
                    { text: '学习', link: '/pages/study/promise.md' },
                    { text: '工作记录', link: '/pages/work/gemstone-permisson.md' },
                ]
            },
            { text: '面试', link: '/pages/interview/bytedance.md' },
            { text: 'Github', link: 'https://github.com/leeweather' },
        ],
        sidebar: {
            '/pages/study/':[
                {
                    title: 'js基础',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['promise.md', '手写promise'],
                    ]
                },
                {
                    title: '计算机网络',   // 必要的
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['http.md', 'http发展史'],
                    ]
                },
                {
                    title: '部署',
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['npm.md', '发布自己的npm包'],
                        ['webpack.md', 'webpack多环境打包'],
                    ]
                }
            ],
            '/pages/work/':[
                {
                    title: '奎晶',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['gemstone-permisson.md', '创思童权限配置'],
                    ]
                },
            ],
            '/pages/interview/':[
                {
                    title: '面经',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['bytedance.md', '字节笔试'],
                    ]
                },
            ],
        }
    }
}