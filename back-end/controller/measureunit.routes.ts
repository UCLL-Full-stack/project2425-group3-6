/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Measureunit:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Name of the measurement unit.
 *            size:
 *              type: number
 *              description: Size or quantity the measurement unit in grams.
 */


import express, { NextFunction, Request, Response } from 'express';
import measureunitService from '../service/measureunit.service';

const measureunitRouter = express.Router();

/**
 * @swagger
 * /measureunits:
 *   get:
 *     summary: Get a list of all measurement units.
 *     responses:
 *       200:
 *         description: A JSON array of all measurement units.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Measureunit'
 *       400:
 *         description: Error occurred while fetching measurement units.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *     description: Returns a list of all available measurement units.
 */

measureunitRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const measureunits = await measureunitService.getAllMeasureunits();
        res.status(200).json(measureunits);
      } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message});
      }
});

export { measureunitRouter };
