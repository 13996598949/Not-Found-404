import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/base/home/home'
import Index from '@/components/index/index'
import Rent from '@/components/rent/rent'
import Sale from '@/components/sale/sale'
import Mine from '@/components/mine/mine'
import Person from '@/components/mine/personalCenter/person'
import ShoppingCart from '@/components/mine/shoppingCart'
import RentDetailInfo from '@/components/rent/rentDetailInfo'
import AddressList from '@/components/mine/personalCenter/addressList'
import InsertAddressList from '@/components/mine/personalCenter/insertAddress'
import EditAddressList from '@/components/mine/personalCenter/editAddress'
import EditBuyPassword from "@/components/mine/personalCenter/editBuyPassword"
import EditLoginPassword from "@/components/mine/personalCenter/editLoginPassword"
import MyPublish from "@/components/mine/myPublish/myPublish"
import MySale from "@/components/mine/mySale/mySale"
import MyBuy from "@/components/mine/myBuy/myBuy"
import MyCollection from "@/components/mine/myCollection/myCollection"
import deliveryList from "@/components/mine/menu/deliveryList"
import receiptList from "@/components/mine/menu/receiptList"
import payingList from "@/components/mine/menu/payingList"
import evaluationList from "@/components/mine/menu/evaluationList"
import salePublish from "@/components/publish/salePublish"
import rentPublish from "@/components/publish/rentPublish"
import login from "@/components/mine/login/login"
import register from "@/components/mine/login/register"


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
      path: '/',
      component: Home,
      children:[
        {
          path: 'index',
          component: Index,
        }
      ]
    },

    // 出租
    {
      path: '/',
      component: Home,
      children:[
        {
          path: 'rent',
          component: Rent,
        }
      ]
    },
    // 出售
    {
      path: '/',
      component: Home,
      children:[
        {
          path: 'sale',
          component: Sale,
        }
      ]
    },
    // 我的
    {
      path: '/',
      component: Home,
      children:[
        {
          path: 'mine',
          component: Mine,
        }
      ]
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
      path: '/addressList',
      component: AddressList
    },
    // 新增收货地址
    {
      path: '/insertAddressList',
      component: InsertAddressList
    },
    // 编辑收货地址
    {
      path: '/editAddressList',
      component: EditAddressList
    },
    // 修改交易密码
    {
      path: '/editBuyPassword',
      component: EditBuyPassword
    },
    // 修改登录密码
    {
      path: '/editLoginPassword',
      component: EditLoginPassword
    },
    // 我发布的
    {
      path: '/myPublish',
      component: MyPublish
    },
    // 我卖出的
    {
      path: '/mySale',
      component: MySale
    },
    // 我买到的
    {
      path: '/myBuy',
      component: MyBuy
    },
    // 我收藏的
    {
      path: '/myCollection',
      component: MyCollection
    },
    // 待付款
    {
      path: '/payingList',
      component: payingList
    },
    // 待发货
    {
      path: '/deliveryList',
      component: deliveryList
    },
    // 待收货
    {
      path: '/receiptList',
      component: receiptList
    },
    // 待评价
    {
      path: '/evaluationList',
      component: evaluationList
    },
    // 出售发布
    {
      path: '/salePublish',
      component: salePublish
    },
    // 出租发布
    {
      path: '/rentPublish',
      component: rentPublish
    },
    // 登录
    {
      path: '/login',
      component: login
    },
    // 注册
    {
      path: '/register',
      component: register
    },
  ]
})
