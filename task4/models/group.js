import { DataTypes } from 'sequelize';

const Group = (sequelize) => {
    return sequelize.define(
        'Groups', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            permissions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false
            }
        }
    );
};

export default Group;
