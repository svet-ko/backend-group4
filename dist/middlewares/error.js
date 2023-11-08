import { ApiError } from "../errors/ApiError.js";
export function apiErrorHandler(error, req, res, _) {
    if (error instanceof ApiError) {
        res.status(error.code).json({ msg: error.message });
        return;
    }
    res.status(500).json({ msg: "Something went wrong" });
}
