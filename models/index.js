const User = require("./User");
const Department = require("./Department");
const Role = require("./Role");

// create associations
// User.hasOne(Role, {
//     foreignKey: 'user_id',  
// });
Role.hasMany(User, {
    foreignKey: 'role_id'
});

User.belongsTo(Role, {
    foreignKey: "role_id"
});

Department.hasMany(Role, {
    foreignKey: "department_id"
});

Role.belongsTo(Department, {
    foreignKey: "department_id"
});

// Department.hasMany(User, {
//     foreignKey: 'department_id'
// })

// User.belongsTo(Department, {
//     foreignKey: 'department_id'
// })

module.exports = {
    User,
    Department,
    Role
};

