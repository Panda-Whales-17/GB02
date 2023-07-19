const db = require('../config/profileSchema.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userController = {};

userController.makeUser = async (req, res, next) => {
  
  const { username, password, contact } = req.body;
  
  //Check and see if username is taken
  const result = await db.query('SELECT name FROM users WHERE name = $1', [
    username,
  ]);
  
  if (result.rows.length > 0) {
    res.locals.existingUser = true;
    return next({
      log: 'usercontroller.makeuser: User tried to sign up for a username that is already taken',
      status: 400,
      message: 'Username taken',
    });
  }

  // Expect req.body has username and password
  if (!username || !password)
    return next({
      log: 'Express error handler caught at userController.makeUser',
      message: { err: 'Must input both a username and password' },
    });

  // Create new user in DB with hashed Pwd
  
  
  const hash = await bcrypt.hash(password, saltRounds)
  
  console.log(hash)
  
  const text = `INSERT INTO users (name, password, contact, community)
  VALUES ($1, $2, $3, $4)`;
  const values = [username, hash, contact, 1]; // 1 for CTRI17
  
  try {
  // DATABASE CODE FOR CREATING USER GOES HERe
       await db.query(text, values);
         console.log('user added successfully');

    // Add USER_ID on res.locals.userId
    const newUser = await db.query(
      `SELECT * FROM users WHERE name = $1`,
      [username]
    );
    // console.log( newUser.rows[0].user_id)

    const { user_id } = newUser.rows[0];

    

    res.locals.userId = user_id;
    console.log('This is locals',res.locals.userId);
    return next();
  } catch (err) {
    
    return next('Express error handler caught at userController.makeUser');
};

}

userController.newSession = async (req, res, next) => {

  const { userID } = req.body;
  // Here after creating or authenticating. Make a new 1.5 minute session and send them cookies.
  const addCookie = await db.query(`INSERT INTO cookie (userID)`)

  res.cookie('SSID', res.locals.userId, { httpOnly: true });
  next();
};

userController.endSession = (req, res, next) => {
  res.clearCookie('SSID');
  next();
};

userController.authenticate = async (req, res, next) => {
  // Here for verifying authentication of new users
  // If they have a valid session already, next()
  // if (req.cookies('SSID')) next;

  // If they don't have a valid session, check req.body for username + password
  const { username, password } = req.body;
  // Hash salt + Pwd and check database. If valid, next.
  try {
    // Add USER_ID on res.locals.userId
    const userIdResult = await db.query(
      `SELECT user_id, password FROM users WHERE name = $1`,
      [username]
    );
    console.log('Results of userIdResult', userIdResult.rows[0])
    const { userId, password } = userIdResult.rows[0];

    const userPassword = password;
  
// get user information from the table.
// check if the user exist. IF NOT?
//if user does exist, then compare deconstructed password with user password from table
// if true, redirect to hompage.$
//else redirect to login page.
    if (userIdResult.length == 0) {
      return next({
        log: 'usercontroller.authenticate: Invalid username or password',
        status: 401,
        message: 'Invalid username or password',
      });
    }

    const authenticate = await bcrypt.compare(password, userPassword)

    res.locals.userId = userId;

    

    if(authenticate) return next();

    console.log(`${username} is successfully signed in`);

  } catch (err) {
    return next({
      log: 'Error occured in userController.authenticate.',
    });
  }
};

userController.authorizeEdit = (req, res, next) => {
  // Here to edit or delete. Verify that they have a valid session and that User_ID is the author of req/params/id. If not, error.
  const postAuthorId = req.locals.postRequest.userId;
  if (req.cookies('SSID') === postAuthorId) {
    // User is authorized to edit or delete their own post
    next();
  } else {
    // User not authorized to edit/delete another's post
    return next({
      log: 'usercontroller.authorizeEdit: User not authorized to modify another users post.',
      status: 401,
      message: 'Unauthorized action.',
    });
  }
};

userController.findUser = async (req, res, next) => {
  const userName = req.params.id;
  const lookupText = 'SELECT * FROM users WHERE name = $1';
  const lookupVals = [userName];
  try {
    const { rows } = await db.query(lookupText, lookupVals);
    console.log('Retrieved user lookup: ', rows);
    if (rows.length === 0) {
      return next({
        log: 'Failed to find matching user in userController.findUser',
        message: { err: 'Lookup error.' },
      });
    }
    res.locals.userRequest = rows[0];
    next();
  } catch (err) {
    return next({
      log: 'Encountered lookup error in postController.findPostsByUser',
      message: { err: 'Lookup error.' },
    });
  }
};

module.exports = userController;
