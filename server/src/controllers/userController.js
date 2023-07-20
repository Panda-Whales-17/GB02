const db = require('../config/profileSchema.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userController = {};

userController.makeUser = async (req, res, next) => {
  const { username, password, contact } = req.body;

  //Check and see if username is taken
  const result = await db.query('SELECT name FROM users WHERE name = $1;', [
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

  const hash = await bcrypt.hash(password, saltRounds);

  console.log(hash);

  const text = `INSERT INTO users (name, password, contact, community)
  VALUES ($1, $2, $3, $4);`;
  const values = [username, hash, contact, 1]; // 1 for CTRI17

  try {
    // DATABASE CODE FOR CREATING USER GOES HERe
    await db.query(text, values);
    console.log('user added successfully');

    // Add USER_ID on res.locals.userId
    const newUser = await db.query(`SELECT * FROM users WHERE name = $1;`, [
      username,
    ]);
    // console.log( newUser.rows[0].user_id)

    const { name, user_id } = newUser.rows[0];

    res.locals.userId = { name, user_id };
    console.log('This is locals', res.locals.userId);
    return next();
  } catch (err) {
    return next('Express error handler caught at userController.makeUser');
  }
};

userController.newSession = async (req, res, next) => {
  try {
    const { username } = req.query;
    const user = await db.query(`SELECT user_id FROM users WHERE name = $1`, [
      username,
    ]);
    const user_id = user.rows[0].user_id;
    const found = await db.query(`SELECT ssid FROM cookies WHERE ssid = $1;`, [
      user_id,
    ]);

    if (found.rows.length === 0) {
      const addCookie = await db.query(
        `INSERT INTO cookies (ssid) VALUES($1)`,
        [user_id]
      );
      console.log(`Cookie successfully added: ${addCookie}`);
      res.cookie('SSID', user_id, { httpOnly: true });
    } else {
      console.log('cookie already exists, cannot add.');
    }
    return next();
  } catch (error) {
    return next({
      log: error,
      message: 'cookie failed to create',
    });
  }
};

userController.endSession = async (req, res, next) => {
  try {
    res.clearCookie('SSID', { httpOnly: true });
    const { user_id } = req.query;
    await db.query(`DELETE FROM cookies WHERE ssid = $1;`, [user_id]);
    console.log(`cookie successfully deleted`);
    return next();
  } catch (error) {
    return next({
      log: error,
      message: 'Could not delete cookie',
    });
  }
};

userController.authenticate = async (req, res, next) => {
  // Here for verifying authentication of new users
  // If they don't have a valid session, check req.body for username + password
  const { username, password } = req.body;
  const userPassword = password;
  // Hash salt + Pwd and check database. If valid, next.
  try {
    // Add USER_ID on res.locals.userId
    const userIdResult = await db.query(
      `SELECT user_id, password FROM users WHERE name = $1`,
      [username]
    );

    const { user_id, password } = userIdResult.rows[0];
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

    const authenticate = await bcrypt
      .compare(userPassword, password)
      .then(function (isMatching) {
        if (isMatching) {
          return true;
        }
        return false;
      });

    res.locals.userId = { username, user_id };
    if (authenticate) {
      console.log(`${username} is successfully signed in`);
    } else {
      throw new Error('wrong password');
    }
    return next();
  } catch (err) {
    return next({
      log: 'Error occured in userController.authenticate.',
    });
  }
};

userController.authorizeEdit = async (req, res, next) => {
  // Here to edit or delete. Verify that they have a valid session and that User_ID is the author of req/params/id. If not, error.

  const postAuthorId = res.locals.postRequest.uploader;
  console.log(postAuthorId)

  try {
    const checkCookie = await db.query(`SELECT * FROM cookies WHERE id = $1`, [postAuthorId]);
    
    if (checkCookie.rows.length > 0) return next();
  }
  // User is authorized to edit or delete their own post
  catch(err) {
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
  const lookupText = 'SELECT * FROM users WHERE name = $1;';
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

// checks to see if a user is logged in. Runs immediately on the first load of the page.
userController.isLoggedIn = async (req, res, next) => {
  try {
    // if there is a cookie on the browser, we'll run this search if they have a session in the database.
    if (req.cookies.SSID) {
      const cookie = req.cookies.SSID;
      const found = await db.query(`SELECT ssid FROM cookies WHERE ssid = $1`, [
        cookie,
      ]);
      if (found.rows[0].length !== 0) {
        const user = await db.query(
          `SELECT name FROM users WHERE user_id = $1`,
          [cookie]
        );
        // sending back the username and id to be assigned right off the get go.
        res.locals.loggedIn = true;
        res.locals.user = { username: user.rows[0].name, user_id: cookie };
        return next();
      }
    }
    // if they don't have a session, we'll just return a falsy value.
    res.locals.loggedIn = false;
    return next();
  } catch (error) {
    return next({
      log: error,
      message: 'error with session check.',
    });
  }
};

module.exports = userController;
