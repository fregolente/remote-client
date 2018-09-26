module.exports = [
  {
    key: 'welcome',
    name: 'Welcome',
    icon: 'dashboard',
    link: '/app'
  },
  {
    key: 'pages',
    name: 'Pages',
    icon: 'flag',
    child: [
      {
        key: 'builtin',
        name: 'Built in Pages',
        link: '/app/built-in-pages'
      },
    ]
  },
  {
    key: 'menu_levels',
    name: 'Menu Levels',
    icon: 'sort',
    child: [
      {
        key: 'level_1',
        name: 'Level 1',
        link: '/#'
      },
      {
        key: 'level_2',
        keyParent: 'menu_levels',
        name: 'Level 2',
        child: [
          {
            key: 'sub_menu_1',
            name: 'Sub Menu 1',
            link: '/#'
          },
          {
            key: 'sub_menu_2',
            name: 'Sub Menu 2',
            link: '/#'
          },
        ]
      },
    ]
  }
];
