var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { z } from "zod";
export const productSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        }),
        price: z
            .number({
            required_error: "Price is required",
        })
            .positive(),
        description: z.string({
            required_error: "Description is required",
        }),
        categoryId: z.number({
            required_error: "CategoryId is required",
        }),
        image: z.string().optional(),
    })
});
export function validateProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield productSchema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        }
        catch (error) {
            return res.status(400).json(error);
        }
    });
}
