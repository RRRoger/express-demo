const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('test_db', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql'
});

const SysConfig = sequelize.define('SysConfig', {
    key: {
        type: DataTypes.STRING,
        unique: true
    },
    value: DataTypes.STRING,
    note: DataTypes.STRING,
}, {
    // 这是其他模型参数
    tableName: "sys_config",
});

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
}, {
    // 这是其他模型参数
    tableName: "sys_user",
});

const Role = sequelize.define('Role', {
    name: DataTypes.STRING
}, {
    tableName: "sys_role",
});

const Model = sequelize.define('Model', {
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    code: {
        type: DataTypes.STRING,
        unique: true
    },
}, {
    tableName: "sys_model",
});

const ModelLine = sequelize.define('ModelLine', {
    name: DataTypes.STRING,
    note: DataTypes.STRING,
}, {
    tableName: "sys_model_line",
});


// 建立多对多关系
Role.belongsToMany(User, { through: "user_role" });
User.belongsToMany(Role, { through: "user_role" });
User.belongsToMany(Model, { through: "model_developers" });
Model.belongsToMany(User, { through: "model_developers" });
User.belongsToMany(Model, { through: "model_users" });
Model.belongsToMany(User, { through: "model_users" });

// 建立关联关系
Model.hasMany(ModelLine, {
    foreignKey: "modelId"
});
ModelLine.belongsTo(Model, {
    foreignKey: "modelId"
});

(async () => {
    await sequelize.sync({ force: true });
    // 这里是代码

    // await User.create({ name: `Roger-${new Date()}` });
    // await SysConfig.create({ key: `Key-${new Date()}`, value: "XXXX" });

    const users = await User.findAll();
    console.log("All users:", JSON.stringify(users, null, 2));

})();
