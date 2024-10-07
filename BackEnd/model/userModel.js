import { Sequelize } from "sequelize";
import db from "../config/database.js";

const{DataTypes} = Sequelize;

const User = db.define('User',{
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'admin',
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: true
})

export default User;