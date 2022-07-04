import { Router } from "express";
import { checkSchema } from "express-validator/check";
import validations from "./validations";
import notificationControllerInstance from "./NotificationController";
import validationHandler from "../../middlewares/validationHandler";
import controllerAdapter from "../../middlewares/controllerAdapter";
const router = Router();

//#region [swagger: /notification]
/**
 * @swagger
 * /notification:
 *   post:
 *     security:
 *      - APIKeyHeader: []
 *     tags:
 *       - Email Notification
 *     description: Send Email Notification
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email_to
 *             - subject
 *             - body
 *           properties:
 *             email_to:
 *               type: string
 *               description: Email address of receipt
 *               example: abc@gmail.com
 *             subject:
 *               type: string
 *               description: email subject.
 *               example: "Introduction"
 *             body:
 *               type: string
 *               description: email content.
 *               example: "Hiiii"
 *     responses:
 *       200:
 *         description: Successfully get
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: string
 *               required:
 *                 - email_to
 *                 - subject
 *                 - body
 *             metadata:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: The status code of the response
 *                   example: 200
 *                 message:
 *                   type: string
 *                   description: The message for the response
 *                   example: ""
 *                 timestamp:
 *                   type: string
 *                   description: The time when the request has been served
 *                   example: 2019-11-04T07:45:32.621Z
 *       400:
 *         description: Bad Request
 *         schema:
 *           $ref: '#/definitions/400'
 *       401:
 *         description: Unauthorized. Tenant not provided or invalid tenant.
 *         schema:
 *           $ref: '#/definitions/401'
 *       403:
 *         description: Unauthorized. Tenant not provided or invalid tenant.
 *         schema:
 *           $ref: '#/definitions/403'
 *       404:
 *         description: Not found
 *         schema:
 *           $ref: '#/definitions/404'
 *       422:
 *         description: Unprocessable entity.Validation Error. Any of the fields sent are invalid.
 *         schema:
 *            $ref: '#/definitions/422'
 *       500:
 *         description: Internal server error
 *         schema:
 *            $ref: '#/definitions/500'
 */
//#endregion
router.route("/").post(
  checkSchema(validations.create as any),
  validationHandler(),
  controllerAdapter(notificationControllerInstance, "create")
);
//#region [swagger: others]
/**
 * @swagger
 * definitions:
 *   400:
 *     properties:
 *       data:
 *          type: object
 *       metadata:
 *          properties:
 *            code:
 *              type: number
 *              example: 400
 *            message:
 *              type: string
 *              example: Bad Request
 *            timestamp:
 *              type: string
 */

/**
 * @swagger
 * definitions:
 *   401:
 *     properties:
 *       err:
 *        type: string
 */

/**
 * @swagger
 *  definitions:
 *    403:
 *      properties:
 *        data:
 *          type: object
 *        metadata:
 *          properties:
 *            code:
 *              type: number
 *              example: 403
 *            message:
 *              type: string
 *              example: Forbidden
 *            timestamp:
 *              type: string
 */

/**
 * @swagger
 * definitions:
 *   404:
 *     properties:
 *       data:
 *        type: object
 *       metadata:
 *          properties:
 *            code:
 *              type: number
 *              example: 404
 *            message:
 *              type: string
 *              example: Page Not found
 *            timestamp:
 *              type: string
 */

/**
 * @swagger
 * definitions:
 *   422:
 *     properties:
 *       data:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              location:
 *                type: string
 *              param:
 *                type: string
 *              value:
 *                type: string
 *              msg:
 *                type: string
 *       metadata:
 *          properties:
 *            code:
 *              type: number
 *              example: 422
 *            message:
 *              type: string
 *              example: Validation Error
 *            timestamp:
 *              type: string
 */

/**
 * @swagger
 * definitions:
 *   500:
 *     properties:
 *       data:
 *          type: object
 *       metadata:
 *          properties:
 *            code:
 *              type: number
 *              example: 500
 *            message:
 *              type: string
 *              example: Internal Server Error
 *            timestamp:
 *              type: string
 */

//#endregion

export default router;
