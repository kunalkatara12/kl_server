"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    }
    catch (error) {
        res
            .status(error.code || 500)
            .json({ success: false, message: error.message });
    }
};
exports.default = asyncHandler;
//# sourceMappingURL=asyncHandler.utils.js.map