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
const orderCriteriaRoutes = require('./routes/orderCriteria.routes')
// const orderItemRoutes = require('./routes/orderItem.routes')
const cartRoutes= require('./routes/cart.routes')
const userFoodReportRoutes = require('./routes/userFoodReport.routes')
const additionalRoutes = require('./routes/additionalItems.routes')
 
const app = express();
var morgan = require('morgan')
const port = 5001
 
 
app.use(morgan('dev'))
const corsOptions = {
    origin: [
      `${process.env.CLIENT_URL}`,
      `${process.env.REACT_APP_BACKEND_SERVER_URL}`,
    ],
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
app.use('/userSubscription',userSubscriptionRoutes)













app.use('/api',userRoutes);
app.use('/adrress',adrressRoutes)
app.use('/foodItem',foodItemRoutes)
app.use('/mealType',mealTypeRoutes)
app.use('/phone', phoneRoutes)
app.use('/subscription',subscriptionRoutes)
app.use('/subsPay',subscriptionPaymentRoutes)
app.use('/parentPlan',parentPlanRoutes)
app.use('/tier',tierRoutes)
app.use('/duration',durationRoutes)
app.use('/price',pricingRoutes)
app.use('/subPrice',subscriptionPricingRoutes)
app.use('/quantity',quantityRoutes)
app.use('/payment',paymentRoutes)
app.use('/subscriptionOrder',subscriptionOrderRoutes)
app.use('/orders',orderRoutes)
app.use('/criteria',orderCriteriaRoutes)
// app.use('/orderItem',orderItemRoutes)
app.use('/cart',cartRoutes)
app.use('/foodReport',userFoodReportRoutes)
 
app.listen(port, () => {
    console.log("Server is Running on port " + port)
})
 