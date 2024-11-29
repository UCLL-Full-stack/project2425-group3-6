/**
 * @swagger
 *   components:
 *    schemas:
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Authentication response.
 *            token:
 *              type: string
 *              description: JWT access token.
 *            username:
 *              type: string
 *              description: User name.
 *            fullname:
 *             type: string
 *             description: Full name.
 *      AuthenticationRequest:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *            firstName:
 *              type: string
 *              description: First name.
 *            lastName:
 *              type: string
 *              description: Last name.
 *            email:
 *              type: string
 *              description: E-mail.
 *      UserInput:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *            firstName:
 *              type: string
 *              description: First name.
 *            lastName:
 *              type: string
 *              description: Last name.
 *            email:
 *              type: string
 *              description: E-mail.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/index';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
      try {
          const users = await userService.getAllUsers();
          res.status(200).json(users);
      } catch (error) {
          next(error);
      }
  }
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: Authentication successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       401:
 *         description: Authentication failed.
 */
userRouter.post(
    '/login',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    message: 'username and password are required.',
                });
            }

            // Call the authenticate method in the service layer
            const authResponse = await userService.authenticate(username, password);

            res.status(200).json({
                message: 'Authentication successful',
                ...authResponse, // Includes token, username, fullname
            });
        } catch (error) {
          console.error(error);
        }
    }
);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user (signup)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (e.g., user already exists)
 *       500:
 *         description: Internal server error
 */
userRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const { username, password, firstName, lastName, email} = req.body;

        // Call the createUser function to create the user
        const newUser = await userService.createUser({ username, password, firstName, lastName, email});

        res.status(201).json(newUser);  // Return the created user
    } catch (error) {
        console.error(error);
    }
});

export { userRouter };
