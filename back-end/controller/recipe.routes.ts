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

export { recipeRouter };
