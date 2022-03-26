const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:'https://www.madridsalud.es/serviciopad/wp-content/uploads/bfi_thumb/estudio-revela-que-estadounidenses-gastan-cada-vez-mas-en-videojuegos-02-e1445888221548-mq1n2pwxokcxzj1lgbq1xan51jsnq7tx93br8mno30.jpg'
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    createdInDb : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    
    },
  });
};
