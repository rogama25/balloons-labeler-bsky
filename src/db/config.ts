import {Sequelize} from "sequelize-typescript";
import {User} from "../types/db.js";

export {};

export const db = new Sequelize(process.env.DB || "");

db.addModels([
    User
])
console.log("MODELS LOADED")