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

export { userRouter };
