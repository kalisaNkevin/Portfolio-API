import express from 'express';
import {
    getMessages,
    createMessage,
    getMessage,
    deleteMessage
  } from '../controllers/messageController.js';
  
  const router = express.Router();
  
  /**
 * @swagger
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      responses: 
 *          UnauthorizedError:
 *              description: User does not have access to perform the action
 *              content: 
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                              message:
 *                                  type: string
 *                                  example: 'Unauthorized'
 *          NotFoundError:
 *              description: Not Found
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          type: object
 *                          properties: 
 *                              message: 
 *                                  type: string 
 *                                  example: 'Not Found'
 *      schemas:
 *          messageModel: 
 *              type: object
 *              required: 
 *                  - id
 *                  - fullNames
 *                  - email
 *                  - subject
 *                  - text
 *                  - dateOfMessage
 *              properties: 
 *                  id: 
 *                      type: string
 *                      description: Auto Generated Id Of The Message Querry
 *                  fullNames: 
 *                      type: string
 *                      description: Message Sender's Name
 *                  email: 
 *                      type: string
 *                      description: Message Sender's Email Address
 *                  subject: 
 *                      type: string
 *                      description: Message Sender's Proposed Subject
 *                  text: 
 *                      type: string
 *                      description: Message Sender's Querry
 *                  dateOfMessage: 
 *                      type: number
 *                      description: Date of when Message Was Sent
 */

/**
 * @swagger
 * tags: 
 *      name: Message Querries CRUD Operation
 *      description: CRUD Operations Message Querries
 */

/**
 * @swagger
 * /api/v1/messages:
 *      get:
 *          tags: [Message Querries CRUD Operation]
 *          summary: Returns A List Of All Message Querries
 *          security:
 *              - bearerAuth: []
 *          responses: 
 *              200:
 *                  description: List of All Message Querries
 *                  content: 
 *                      application/json: 
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/messageModel'
 */

// Getting all Message


/**
 * @swagger
 * /api/v1/messages/{id}:
 *   get:
 *     summary: Get A Message Querry By ID
 *     tags: [Message Querries CRUD Operation]
 *     security:
 *          - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message Id
 *     responses:
 *       200:
 *         description: Message Querry
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/messageModel'
 *       404:
 *         description: Message not found
 */


// Getting One Message


 /**
 * @swagger
 * /api/v1/messages:
 *   post:
 *     summary: Create A New Message Querry
 *     tags: [Message Querries CRUD Operation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/messageQuerries'
 *     responses:
 *       201:
 *         description: Message Querry Successfully Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/messageModel'
 *       500:
 *         description: Server Error
 */

  // Creating one Message



/**
 * @swagger
 * /api/v1/messages/{id}:
 *   delete:
 *     summary: Deleting Message Querry By Id
 *     tags: [Message Querries CRUD Operation]
 *     security:
 *          - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message Id
 * 
 *     responses:
 *       200:
 *         description: Message Deleted
 *       404:
 *         description: Message Not Found
 *       500:
 *          description: Internal Server Error
 */

  router
    .route('/')
    .get(getMessages)
    .post(createMessage);
  
  router
    .route('/:id')
    .get(getMessage)
    .delete(deleteMessage);
  
  export default router;