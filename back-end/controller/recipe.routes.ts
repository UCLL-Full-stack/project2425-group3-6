/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Recipe:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            title:
 *              type: string
 *              description: Recipe title.
 *            description:
 *              type: string
 *              description: Recipe description.
 *            instructions:
 *              type: string
 *              description: Recipe instructions.
 *            portion_amount:
 *              type: number
 *              description: Amount of portions the recipe serves.
 *            owner:
 *              $ref: '#/components/schemas/User'
 *            ingredients:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Ingredient'
 *          required:
 *            - title
 *            - description
 *            - instructions
 *            - portion_amount
 *            - owner
 *            - ingredients
 *
 *      RecipeInput:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              description: Recipe title.
 *            description:
 *              type: string
 *              description: Recipe description.
 *            instructions:
 *              type: string
 *              description: Recipe instructions.
 *            portion_amount:
 *              type: number
 *              description: Amount of portions the recipe serves.
 *            ownerUsername:
 *              type: string
 *              description: Username of the recipe owner.
 *            ingredients:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/IngredientInput'
 *          required:
 *            - title
 *            - description
 *            - instructions
 *            - portion_amount
 *            - ownerUsername
 *            - ingredients
 * 
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            username:
 *              type: string
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *          required:
 *            - id
 *            - username
 *            - firstName
 *            - lastName
 *            - email
 *
 *      UserInput:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *          required:
 *            - username
 *            - firstName
 *            - lastName
 *            - email
 * 
 *      Ingredient:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            quantity:
 *              type: number
 *          required:
 *            - name
 *            - quantity
 * 
 *      IngredientInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            quantity:
 *              type: number
 *          required:
 *            - name
 *            - quantity
 */




import express, { NextFunction, Request, Response } from 'express';
import recipeService from '../service/recipe.service';

const recipeRouter = express.Router();

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get a list of all recipes.
 *     responses:
 *       200:
 *         description: A JSON array of all recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Error occurred while fetching recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *     description: Returns a list of all available recipes in the system.
 */
recipeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.status(200).json(recipes);
      } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message});
      }
});

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeInput'
 *     responses:
 *       201:
 *         description: The newly created recipe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
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


recipeRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const {title,description,instructions,portion_amount,ownerUsername,ingredients } = req.body;
      const recipe = await recipeService.createRecipe({title,description,instructions,portion_amount,ownerUsername,ingredients});
      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /recipes/user/{username}:
 *   get:
 *     summary: Get all recipes for a specific user.
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username of the user whose recipes to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A JSON array of recipes belonging to the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: User not found or no recipes found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *       400:
 *         description: Error occurred while fetching user recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *     description: Returns a list of all recipes for a specific user.
 */
recipeRouter.get('/user/:username', async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params; 
  try {
      const recipes = await recipeService.getRecipeByUser(username); 
      if (recipes.length > 0) {
          res.status(200).json(recipes); 
      } else {
          res.status(404).json({ status: 'error', errorMessage: 'No recipes found for this user.' });
      }
  } catch (error) {
      res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
  }
});

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the recipe to delete.
 *         schema:
 *           type: number
 *           format: int64
 *     responses:
 *       204:
 *         description: Recipe deleted successfully.
 *       404:
 *         description: Recipe not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *       400:
 *         description: Error occurred while deleting the recipe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
recipeRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; 
  try {
      const deletedRecipe = await recipeService.deleteRecipeById(Number(id)); 
      if (deletedRecipe) {
          res.status(204).send(); 
      } else {
          res.status(404).json({ status: 'error', errorMessage: 'Recipe not found.' }); 
      }
  } catch (error) {
      res.status(400).json({ status: 'error', errorMessage: (error as Error).message }); 
  }
});

recipeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; 
  try {
      const recipe = await recipeService.getRecipeById(Number(id)); 
      if (recipe) {
          res.status(200).json(recipe); 
      } else {
          res.status(404).json({ status: 'error', errorMessage: 'Recipe not found.' }); 
      }
  } catch (error) {
      res.status(400).json({ status: 'error', errorMessage: (error as Error).message }); 
  }
});


export { recipeRouter };
