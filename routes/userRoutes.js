import express from 'express';
import { login,
     signup,
     forgotPassword,
     resetPassword,
     protect,
     restrictTo,
     updatePassword,
     logout,
     } from '../controllers/authController.js';
import { deleteUser ,
         updateUser, 
         getAllUsers,
         getUser,
         uploadUserPhoto,
         resizeUserPhoto,
         createUser,
         deleteMe,
         updateMe,
         getMe,
        } from '../controllers/userController.js';
    


const Router = express.Router();



/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    summary: Use to request all users
 *    tags:
 *         - users
 *    responses:
 *      '200':
 *        description: The All users description
 */
/**
 * @swagger
 * /api/v1/users/updateMe:
 *  patch:
 *    summary: Use to update user info
 *    tags:
 *         - users
 *    consumes:
 *        - multipart/form-data
 *    parameters:
 *        - name: image
 *          in: formData
 *          description: User image
 *          required: true
 *          type: file
 *        - name: name
 *          in: formData
 *          description: User name
 *          required: true
 *          type: string
 *        - name: email
 *          in: formData
 *          description: User email
 *          required: true
 *          type: string
 *    responses:
 *      '200':
 *        description: user updated success
 */
/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *    summary: Use to request  user by ID
 *    tags:
 *         - users
 *    parameters:
 *        - name: id
 *          in: path
 *          description: Use to request a user by ID
 *          required:
 *               -id
 *    responses:
 *      '200':
 *        description: The user description
 */
/**
 * @swagger
 * /api/v1/users/logout:
 *  get:
 *    summary: Use to logout a user
 *    tags:
 *        - authentication
 *    responses:
 *      '200':
 *        description: logged out successfully
 */

/**
 * @swagger
 * /api/v1/users/signup:
 *    post:
 *      summary: Use to create a user
 *      tags:
 *        - authentication
 *      consumes:
 *       - application/json
 *      parameters:
 *        - name: user
 *          in: body
 *          description: Use to create a user
 *          required:
 *              -name,
 *              -email,
 *              -password,
 *              -passwordConfirm
 *          schema:
 *            type: object
 *          properties:
 *               name:
 *                 type: string
 *                 example: Kalisa Ngabo Kevin
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *          example:
 *               name: Kalisa Kevin
 *               email: kevinkalisa84@gmail.com
 *               password: andela123
 *               passwordConfirm: andela123
 *      responses:
 *        '201':
 *          description: Successfully created user
 */
/**
 * @swagger
 * /api/v1/users/login:
 *    post:
 *      summary: Use to login a user
 *      tags:
 *        - authentication
 *      consumes:
 *       - application/json
 *      parameters:
 *        - name: user
 *          in: body
 *          description: Use to login a user
 *          required:
 *              -email,
 *              -password
 *          schema:
 *            type: object
 *          properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *          example:
 *               email: kevinkalisa84@gmail.com
 *               password: andela123
 *      responses:
 *        '201':
 *          description: Successfully logged in user
 */

/**
 * @swagger
 * /api/v1/users/updatepassword:
 *    patch:
 *      summary: Use to update user password
 *      tags:
 *        - authentication
 *      parameters:
 *        - name: user
 *          in: body
 *          description: Use to update user password
 *          required:
 *              -password,
 *              -passwordConfirm
 *              -passwordCurrent
 *          schema:
 *            type: object
 *          properties:
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *               passwordCurrent:
 *                 type: string
 *          example:
 *               password: anabele123
 *               passwordConfirm: anabele123
 *               passwordCurrent: andela123
 *      responses:
 *        '200':
 *          description: Password successfully updated
 *          content:
 *             application/json
 *
 * @swagger
 * /api/v1/users/forgotpassword:
 *    post:
 *      summary: Use to send reset password token
 *      tags:
 *        - authentication
 *      parameters:
 *        - name: user
 *          in: body
 *          description: Use to send reset password token
 *          required:
 *              -emain
 *          schema:
 *            type: object
 *          properties:
 *               email:
 *                 type: string
 *          example:
 *               email: kevinkalisa84@gmail.com
 *      responses:
 *        '200':
 *          description: sent a reset token successfully
 *          content:
 *             application/json
 *
 * @swagger
 * /api/v1/users/resetpassword/{token}:
 *    patch:
 *      summary: Use to reset user password
 *      tags:
 *        - authentication
 *      parameters:
 *        - in: path
 *          name: token
 *          description:  This is the user token
 *          required: true
 *        - name: user
 *          in: body
 *          description: Use to reset user password
 *          required:
 *              -password,
 *              -passwordConfirm
 *          schema:
 *            type: object
 *          properties:
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *          example:
 *               password: andela123
 *               passwordConfirm: andela123
 *      responses:
 *        '200':
 *          description: Password successfully updated
 *          content:
 *             application/json
 */



// Protect all routes after this middleware
Router 
      .route('/signUp')
      .post(signup);
Router
      .route('/login')
      .post(login);
 
 Router
      .route('/forgotPassword')
      .post(forgotPassword);
 Router
      .route('/resetPassword/:token')
      .post(resetPassword);     
 Router
       .route('/logout')
       .post(logout);

 Router
       .route('/updateMyPassword')
       .post(updatePassword);

Router
       .route('/')
       .get(getAllUsers)
       .post(createUser);
 
 Router
      .route('/:id')
      .get(getUser)
      .patch(updateUser)
      .delete(deleteUser);


Router.use(protect);
Router.use(restrictTo('admin'));


Router
      .route('/me')
      .post(getUser,getMe);
Router
      .route('/updateMe')
      .post(updateMe,resizeUserPhoto, uploadUserPhoto );
Router
      .route('/deleteMe')
      .post(deleteMe);
      


export default  Router;