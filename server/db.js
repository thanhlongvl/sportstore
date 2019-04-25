const Sequelize = require('sequelize');
const sequelize = new Sequelize('sportstore', 'root', 'long123456', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    timezone: '+07:00',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const Customer = sequelize.define('customers', {
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    phonenumber: {
        type: Sequelize.STRING
      }
  });

  const Staff = sequelize.define('staffs', {
    name: {
      type: Sequelize.STRING
    },  
    sex: {
        type: Sequelize.TINYINT
      },
    address: {
      type: Sequelize.STRING
    },
    phonenumber: {
        type: Sequelize.STRING
    },
    dob: {
        type: Sequelize.DATE
      }
  });

  const Brand = sequelize.define('brands', {
    name: {
      type: Sequelize.STRING
    }
  });

  const Product = sequelize.define('products', {
    name: {
      type: Sequelize.STRING
    },  
    import_price: {
        type: Sequelize.FLOAT
      },
    export_price: {
      type: Sequelize.FLOAT
    },
    amount: {
        type: Sequelize.INTEGER
    },
    url_image: {
        type: Sequelize.STRING
    },
    note: {
        type: Sequelize.STRING
    }
  });

  const Order = sequelize.define('orders', {
    total: {
        type: Sequelize.FLOAT
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    date: {
      type: Sequelize.DATE
    }
  });

  const OrderDetail = sequelize.define('orderdetails', {
    quatity: {
      type: Sequelize.INTEGER
    },  
    price: {
        type: Sequelize.FLOAT
    },
    discount: {
        type: Sequelize.FLOAT
    },
    amount: {
        type: Sequelize.FLOAT
    },
    orderID:{
      type: Sequelize.INTEGER
    },
    productID:{
      type: Sequelize.INTEGER
    }
  });

  // Relations

//customer
Customer.hasMany(Order);

//brand
Brand.hasMany(Product);

//staff
//Staff.hasMany(Order);

//product
Product.belongsTo(Brand);
Product.hasMany(OrderDetail);

//order
Order.hasMany(OrderDetail);
Order.belongsTo(Customer);
//Order.belongsTo(Staff);

//orderdetail
OrderDetail.belongsTo(Product);
OrderDetail.belongsTo(Order);


module.exports = sequelize;