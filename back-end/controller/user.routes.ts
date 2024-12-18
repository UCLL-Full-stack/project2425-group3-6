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

            const authResponse = await userService.authenticate(username, password);

            res.status(200).json({
                message: 'Authentication successful',
                ...authResponse, 
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

        const newUser = await userService.createUser({ username, password, firstName, lastName, email});

        res.status(201).json(newUser);  
    } catch (error) {
        console.error(error);
    }
});

/**
 * @swagger
 * /users/{userName}/favourites:
 *   post:
 *     summary: Add a recipe to the user's favourites
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: integer
 *                 description: ID of the recipe to add
 *     responses:
 *       200:
 *         description: Recipe successfully added to favourites.
 *       404:
 *         description: User or recipe not found.
 *       400:
 *         description: Recipe is already a favourite.
 *       500:
 *         description: Internal server error.
 */
userRouter.post(
    '/:userName/favourites',
    async (req: Request, res: Response, next: NextFunction) => {
      const { userName } = req.params;
      const { recipeId } = req.body;
  
        if (!recipeId) {
            return res.status(400).json({ message: 'recipeId is required in the request body.' });
        }
  
        await userService.addFavouriteRecipeToUser(userName, recipeId);
        res.status(200).json({ message: 'Recipe successfully added to favourites.' });
    }
);

/**
 * @swagger
 * /users/{userName}/favourites:
 *   get:
 *     summary: Get all favourite recipes for a user
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Username to retrieve favourite recipes
 *     responses:
 *       200:
 *         description: List of favourite recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       404:
 *         description: No favourite recipes found for the user.
 *       500:
 *         description: Internal server error.
 */
userRouter.get(
    '/:userName/favourites',
    async (req: Request, res: Response, next: NextFunction) => {
      const { userName } = req.params;
  
      try {
        const favouriteRecipes = await userService.getFavouriteRecipes(userName);
  
        if (favouriteRecipes.length === 0) {
          return res
            .status(404)
            .json({ message: `No favourite recipes found for user ${userName}.` });
        }
  
        res.status(200).json(favouriteRecipes);
      } catch (error) {
        console.error(`Error fetching favourite recipes for user ${userName}:`, error);
  
        res
          .status(500)
          .json({ message: "An error occurred while retrieving favourite recipes." });
  
        next(error);
      }
    }
  );
  
  /**
 * @swagger
 * /users/{userName}/favourites/{recipeId}:
 *   delete:
 *     summary: Remove a recipe from the user's favourites
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *       - name: recipeId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the recipe to remove from favourites
 *     responses:
 *       200:
 *         description: Recipe successfully removed from favourites.
 *       404:
 *         description: User or recipe not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.delete(
  '/:userName/favourites/:recipeId',
  async (req: Request, res: Response, next: NextFunction) => {
      const { userName, recipeId } = req.params;
      
      if (!userName || !recipeId) {
          return res.status(400).json({ message: 'Both userName and recipeId are required.' });
      }

      try {
          await userService.deleteFavouriteRecipeToUser(userName, parseInt(recipeId));
          res.status(200).json({ message: `Recipe with id ${recipeId} successfully removed from ${userName}'s favourites.` });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "An error occurred while removing the favourite recipe." });
          next(error);
      }
  }
);

  
  

export { userRouter };
