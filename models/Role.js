const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');
// const {
//     default: validator
// } = require('validator');
// const sequelize = require('../config/connection');

class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    department_id: {
        type: DataTypes.INTEGER
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'role'
});

module.exports = Role;