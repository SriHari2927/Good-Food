require('dotenv').config();
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const {authentication} = require('./utils/jwt')
const passport = require('./utils/passport.config')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const subRoutes = require('./routes/subscription.routes')
const adrressRoutes = require('./routes/userAddress.routes')
const foodItemRoutes = require('./routes/foodItems.routes')
const mealTypeRoutes = require('./routes/mealType.routes')
const phoneRoutes = require('./routes/phone.routes')
const subscriptionRoutes = require('./routes/subscription.routes')
const subscriptionPaymentRoutes = require('./routes/subscriptionPayment.routes')
const parentPlanRoutes = require('./routes/parentPlan.routes')
const userSubscriptionRoutes = require('./routes/userSubscription.routes')
const tierRoutes = require('./routes/tier.routes')
const pricingRoutes = require('./routes/pricing.routes')
const subscriptionPricingRoutes = require('./routes/subscriptionPricing.routes')
const durationRoutes = require('./routes/duration.routes')
const quantityRoutes = require('./routes/quantity.routes')
const subscriptionFoodMenuRoutes = require('./routes/subscriptionFoodMenu.routes')
const paymentRoutes = require('./routes/payment.routes')
const subscriptionOrderRoutes = require('./routes/subscriptionOrder.routes')
const orderRoutes = require('./routes/orders.routes')
const userFoodReportRoutes = require('./routes/userFoodReport.routes')
const additionalRoutes = require('./routes/additionalItems.routes')
const smsRoutes = require('./routes/sms.routes')
const {startMealSchedulers } = require('./utils/dailyScheduler');
const orderCartRoutes=require('./routes/orderCart.routes')
const notificationRoutes = require('./routes/notification.routes');
const cancellationRoutes = require('./routes/cancellation.routes');

const SkippedCartRoutes = require('./routes/skippedCart.routes');
const adminorderDetailsRoutes = require('./routes/admin.orderDetails.routes');
const adminDurationRoutes = require('./routes/admin.duration.routes');
const adminmealTypeRoutes = require('./routes/admin.mealType.routes');
const adminFoodItemsRoutes = require('./routes/admin.foodItems.routes');
const adminParentPlanRoutes = require('./routes/admin.parentPlan.routes');
const adminSubscriptionPlanRoutes = require('./routes/admin.subscriptionPlan.routes')
const adminTierRoutes = require('./routes/admin.tier.routes')
const adminQuantityRoutes = require('./routes/admin.quantity.routes')
const dailyMenuRoutes = require('./routes/daily_menu.routes')

// const paymentInfoRoutes = require('./routes/paymentInfo.routes')
// const orderCriteriaRoutes = require('./routes/orderCriteria.routes')
// const orderItemRoutes = require('./routes/orderItem.routes')
// const cartRoutes= require('./routes/cart.routes')
 



const app = express();
var morgan = require('morgan')
const port = 5001
startMealSchedulers();
 
app.use(morgan('dev'))
console.log(process.env.CLIENT_URL)
console.log(process.env.REACT_APP_BACKEND_SERVER_URL)
const corsOptions = {

    origin: 
      `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
 
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
 

app.use('/', authRoutes);
app.use('/sub',subRoutes);
app.use('/foodMenu',subscriptionFoodMenuRoutes)
app.use('/extra',additionalRoutes)


app.use(authentication);
app.use('/dailyPeriod',dailyMenuRoutes)


app.use('/userSubscription',userSubscriptionRoutes)
app.use('/api',userRoutes);
app.use('/adrress',adrressRoutes)
app.use('/foodItem',foodItemRoutes)
app.use('/mealType',mealTypeRoutes)
app.use('/phone', phoneRoutes)
app.use('/subscription',subscriptionRoutes)
app.use('/notification',notificationRoutes)
app.use('/cancel',cancellationRoutes)
app.use('/skipcart',SkippedCartRoutes);
app.use('/subsPay',subscriptionPaymentRoutes)
app.use('/parentPlan',parentPlanRoutes)
app.use('/tier',tierRoutes)
app.use('/duration',durationRoutes)
app.use('/price',pricingRoutes)
app.use('/subPrice',subscriptionPricingRoutes)
app.use('/quantity',quantityRoutes)
app.use('/payment',paymentRoutes)
app.use('/subscriptionOrder',subscriptionOrderRoutes)
app.use('/order',orderCartRoutes)
app.use('/orders',orderRoutes)



// app.use('/criteria',orderCriteriaRoutes)
// app.use('/orderItem',orderItemRoutes)
// app.use('/cart',cartRoutes)

app.use('/foodReport',userFoodReportRoutes)


//sms routes
app.use('/sms', smsRoutes);




// app.use('/paymentInfo',paymentInfoRoutes)

// app.use('/criteria',orderCriteriaRoutes)
// app.use('/orderItem',orderItemRoutes)
// app.use('/cart',cartRoutes)





//admin Routes
app.use('/admin',adminorderDetailsRoutes);
app.use('/admin/duration',adminDurationRoutes);
app.use('/admin/mealtype',adminmealTypeRoutes);
app.use('/admin/fooditem',adminFoodItemsRoutes);
app.use('/admin/subscriptionplan',adminSubscriptionPlanRoutes);
app.use('/admin/parentplan',adminParentPlanRoutes);
app.use('/admin/tier',adminTierRoutes);
app.use('/admin/quantity',adminQuantityRoutes);


app.listen(port, () => {
    console.log("Server is Running on port " + port)
})
 