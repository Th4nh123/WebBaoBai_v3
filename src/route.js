/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by 2022

=========================================================

*/
// import React, { useState } from 'react';
import PageCaoBaiNew from './component/page/PageCaoBaiNew'
import PageChienDichNew from './component/page/PageChienDichNew'
import PageQLKeyNew from './component/page/PageQLKeyNew'
import PageQlKeyGoogle from './component/page/PageQlKeyGoogle'
import PageQlKeyYoutube from './component/page/PageQlKeyYoutube'
import PageBlackListNew from './component/page/PageBlackListNew'
import PageNgonNgu from "./component/page/PageNgonNgu";

const routes = [
  {
    name: "Cào bài",
    key: "home",
    tab: "tab1",
    component: <PageCaoBaiNew />,
  },
  {
    name: "Chiến dịch",
    key: "campaign",
    tab: "tab2",
    component: <PageChienDichNew />,
  },
  {
    name: "Quản lý key",
    key: "profile",
    tab: "tab3",
    component: <PageQLKeyNew />,
  },
  {
    name: "Key Google",
    key: "keygg",
    tab: "tab4",
    component: <PageQlKeyGoogle />,
  },
  {
    name: "Key Youtube",
    key: "keyyt",
    tab: "tab5",
    component: <PageQlKeyYoutube />,
  },
  {
    name: "Blacklist domain",
    key: "contact",
    tab: "tab6",
    component: <PageBlackListNew />,
  },
  {
    name: "Ngôn ngữ",
    key: "language",
    tab: "tab9",
    component: <PageNgonNgu />,
  },
];

export default routes;