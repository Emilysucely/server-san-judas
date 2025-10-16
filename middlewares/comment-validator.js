import { check } from "express-validator";
import { validarCampos } from "./validate-values.js";
import { validateJWT } from "./jwt-verify.js";
import { existePost, existeComment, isCommentOwner} from "../helpers/db-validators.js"

export const createCommentValidator = [
    validateJWT, 
    check("text", "El texto del comentario es obligatorio").not().isEmpty(),
    check("text", "El comentario debe tener maximo 500 carateres").isLength({ max: 3000 }),
    check("post", "EL ID del post es obligatorio").not().isEmpty(),
    check("post", "El ID del post debe ser un ObjectId valido").isMongoId(),
    check("post").custom(existePost),
    validarCampos,
]; 