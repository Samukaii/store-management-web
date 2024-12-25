import { RandomSchema } from "src/app/shared/models/random-schema";
import {isObjectLiteral} from "src/app/shared/helpers/is-object-literal/is-object-literal";

export const isSchema = (value: unknown): value is RandomSchema => isObjectLiteral(value)
