import bcrypt from "bcrypt";
import supabase from "../model/userdb.js";
import passport from "passport";
import validator from "validator";
const loginAttempts = new Map();
const LOCKOUT_TIME = 15 * 60 * 1000; 
const MAX_ATTEMPTS = 5;
export const signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const checkResult = await supabase
      .from("users")
      .select("id")
      .or(`username.eq.${username},email.eq.${email}`);
    if (checkResult.error) {
      console.error("Error checking for existing user:", checkResult.error);
      return res.status(500).json({ message: "Database error while checking user" });
    }
    if (checkResult.data && checkResult.data.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const insertResult = await supabase
      .from("users")
      .insert({ email, username, password: hashedPassword });
    if (insertResult.error) {
      console.error("Error inserting user:", insertResult.error);
      return res.status(500).json({ message: "Error creating user account" });
    }
    const userFetch = await supabase
      .from("users")
      .select("id, username, email")
      .eq("username", username)
      .single();
    if (userFetch.error || !userFetch.data) {
      console.error("Error fetching inserted user:", userFetch.error);
      return res.status(500).json({ message: "Failed to retrieve user after registration" });
    }
    const user = userFetch.data;
    req.login(user, (err) => {
      if (err) {
        console.error("Login error after signup:", err);
        return res.status(500).json({ message: "Error logging in after registration" });
      }
      loginAttempts.delete(username);
      return res.status(200).json({ 
        message: "User registered and logged in successfully", 
        user: { id: user.id, username: user.username, email: user.email }
      });
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = (req, res, next) => {
  const { username } = req.body;
  const attempts = loginAttempts.get(username);
  if (attempts && attempts.count >= MAX_ATTEMPTS) {
    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
    if (timeSinceLastAttempt < LOCKOUT_TIME) {
      const remainingTime = Math.ceil((LOCKOUT_TIME - timeSinceLastAttempt) / 60000);
      return res.status(429).json({ 
        message: `Account temporarily locked. Try again in ${remainingTime} minutes.` 
      });
    } else {
      loginAttempts.delete(username);
    }
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ message: "Authentication error" });
    }
    if (!user) {
      const current = loginAttempts.get(username) || { count: 0, lastAttempt: 0 };
      current.count += 1;
      current.lastAttempt = Date.now();
      loginAttempts.set(username, current);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Login error" });
      }
      loginAttempts.delete(username);
      const safeUser = {
        id: user.id,
        username: user.username,
        email: user.email
      };
      return res.status(200).json({ 
        message: "User logged in successfully", 
        user: safeUser
      });
    });
  })(req, res, next);
};
export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({status:"logout"});
  });
};
export const checkauth = (req, res) => {
  console.log('Auth check:', {
    isAuthenticated: req.isAuthenticated(),
    hasUser: !!req.user,
    sessionID: req.sessionID,
    userAgent: req.get('User-Agent')?.substring(0, 50)
  });
  
  if (req.isAuthenticated() && req.user) {
    const safeUser = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    };
    return res.status(200).json({ 
      authenticated: true, 
      message: "User is authenticated",
      user: safeUser 
    });
  } else {
    console.log('Authentication failed - user not authenticated or no user object');
    return res.status(401).json({ 
      authenticated: false, 
      message: "User is not authenticated" 
    });
  }
};
export const updateProfile = async (req, res) => {
  if(!req.isAuthenticated() || !req.user?.id) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  const userId = req.user.id;
  const { username } = req.body;
  if(!username || typeof username !== 'string' || !validator.trim(username)) {
    return res.status(400).json({ message: 'Valid username required' });
  }
  const newName = validator.trim(username);
  try {
    const existing = await supabase
      .from('users')
      .select('id')
      .eq('username', newName)
      .neq('id', userId);
    if(existing.error){
      console.error('Username check error', existing.error);
      return res.status(500).json({ message: 'Failed to verify username availability' });
    }
    if(existing.data && existing.data.length > 0) {
      return res.status(409).json({ message: 'Username already taken' });
    }
    const updateResult = await supabase
      .from('users')
      .update({ username: newName })
      .eq('id', userId)
      .select('id, username, email')
      .single();
    if(updateResult.error){
      console.error('Update error', updateResult.error);
      return res.status(500).json({ message: 'Failed to update profile' });
    }
    req.login(updateResult.data, (err) => {
      if(err){
        console.error('Session update error', err);
        return res.status(200).json({ 
          message: 'Profile updated successfully', 
          user: updateResult.data 
        });
      }
      return res.status(200).json({ 
        message: 'Profile updated successfully', 
        user: updateResult.data 
      });
    });
  } catch (e) {
    console.error('updateProfile exception', e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};