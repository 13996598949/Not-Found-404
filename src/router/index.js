import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index/index'
import Rent from '@/components/rent/rent'
import Sale from '@/components/sale/sale'
import Mine from '@/components/mine/mine'
import Person from '@/components/mine/person'
import ShoppingCart from '@/components/mine/shoppingCart'
import RentDetailInfo from '@/components/rent/rentDetailInfo'
import AddressList from '@/components/mine/addressList'


Vue.use(Router)

export default new Router({
  routes: [
    // 根路径
    {
      path: '/',
      redirect: '/index'
    },
    // 首页
    {
      path: '/index',
      component: Index
    },

    // 出租
    {
      path: '/rent',
      component: Rent
    },

    // 出售
    {
      path: '/sale',
      component: Sale
    },
    // 我的
    {
      path: '/mine',
      component: Mine,
    },
    // 购物车
    {
      path: '/shoppingCart',
      component: ShoppingCart
    },
    // 个人中心
    {
      path: '/person',
      component: Person
    },
    // 租赁详情页
    {
      path: '/rentDetailInfo',
      component: RentDetailInfo
    },
    // 收货地址列表
    {
      path: '/addressList ',
      component: AddressList
    }
  ]
})
