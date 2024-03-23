import {
    Request,
    Response,
    NextFunction
} from "express";
import asyncHandler from "../utils/asyncHandler.utils";
import  ApiResponse  from "../utils/ApiResponse.utils";
import { User } from "../models/user.models";
import  ApiError  from "../utils/ApiError.utils";
import * as xlsx from 'xlsx';
import fs from "fs";
import async from 'async';
interface CandidateData {
    'Name of the Candidate': string;
    Email: string;
    'Mobile No.': string;
    'Date of Birth': string;
    'Resume Title': string;
    'Work Experience': string;
    'Current Location': string;
    'Postal Address': string;
    'Current Employer': string;
    'Current Designation': string;
}

const addIntoDB = async (data: any[]) => {
    try {
        async.eachSeries(data, async (item: any, callback: any) => {
            const { name, email, mobileNo, dob, resumeTitle, workExperience, currentLocation, postalAddress, currentEmployer, currentDesignation } = item;
            try {
                const exUser = await User.findOne({ email });
                if (exUser) {
                    // Skip this candidate and move to the next one
                    return callback();
                }
                const user = new User({
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
            } catch (error) {
                callback(error); // Pass error to the main handler
            }
        }, (error: any) => {
            if (error) {
                throw new ApiError(500, "Error in addIntoDB", error);
            }
        });
    } catch (error: any) {
        console.log("Error in addIntoDB:", error);
        throw new ApiError(500, "Error in addIntoDB", error);
    }
};
const getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
    } catch (error: any) {
        console.log("Error in getUsers:", error);
        throw new ApiError(500, "Error in getUsers", error);
    }
});

const addUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, mobileNo, dob, resumeTitle, workExperience, currentLocation, postalAddress, currentEmployer, currentDesignation } = req.body;
        if (!name || !email || !mobileNo || !dob || !resumeTitle || !workExperience || !currentLocation || !postalAddress || !currentEmployer || !currentDesignation) {
            throw new ApiError(400, "Please provide all the fields");
        }
        if (!email.includes('@') || !email.includes('.')) {
            throw new ApiError(400, "Please provide a valid email address");
        }
        if (mobileNo.length !== 10) {
            throw new ApiError(400, "Please provide a valid mobile number");
        }
        const exUser = await User.findOne({ email });
        if (exUser) {
            throw new ApiError(400, "User already exists with this email");
        }
        const user = new User({
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
        res.status(201).json(new ApiResponse(201, user, "User added successfully"));
    } catch (error: any) {
        console.log("Error in addUser:", error);
        throw new ApiError(500, "Error in addUser", error);
    }
});

const addFile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.file;
        if (!file) {
            throw new ApiError(400, "Please provide a file");
        }
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0]; // Assuming the first sheet is the one of interest
        const worksheet = workbook.Sheets[sheetName];
        const data: CandidateData[] = xlsx.utils.sheet_to_json(worksheet, { raw: false });
        console.log(typeof data, data);
        const mappedData = data.map((item: CandidateData) => {
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
        fs.unlinkSync(file.path);
        res.status(200).json(new ApiResponse(200, mappedData, "File uploaded successfully"));
    } catch (error: any) {
        console.log("Error in addFile:", error);
        throw new ApiError(500, "Error in addFile", error);
    }
});
export { getUsers, addUser, addFile };