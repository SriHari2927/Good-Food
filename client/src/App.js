import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Routes, Route, BrowserRouter, Outlet} from "react-router-dom"
import Payment from './components/User/Subscription/Payment'
import Order from './components/User/Home/Order'
import Account from './components/User/Home/Account'
import SubscriptionCalender from './components/User/Home/SubscriptionCalender'
import Navbar from './Pages/User/Navbar'
import Home from './Pages/User/Home'
import Subscription from './Pages/User/Subscription'
import AddSubscription from './Pages/Admin/AddSubscription'
import AddMenuItems from './Pages/Admin/AddMenuItems'
import AdminSidebar from './Pages/Admin/AdminSidebar'
import ListItem from './Pages/Admin/ListItem'
import OrderList from './Pages/Admin/OrderList'
import Cart from './components/User/Home/Cart'
import MenuAddon from './components/User/Home/MenuAddon'
import DailyMenu from './Pages/Admin/DailyMenu'
import SubscriptionMenuList from './Pages/Admin/SubscriptionMenuList'
import SubscribedUsers from './Pages/Admin/SubscribedUsers'
import LoginPopup from './components/User/Login/LoginPopup'
import OverallHome from './Pages/User/OverallHome'
import ChefOrderList from './Pages/Admin/ChefOrderList';
import AdminOrderList from './Pages/Admin/AdminOrderList';
import PaymentCart from './components/User/Home/PaymentCart';
import FeedItems from './Pages/Admin/FeedItems';
import IdeasToImprove from './components/User/OverallHome/IdeasToImprove';
import SignIn from './components/User/OverallHome/SignIn';
import MoneyTransfer from './components/User/Subscription/MoneyTransfer';
import FeedItemsOption from './components/Admin/FeedItems/FeedItemsOption';

import UserSidebar from './Pages/User/UserSidebar';
import Wallet from './components/User/Home/Wallet';
import Notification from './components/User/Home/Notification';
import Skippedcart from './components/User/Home/Skippedcart';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PlanDetails from './components/User/Subscription/PlanDetails';
 
 
const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route index element={< OverallHome/>}/>
    <Route path='user' element={<Outlet/> }>    
    <Route path = ':planName/:planType/:mealType' element = {<PlanDetails />}/>

    <Route path='LoginPopup' element={< LoginPopup />}/>
    <Route path='SignIn'  element={<SignIn />} />
 
<Route element={<PrivateRoute />}>
    <Route path='PaymentCart' element={<PaymentCart />} />      
    <Route path='IdeasToImprove' element={<IdeasToImprove />} />        
    <Route path='MoneyTransfer' element={<MoneyTransfer />} />
    <Route path='UserSidebar' element={<UserSidebar />} />
    <Route path='Wallet' element={<Wallet />} />
    <Route path='Notification' element={<Notification />} />
    <Route path='Skippedcart' element={<Skippedcart />} />
    <Route path='subscription' element={<Subscription />} />
    <Route path='Payment/:id' element={<Payment />} />
    <Route path='Home/:id' element={<Home />} />
    <Route path='Navbar' element={<Navbar />} />
    <Route path='Order' element={<Order />} />
    <Route path='Account' element={<Account />} />
    <Route path='Cart' element={<Cart />} />
    <Route path='SubscriptionCalender' element={<SubscriptionCalender />} />
    <Route path='MenuAddon' element={<MenuAddon />} />
</Route>
 
   </Route>
   
   </Routes>
   <Routes>
    <Route path='admin' element={<Outlet/>}>
      <Route path='addsubscription' element={<AddSubscription/>}/>
      <Route path='addmenuitems' element={< AddMenuItems/>}/>
      <Route path='adminsidebar' element={<AdminSidebar />}/>
      <Route path='listitem' element={<ListItem/>}/>
      <Route path='orderlist' element={<OrderList/>}/>
      <Route path='dailymenu' element={<DailyMenu/>}/>
      <Route path='subscriptionmenulist' element={<SubscriptionMenuList />}/>
      <Route path='subscribedusers' element={<SubscribedUsers/>}/>
      <Route path='cheforderlist' element={<ChefOrderList/>}/>
      <Route path='adminorderlist' element={< AdminOrderList/>}/>  
      <Route path='feeditem' element={<FeedItems  />}/>  
      <Route path='feeditemoption' element={< FeedItemsOption/>}/>
    </Route>
   </Routes>
   </BrowserRouter>        
   </>
  )
}
 
export default App
 