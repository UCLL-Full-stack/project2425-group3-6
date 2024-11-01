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
    const { query } = req.params; // Extracting the search query from URL parameters
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

export { ingredientRouter };


