import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Payment from "./components/User/Subscription/Payment";
import Order from "./components/User/Home/Order";
import SubscriptionCalender from "./components/User/Home/SubscriptionCalender";
import Navbar from "./Pages/User/Navbar";
import Home from "./Pages/User/Home";
import Subscription from "./Pages/User/Subscription";
import AddSubscription from "./Pages/Admin/AddSubscription";
import OrderList from "./Pages/Admin/OrderList";
import Cart from "./components/User/Home/Cart";
import MenuAddon from "./components/User/Home/MenuAddon";
import DailyMenu from "./Pages/Admin/DailyMenu";
import SubscribedUsers from "./Pages/Admin/SubscribedUsers";
import LoginPopup from "./components/User/Login/LoginPopup";
import OverallHome from "./Pages/User/OverallHome";
import PaymentCart from "./components/User/Home/PaymentCart";
import IdeasToImprove from "./components/User/OverallHome/IdeasToImprove";
import SignIn from "./components/User/OverallHome/SignIn";
import MoneyTransfer from "./components/User/Subscription/MoneyTransfer";
import Wallet from "./components/User/Home/Wallet";
import Notification from "./components/User/Home/Notification";
import Skippedcart from "./components/User/Home/Skippedcart";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PlanDetails from "./components/User/Subscription/PlanDetails";
import QuantityManagement from "./components/Admin/AddSubscription/QuantitiesManagement";
import DurationManagement from "./components/Admin/AddSubscription/DurationsManagement";
import ParentPlanManagement from "./components/Admin/AddSubscription/ParentPlansManagement";
import TierManagement from "./components/Admin/AddSubscription/TiersManagement";
import FoodItemsManagement from "./components/Admin/AddSubscription/FoodItemsManagement";

import UnprotectedController from "./components/Controller/UnprotectedController";
import UserSidebar from "./Pages/User/UserSidebar";
import AdminSidebar from "./Pages/Admin/AdminSidebar";
import ProtectedLayout from "./components/PrivateRoute/ProtectedLayout";
import { SidebarProvider } from "./components/Sidebar/SidebarContext";

const App = () => {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<UnprotectedController />}>
            <Route path="/" element={<OverallHome />} />
            <Route path="/LoginPopup" element={<LoginPopup />} />
            <Route path="/SignIn" element={<SignIn />} />
           <Route path=":planName/:planType/:mealType" element={<PlanDetails />} />

          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path="user" element={<PrivateRoute />}>
              <Route path="UserSidebar" element={<UserSidebar />} />
              <Route path="PaymentCart" element={<PaymentCart />} />
              <Route path="IdeasToImprove" element={<IdeasToImprove />} />
              <Route path="MoneyTransfer" element={<MoneyTransfer />} />

              <Route path="Wallet" element={<Wallet />} />
              <Route path="Notification" element={<Notification />} />
              <Route path="Skippedcart" element={<Skippedcart />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="Payment/:id" element={<Payment />} />
              <Route path="Home" element={<Home />} />
              <Route path="Navbar" element={<Navbar />} />
              <Route path="Order" element={<Order />} />
              {/* <Route path="Account" element={<Account />} /> */}
              <Route path="Cart" element={<Cart />} />
              <Route
                path="SubscriptionCalender"
                element={<SubscriptionCalender />}
              />
              <Route path="MenuAddon" element={<MenuAddon />} />
            </Route>

            <Route path="admin" element={<PrivateRoute />}>
              <Route path="adminsidebar" element={<AdminSidebar />} />
              <Route path="addsubscription" element={<AddSubscription />} />

              <Route path="orderlist" element={<OrderList />} />
              <Route path="dailymenu" element={<DailyMenu />} />
              <Route path="subscribedusers" element={<SubscribedUsers />} />
              <Route path="parentplan" element={<ParentPlanManagement />} />
              <Route path="tier" element={<TierManagement />} />
              <Route path="duration" element={<DurationManagement />} />
              <Route path="quantity" element={<QuantityManagement />} />
              <Route path="fooditems" element={<FoodItemsManagement />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  );
};

export default App;
