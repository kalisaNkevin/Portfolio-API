import express from 'express';
import {
    getBlogs,
    createBlog,
    getBlog,
    deleteBlog,
    updateBlog
  } from '../controllers/blogController.js';
  
  const router = express.Router();
  

  // Blog CRUD Operations Route 
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
 *          blogModel: 
 *              type: object
 *              required: 
 *                  - id
 *                  - title
 *                  - body
 *                  - dateOfArticle                  
 *              properties: 
 *                  id: 
 *                      type: string
 *                      description: Auto Generated Id Of The Blog Article
 *                  title: 
 *                      type: string
 *                      description: Title Of The Blog Article
 *                  body: 
 *                      type: string
 *                      description: Article Content
 *                  dateOfArticle: 
 *                      type: number
 *                      description: Date Article Was Created
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: Blog CRUD Operation
 *      description: Blog Articles CRUD Operations 
 */

/**
 * @swagger
 * /api/v1/blogs:
 *      get:
 *          tags: [Blog CRUD Operation]
 *          summary: Returns A List Of All Blog Articles 
 *          responses: 
 *              200:
 *                  description: List of All Blog Articles
 *                  content: 
 *                      application/json: 
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/blogModel'
 */

  
   /**
   * @swagger
   * /api/v1/blogs/{id}:
   *   get:
   *     summary: Get An Article By ID
   *     tags: [Blog CRUD Operation]
   *     security:
   *        - bearerAuth: [] 
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Message Id
   *     responses:
   *       200:
   *         description: Article
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/blogModel'
   *       404:
   *         description: Message not found
   */
    
    // Getting One Article
  

    /**
   * @swagger
   * /api/v1/blogs:
   *   post:
   *     summary: Create A New Article
   *     tags: [Blog CRUD Operation]
   *     security:
   *        - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/blogModel'
   *     responses:
   *       201:
   *         description: New Article Created Successfully 
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/blogModel'
   *       500:
   *         description: Server Error
   */
    
    // Creating one Article
  

    /**
   * @swagger
   * /api/v1/blogs/{id}:
   *  patch:
   *    summary: Update Article By Id
   *    tags: [Blog CRUD Operation]
   *    security:
   *        - bearerAuth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Article Id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/blogModel'
   *    responses:
   *      204:
   *        description: Article Updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/blogModel'
   *      404:
   *        description: Article Not Found
   *      500:
   *        description: Internal Server Error
   */
    // Updating One Article
     
  
    /**
   * @swagger
   * /api/v1/blogs/{id}:
   *   delete:
   *     summary: Deleting An Article By Id
   *     tags: [Blog CRUD Operation]
   *     security:
   *        - bearerAuth: []
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
   *         description: Article Deleted
   *       404:
   *         description: Article Not Found
   */
    // Deleting One Article



  router
    .route('/')
    .get(getBlogs)
    .post(createBlog);
  
  router
    .route('/:id')
    .get(getBlog)
    .patch(updateBlog)
    .delete(deleteBlog);
  
  export default router;