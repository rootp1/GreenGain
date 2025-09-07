import validator from 'validator';
import rateLimit from 'express-rate-limit';
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return validator.escape(validator.trim(input));
};
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { valid: false, message: 'Password must contain uppercase, lowercase, and number' };
  }
  return { valid: true };
};
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, message: 'Email is required' };
  }
  if (!validator.isEmail(email)) {
    return { valid: false, message: 'Invalid email format' };
  }
  if (email.length > 254) {
    return { valid: false, message: 'Email too long' };
  }
  return { valid: true };
};
export const validateUsername = (username) => {
  if (!username || typeof username !== 'string') {
    return { valid: false, message: 'Username is required' };
  }
  const sanitized = validator.trim(username);
  if (sanitized.length < 3 || sanitized.length > 30) {
    return { valid: false, message: 'Username must be 3-30 characters' };
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(sanitized)) {
    return { valid: false, message: 'Username can only contain letters, numbers, hyphens, and underscores' };
  }
  return { valid: true, sanitized };
};
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too many authentication attempts. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true
});
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
export const validateSignupInput = (req, res, next) => {
  const { email, username, password } = req.body;
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    return res.status(400).json({ message: emailValidation.message });
  }
  const usernameValidation = validateUsername(username);
  if (!usernameValidation.valid) {
    return res.status(400).json({ message: usernameValidation.message });
  }
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return res.status(400).json({ message: passwordValidation.message });
  }
  req.body.email = validator.normalizeEmail(email);
  req.body.username = usernameValidation.sanitized;
  next();
};
export const validateLoginInput = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ message: 'Username is required' });
  }
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Password is required' });
  }
  req.body.username = validator.trim(username);
  next();
};
export const validateTreeInput = (req, res, next) => {
  const { species, location, date, treeName, climate, soilType, description, imageUrl } = req.body;
  const requiredFields = { species, location, date, treeName, climate, soilType, description, imageUrl };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value || (typeof value === 'string' && !validator.trim(value))) {
      return res.status(400).json({ message: `${field} is required` });
    }
  }
  if (!validator.isISO8601(date)) {
    return res.status(400).json({ message: 'Invalid date format. Use ISO 8601 format.' });
  }
  if (!validator.isURL(imageUrl)) {
    return res.status(400).json({ message: 'Invalid image URL format' });
  }
  req.body.species = sanitizeInput(species);
  req.body.treeName = sanitizeInput(treeName);
  req.body.climate = sanitizeInput(climate);
  req.body.soilType = sanitizeInput(soilType);
  req.body.description = sanitizeInput(description);
  try {
    if (typeof location === 'string') {
      const parsed = JSON.parse(location);
      if (!parsed.latitude || !parsed.longitude) {
        return res.status(400).json({ message: 'Location must contain latitude and longitude' });
      }
      if (!validator.isFloat(String(parsed.latitude)) || !validator.isFloat(String(parsed.longitude))) {
        return res.status(400).json({ message: 'Invalid latitude or longitude format' });
      }
    }
  } catch (e) {
    return res.status(400).json({ message: 'Invalid location JSON format' });
  }
  next();
};
export const validateProfileUpdate = (req, res, next) => {
  const { username } = req.body;
  const usernameValidation = validateUsername(username);
  if (!usernameValidation.valid) {
    return res.status(400).json({ message: usernameValidation.message });
  }
  req.body.username = usernameValidation.sanitized;
  next();
};
