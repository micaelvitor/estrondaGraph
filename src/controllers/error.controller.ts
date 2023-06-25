import { GraphQLError } from 'graphql';

export class errorController{

    public handleCastError = (error) => {
        const message = `Invalid ${error.path}: ${error.value}`;
        throw new GraphQLError(message + 'GRAPHQL_VALIDATION_FAILED');
    };

    public handleValidationError = (error) => {
        const message = Object.values(error.errors).map((el:any) => el.message);
        throw new GraphQLError(
            `Invalid input: ${message.join(', ')}` + 'GRAPHQL_VALIDATION_FAILED'
        );
    };

    public errorHandler = (err) => {
        if (err.name === 'CastError') this.handleCastError(err);
        if (err.name === 'ValidationError') this.handleValidationError(err);
            throw err;
    };
}
