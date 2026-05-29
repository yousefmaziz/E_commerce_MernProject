import userModel from "../models/userModel.js";
import bcryptt from "bcrypt";
import jwt from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
export const register = async ({ firstName, lastName, email, password, }) => {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
        return { data: "User already exists", statusCode: 400 };
    }
    const hashedPassword = await bcryptt.hash(password, 10);
    const newUser = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    await newUser.save();
    return {
        data: generateToken({ firstName, lastName, email }),
        statusCode: 200,
    };
};
export const login = async ({ email, password }) => {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
        return { data: "User not found", statusCode: 404 };
    }
    const isMatch = await bcryptt.compare(password, findUser.password);
    if (!isMatch) {
        return { data: "Invalid password", statusCode: 400 };
    }
    return {
        data: generateToken({
            email,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
        }),
        statusCode: 200,
    };
};
const generateToken = (data) => {
    return jwt.sign(data, "2000");
};
export const getMyOrder = async ({ userId }) => {
    try {
        const orders = await orderModel.find({ userId });
        return {
            data: orders,
            statusCode: 200,
        };
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=userServices.js.map