const {
    Model,
    DataTypes
} = require('sequelize');
const {
    default: validator
} = require('validator');
const sequelize = require('../config/connection');

class Department extends Model {}

Department.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'department'
});

module.exports = Department;