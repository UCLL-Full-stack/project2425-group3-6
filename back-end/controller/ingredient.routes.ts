/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Ingredient:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Ingredient name.
 *            calories:
 *              type: number
 *              description: Calories in the ingredient.
 *            fats:
 *              type: number
 *              description: Amount of fats in grams.
 *            proteins:
 *              type: number
 *              description: Amount of proteins in grams.
 *            carbohydrates:
 *              type: number
 *              description: Amount of carbohydrates in grams.
 */

import express, { NextFunction, Request, Response } from 'express';
import ingredientService from '../service/ingredient.service';

const ingredientRouter = express.Router();

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get a list of all ingredients.
 *     responses:
 *       200:
 *         description: A JSON array of all ingredients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Error occurred while fetching ingredients.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *     description: Returns a list of all available ingredients in the system.
 */
ingredientRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredients = await ingredientService.getAllIngredients();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /ingredients/search/{query}:
 *   get:
 *     summary: Search for ingredients by name.
 *     parameters:
 *       - name: query
 *         in: path
 *         required: true
 *         description: The name of the ingredient to search for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A JSON array of matching ingredients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Error occurred while searching for ingredients.
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
ingredientRouter.get('/search/:query', async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.params;
    try {
        if (!query) {
            throw new Error("Search query parameter is required.");
        }

        const ingredients = await ingredientService.searchIngredients(query);
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Get an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the ingredient to retrieve.
 *         schema:
 *           type: number
 *           format: int64
 *     responses:
 *       200:
 *         description: The requested ingredient.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found.
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
 *         description: Error occurred while fetching the ingredient.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *     description: Returns the ingredient for the given ID.
 */

ingredientRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; 
  try {
      const ingredient = await ingredientService.getIngredientById(Number(id)); 
      if (ingredient) {
          res.status(200).json(ingredient); 
      } else {
          res.status(404).json({ status: 'error', errorMessage: 'Recipe not found.' }); 
      }
  } catch (error) {
      res.status(400).json({ status: 'error', errorMessage: (error as Error).message }); 
  }
});


export { ingredientRouter };


