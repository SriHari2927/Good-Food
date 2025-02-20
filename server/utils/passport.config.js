const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const email = profile.email;

        const user = await prisma.users.upsert({
          where: { email: email },
          update: {
            username: profile.displayName,
            display_picture: profile.photos[0]?.value || null,
            updatedAt: new Date(),
          },
          create: {
            email: email,
            username: profile.displayName,
            display_picture: profile.photos[0]?.value || null,
            created_at: new Date(),
            updatedAt: new Date(),
            customer_id: "", 
          },
        });

    



        const customerId = `GF${String(user.id).padStart(3, "0")}`;

        if (user.customer_id !== customerId) {
          await prisma.users.update({
            where: { id: user.id },
            data: { customer_id: customerId },
          });
        }

        return done(null, {
          user_id: user.id,
          customer_id: customerId,
          username: user.username,
          email: user.email,
        });
      } catch (error) {
        console.error("Error in GoogleStrategy:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
