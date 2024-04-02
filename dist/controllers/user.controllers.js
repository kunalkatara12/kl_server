"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFile = exports.addUser = exports.getUsers = void 0;
const asyncHandler_utils_1 = __importDefault(require("../utils/asyncHandler.utils"));
const ApiResponse_utils_1 = __importDefault(require("../utils/ApiResponse.utils"));
const user_models_1 = require("../models/user.models");
const ApiError_utils_1 = __importDefault(require("../utils/ApiError.utils"));
const xlsx = __importStar(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const async_1 = __importDefault(require("async"));
const addIntoDB = async (data) => {
    try {
        async_1.default.eachSeries(data, async (item, callback) => {
            const { name, email, mobileNo, dob, resumeTitle, workExperience, currentLocation, postalAddress, currentEmployer, currentDesignation } = item;
            try {
                const exUser = await user_models_1.User.findOne({ email });
                if (exUser) {
                    // Skip this candidate and move to the next one
                    return callback();
                }
                const user = new user_models_1.User({
                    name,
                    email,
                    mobileNo,
                    dob,
                    resumeTitle,
                    workExperience,
                    currentLocation,
                    postalAddress,
                    currentEmployer,
                    currentDesignation
                });
                await user.save();
                callback(); // Move to the next candidate
            }
            catch (error) {
                callback(error); // Pass error to the main handler
            }
        }, (error) => {
            if (error) {
                throw new ApiError_utils_1.default(500, "Error in addIntoDB", error);
            }
        });
    }
    catch (error) {
        console.log("Error in addIntoDB:", error);
        throw new ApiError_utils_1.default(500, "Error in addIntoDB", error);
    }
};
const getUsers = (0, asyncHandler_utils_1.default)(async (req, res, next) => {
    try {
        const users = await user_models_1.User.find();
        res.status(200).json(new ApiResponse_utils_1.default(200, users, "Users fetched successfully"));
    }
    catch (error) {
        console.log("Error in getUsers:", error);
        throw new ApiError_utils_1.default(500, "Error in getUsers", error);
    }
});
exports.getUsers = getUsers;
const addUser = (0, asyncHandler_utils_1.default)(async (req, res, next) => {
    try {
        const { name, email, mobileNo, dob, resumeTitle, workExperience, currentLocation, postalAddress, currentEmployer, currentDesignation } = req.body;
        if (!name || !email || !mobileNo || !dob || !resumeTitle || !workExperience || !currentLocation || !postalAddress || !currentEmployer || !currentDesignation) {
            throw new ApiError_utils_1.default(400, "Please provide all the fields");
        }
        if (!email.includes('@') || !email.includes('.')) {
            throw new ApiError_utils_1.default(400, "Please provide a valid email address");
        }
        if (mobileNo.length !== 10) {
            throw new ApiError_utils_1.default(400, "Please provide a valid mobile number");
        }
        const exUser = await user_models_1.User.findOne({ email });
        if (exUser) {
            throw new ApiError_utils_1.default(400, "User already exists with this email");
        }
        const user = new user_models_1.User({
            name,
            email,
            mobileNo,
            dob,
            resumeTitle,
            workExperience,
            currentLocation,
            postalAddress,
            currentEmployer,
            currentDesignation
        });
        await user.save();
        res.status(201).json(new ApiResponse_utils_1.default(201, user, "User added successfully"));
    }
    catch (error) {
        console.log("Error in addUser:", error);
        throw new ApiError_utils_1.default(500, "Error in addUser", error);
    }
});
exports.addUser = addUser;
const addFile = (0, asyncHandler_utils_1.default)(async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            throw new ApiError_utils_1.default(400, "Please provide a file");
        }
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0]; // Assuming the first sheet is the one of interest
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet, { raw: false });
        console.log(typeof data, data);
        const mappedData = data.map((item) => {
            return {
                name: item['Name of the Candidate'],
                email: item.Email,
                mobileNo: item['Mobile No.'],
                dob: item['Date of Birth'],
                resumeTitle: item['Resume Title'],
                workExperience: item['Work Experience'],
                currentLocation: item['Current Location'],
                postalAddress: item['Postal Address'],
                currentEmployer: item['Current Employer'],
                currentDesignation: item['Current Designation']
            };
        });
        console.log(mappedData);
        await addIntoDB(mappedData);
        fs_1.default.unlinkSync(file.path);
        res.status(200).json(new ApiResponse_utils_1.default(200, mappedData, "File uploaded successfully"));
    }
    catch (error) {
        console.log("Error in addFile:", error);
        throw new ApiError_utils_1.default(500, "Error in addFile", error);
    }
});
exports.addFile = addFile;
//# sourceMappingURL=user.controllers.js.map