/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            userName:
 *              type: string
 *              description: User's username.
 *            firstName:
 *              type: string
 *              description: User's first name.
 *            lastName:
 *              type: string
 *              description: User's last name.
 *            password:
 *              type: string
 *              description: User's password.
 *            email:
 *              type: string
 *              description: User's email address.
 */


import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A JSON array of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Error occurred while fetching users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *     description: Returns a list of all available users in the system.
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
      } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message});
      }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: A single user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found or invalid ID supplied.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *     description: Returns a single user object by user ID.
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ status: 'error', errorMessage: 'Invalid user ID format' });
    }

    const user = await userService.getUserById(userId);

    if (!user) {
      res.status(400).json({ status: 'error', errorMessage: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
  }
});



/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: The newly created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 */


userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const {userName, firstName, lastName, password, email } = req.body;
      const recipe = await userService.createNewUser({userName, firstName, lastName, password, email});
      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /users/check:
 *   post:
 *     summary: Check if a user exists by username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found or invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *     description: Checks if a user exists with the provided username and password.
 */
userRouter.post('/check', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ status: 'error', errorMessage: 'Username and password are required' });
    }

    // Replace with actual service call to check if user exists
    const user = await userService.checkUserExist(username, password);

    if (!user) {
      res.status(400).json({ status: 'error', errorMessage: 'User not found or invalid credentials' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
  }
});


export { userRouter };
