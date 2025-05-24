import passport from "passport"
import { Strategy } from "passport-local";
import supabase from "../model/userdb.js";
import bcrypt from "bcrypt";

passport.use(
    new Strategy(async function verify(username, password, cb) {
      try {
        const result = await supabase
        .from('users')
        .select()
        .eq('username', username);
        if (result.data.length > 0) {
          const user = result.data[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                return cb(null, user);
              } else {
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
        return cb(err);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });
  
export default passport;