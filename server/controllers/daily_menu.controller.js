const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const createPeriodical = async(req,res) => {
    try {
        const {period,comments}=req.body;

        const newPeriod = await prisma.periodical.create({
            data: {
                period,
                comments,
                created_at: new Date(),
                updatedAt: new Date()
            }
        })
        res.status(200).json({message : "Created ",newPeriod})
    } catch (error) {
        console.log(error)
        res.status(404).json({error:"No periodical created yet"})
    }
}


const createDailyMenu = async(req,res) => {
    try {
        const {period,subscription_food_menu_id}=req.body;
        const newMenu = await prisma.daily_Menu.create({
            data:{
                period,
                subscription_food_menu_id,
                created_at:new Date(),
                updatedAt: new Date()
            }
        })
        res.status(200).json({message : "Daily Menu Created",newMenu})
    } catch (error) {
        console.log(error)
        res.status(404).json({error:"No menu created"})
    }
}


const getMenuwithPeriod = async(req,res) => {
    try {
        const {period}=req.body;
        const getMenu = await prisma.daily_Menu.findMany({
            where:{period},
            select:{
                subscription_food_menu_id:true,
                periods:{
                  select : {
                    period:true
                  }  
                },
                subFoodMenuu:{
                    
                    select:{
                        
                        
                        FoodSubscription:{
                            
                            select: {
                                
                                 parentPlan1: {
                                    select : 
                                    {
                                        id:true,
                                        plan_name:true
                                    }
                                 },
                                 PricingDetails:{
                                    select : {
                                        id:true,
                                        price:true
                                    }
                                 }
                            }
                        },
                        
                        
                        FoodItems : {
                            select : {
                                id:true,
                               item_name:true ,
                               item_type:true
                            }
                        },
                       mealType:{
                        select:{
                            id:true,
                            meal_type:true
                        }
                       } 
                    }
                }
            }
        })
        const formattedMenu = getMenu.map(item => ({
            period_name : item.periods.period,
            plan_id : item.subFoodMenuu.FoodSubscription.parentPlan1.id,
            plan_name:item.subFoodMenuu.FoodSubscription.parentPlan1.plan_name,
            meal_type_id : item.subFoodMenuu.mealType.id,
            meal_type : item.subFoodMenuu.mealType.meal_type,
            food_name : item.subFoodMenuu.FoodItems.item_name,
            food_type:item.subFoodMenuu.mealType.meal_type,
            price_id:item.subFoodMenuu.FoodSubscription.PricingDetails.id,
            price:item.subFoodMenuu.FoodSubscription.PricingDetails.price
            

        }))
        res.status(200).json({message:"Menu fetched successfully",formattedMenu})
    } catch (error) {
        console.log(error)
        res.status(404).json({error:"No menu is displayed"})
    }
}

module.exports={createDailyMenu,createPeriodical,getMenuwithPeriod}


