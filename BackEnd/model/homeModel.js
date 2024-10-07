import { Sequelize } from "sequelize";
import db from "../config/database.js";

const{DataTypes} = Sequelize;

const Home = db.define('Home',{
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    imagePath: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    freezeTableName: true,
    timestamps: true
})

export default Home;