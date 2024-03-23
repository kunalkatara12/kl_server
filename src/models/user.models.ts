import { model, Schema } from "mongoose";
import { workerData } from "worker_threads";

const userSchema = new Schema({
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
})
export const User = model('User', userSchema)