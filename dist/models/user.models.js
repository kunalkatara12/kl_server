"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
    },
    dob: {
        type: String,
    },
    resumeTitle: {
        type: String,
    },
    workExperience: {
        type: String,
    },
    currentLocation: {
        type: String,
    },
    postalAddress: {
        type: String,
    },
    currentEmployer: {
        type: String,
    },
    currentDesignation: {
        type: String,
    },
}, {
    timestamps: true
});
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.models.js.map