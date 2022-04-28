import express from 'express';
import {
    register,
    login,
    logout,
    refreshToken,
  } from '../controllers/userController.js';
  import {verifyRefreshToken} from '../authentication/jwtHelper.js';
  
  const router = express.Router();
  

router.post('/register', register);
router.post('/login', login);
router.post('/refresh_token', verifyRefreshToken, refreshToken);
router.delete('/logout', verifyRefreshToken, logout);
 



/**
 * @swagger
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          userModel: 
 *              type: object
 *              required: 
 *                  - id
 *                  - firstName
 *                  - lastName
 *                  - email
 *                  - password                                 
 *              properties: 
 *                  id: 
 *                      type: string
 *                      description: Auto Generated User Id 
 *                  firstName: 
 *                      type: string
 *                      description: First Name Of The User
 *                  lastName: 
 *                      type: string
 *                      description: Last Name Of The User
 *                  email: 
 *                      type: string
 *                      description: User Email
 *                  password: 
 *                      type: string
 *                      description: User Password
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: Authentication & Authorization
 *      description: User Roles, User Authentication & Authorisation  
 */


/**
   * @swagger
   * /api/v1/users/register:
   *   post:
   *     summary: New User Registration
   *     tags: [Authentication & Authorization]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/userModel'
   *     responses:
   *       201:
   *         description: User Created Successfully 
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/userModel'
   *       500:
   *         description: Server Error
   */


/**
   * @swagger
   * /api/v1/users/login:
   *   post:
   *     summary: User Login
   *     tags: [Authentication & Authorization]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/userModel'
   *     responses:
   *       201:
   *         description: User Logged In 
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/userModel'
   *       500:
   *         description: Server Error
   */



/**
   * @swagger
   * /api/v1/users/refresh_token:
   *   post:
   *     summary: Generates A New Refresh token
   *     tags: [Authentication & Authorization]
   *     security:
   *        - bearerAuth: []
   *     responses:
   *       201:
   *         description: Refresh Token Created Successfully 
   *       400:
   *         description: Refresh Token Expired
   *       500:
   *         description: Server Error
   */


/**
   * @swagger
   * /api/v1/users/logout:
   *   delete:
   *     summary: Logout
   *     tags: [Authentication & Authorization]
   *     security:
   *        - bearerAuth: []
   *     responses:
   *       201:
   *         description: User Logged Out Successfully
   *       400:
   *         description: Refresh Token Expired
   *       500:
   *         description: Server Error
   */


  

  
  export default router;