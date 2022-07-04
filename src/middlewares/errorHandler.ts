import * as logger from '../libs/Logger';

import { EnvVars, StatusCodes } from '../libs/constants';
import IResponse from '../entities/responses/IResponse';
import {
	DuplicateKeyError,
	UnprocessableError,
	BadRequestError,
	NotFoundError,
} from '../entities/errors';
import {
	BadRequestResponse,
	NotFoundResponse,
	UnprocessableResponse,
	InternalServerErrorResponse,
} from '../entities/responses';

export default function errorHandler(env: string) {
	return function(err: any, req: any, res: any, next: any) {
		if (env !== EnvVars.TEST) {
			logger.error('errorHandler - :', JSON.stringify(err, null, 2));
		}

		let response: IResponse;
		switch (err.type) {
			case DuplicateKeyError.name:
				response = new UnprocessableResponse(err.data, err.message);
				break;
			case UnprocessableError.name:
				response = new UnprocessableResponse(err.data, err.message);
				break;
			case BadRequestError.name:
				response = new BadRequestResponse(err.data, err.message);
				break;
			case NotFoundError.name:
				response = new NotFoundResponse(err.message);
				break;
			case InternalServerErrorResponse.name:
			default:
				response = new InternalServerErrorResponse(
					err.data,
					err.isPublic ? err.message : StatusCodes[err.status]
				);
				break;
		}

		response.data = response.data && response.data.length && response.data.map(element => {
			return {
				location: element.location,
				value: "",
				param: element.param,
				msg: element.msg
			};
		});

		res.locals.response = response;
		res.locals.outcome = 'failed';
		res.status(response.metadata.code).json(response);
	};
}
