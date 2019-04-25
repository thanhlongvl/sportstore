const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLInputObjectType } = require('graphql');

const { GraphQLDate, GraphQLDateTime} = require('graphql-iso-date')

const Db = require('./db');
const fetch = require('node-fetch')

//const Product = require('./model_graphQL/product');
//const Customer = require('./model_graphQL/customer');
//const Order = require('./model_graphQL/order');
//const OrderDetail = require('./model_graphQL/orderdetail');
//const Staff = require('./model_graphQL/staff');
//const Brand = require('./model_graphQL/brand');



const Customer = new GraphQLObjectType({
  name: 'Customer',
  description: 'This represents a Customer',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (customer) {
          return customer.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve (customer) {
          return customer.name;
        }
      },
      address: {
        type: GraphQLString,
        resolve (customer) {
          return customer.address;
        }
      },
      phonenumber: {
          type: GraphQLString,
          resolve (customer) {
            return customer.phonenumber;
          }
        },
      orders: {
        type: new GraphQLList(Order),
        resolve (customer) {
          return customer.getOrders();
        }
      }
    };
  }
});

const Order = new GraphQLObjectType({
  name: 'Order',
  description: 'This represents a Order',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (order) {
          return order.id;
        }
      },
      total: {
        type: GraphQLFloat,
        resolve (order) {
          return order.total;
        }
      },
      status: {
        type: GraphQLBoolean,
        resolve (order) {
          return order.status;
        }
      },
      date: {
        type: GraphQLDate,
        resolve (order) {
          return order.date;
        }
      },
      customer: {
          type: Customer,
          resolve (order) {
            return order.getCustomer();
          }
      },
      orderdetails: {
        type: new GraphQLList(OrderDetail),
        resolve (parent, args) {
          const id= parent.id;
          const response = 
          fetch(`http://localhost:8080/sportstore/orderdetail/${id}`).then( (kq) => {
            //console.log(kq);
            return kq.json();
              });
          return response;
        }
      }
    };
  }
});

const Brand = new GraphQLObjectType({
  name: 'Brand',
  description: 'This represents a Brand',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (brand) {
          return brand.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve (brand) {
          return brand.name;
        }
      },
      products: {
        type: new GraphQLList(Product),
        resolve (product) {
          return product.getProducts();
        }
      }
    };
  }
});

const OrderDetail = new GraphQLObjectType({
  name: 'OrderDetail',
  description: 'This represents a OrderDetail',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (orderdetail) {
          return orderdetail.id;
        }
      },
      quatity: {
        type: GraphQLInt,
        resolve (orderdetail) {
          return orderdetail.quatity;
        }
      },
      price: {
        type: GraphQLFloat,
        resolve (orderdetail) {
          return orderdetail.price;
        }
      },
      discount: {
          type: GraphQLFloat,
          resolve (orderdetail) {
            return orderdetail.discount;
          }
      },
      amount: {
          type: GraphQLFloat,
          resolve (orderdetail) {
            return orderdetail.amount;
          }
      },
      order: {
          type: Order,
          resolve (orderdetail) {
            return orderdetail.getOrder();
          }
      },
      product: {
          type: Product,
          resolve (parent, args) {
            return Db.models.products.findOne({
              where: {
                id: parent.productID
              }
            });
          }
      }
    };
  }
});

const OrderDetailInput = new GraphQLInputObjectType({
  name: 'OrderDetailInput',
  description: 'This represents a OrderDetail Input',
  fields: () => {
    return {
      quatity: {
        type: GraphQLInt
      },
      price: {
        type: GraphQLFloat
      },
      discount: {
          type: GraphQLFloat
      },
      amount: {
          type: GraphQLFloat
      },
      productID: {
          type: GraphQLInt
      }
    };
  }
})

const Product = new GraphQLObjectType({
  name: 'Product',
  description: 'This represents a Product',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (product) {
          return product.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve (product) {
          return product.name;
        }
      },
      import_price: {
        type: GraphQLFloat,
        resolve (product) {
          return product.import_price;
        }
      },
      export_price: {
          type: GraphQLFloat,
          resolve (product) {
            return product.export_price;
          }
      },
      amount: {
          type: GraphQLInt,
          resolve (product) {
            return product.amount;
          }
      },
      url_image: {
          type: GraphQLString,
          resolve (product) {
            return product.url_image;
          }
      },
      note: {
          type: GraphQLString,
          resolve (product) {
            return product.note;
          }
      },
      orderdetails: {
        type: new GraphQLList(OrderDetail),
        resolve (parent, args) {
          return Db.models.orderdetails.findAll({
            where: {
              productID: parent.id
            }
          });
        }
      },
      brand: {
          type: Brand,
          resolve (product) {
            return product.getBrand();
          }
      }
    };
  }
});

const Staff = new GraphQLObjectType({
  name: 'Staff',
  description: 'This represents a Staff',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (staff) {
          return staff.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve (staff) {
          return staff.name;
        }
      },
      sex: {
          type: GraphQLBoolean,
          resolve (staff) {
            return staff.sex;
          }
        },
      address: {
        type: GraphQLString,
        resolve (staff) {
          return staff.address;
        }
      },
      phonenumber: {
          type: GraphQLString,
          resolve (staff) {
            return staff.phonenumber;
          }
      },
      dob: {
          type: GraphQLDate,
          resolve (staff) {
            return staff.dob;
          }
        }
    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      customers: {
        type: new GraphQLList(Customer),
        args: {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          console.log(root);
          return Db.models.customers.findAll({ where: args });
        }
      },
      customer: {
        type: Customer,
        args: { 
          id: { 
            type: new GraphQLNonNull(GraphQLInt)
          } 
        },
        resolve(root, args) {
          return Db.models.customers.findById(args.id);
        }
      },
      orders: {
        type: new GraphQLList(Order),
        args: {
          id: {
            type: GraphQLInt
          },
          customerID: {
            type: GraphQLInt
          }
        },
        resolve (root, args) {
          return Db.models.orders.findAll({ where: args });
        }
      },
      orderbyid: {
        type: Order,
        args: { 
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, args) {
          return Db.models.orders.findById(args.id);
        }
      },
      staffs: {
        type: new GraphQLList(Staff),
        args: {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return Db.models.staffs.findAll({ where: args });
        }
      },
      staff: {
        type: Staff,
        args: { 
          id: { 
            type: new GraphQLNonNull(GraphQLInt)
          } 
        },
        resolve(root, args) {
          return Db.models.staffs.findById(args.id);
        }
      },
      brands: {
        type: new GraphQLList(Brand),
        args: {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return Db.models.brands.findAll({ where: args });
        }
      },
      brand: {
        type: Brand,
        args: { 
          id: { 
            type: new GraphQLNonNull(GraphQLInt)
          } 
        },
        resolve(root, args) {
          return Db.models.brands.findById(args.id);
        }
      },
      products: {
        type: new GraphQLList(Product),
        args: {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return Db.models.products.findAll({ where: args });
        }
      },
      product: {
        type: Product,
        args: { 
          id: { 
            type: new GraphQLNonNull(GraphQLInt)
          } 
        },
        resolve(root, args) {
          return Db.models.products.findById(args.id);
        }
      },
      orderdetails: {
        type: new GraphQLList(OrderDetail),
        args: {
          id: {
            type: GraphQLInt
          },
          productID: {
            type: GraphQLInt
          },
          orderID: {
            type: GraphQLInt
          }
        },
        resolve (root, args) {
          return Db.models.orderdetails.findAll({ where: args });
        }
      },
      orderdetail: {
        type: OrderDetail,
        args: { 
          id: { 
            type: new GraphQLNonNull(GraphQLInt)
          } 
        },
        resolve(root, args) {
          return Db.models.orderdetails.findById(args.id);
        }
      },
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields () {
    return {
      addCustomer: {
        type: Customer,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          address: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phonenumber: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve (source, args) {
          return Db.models.customers.create({
            name: args.name,
            address: args.address,
            phonenumber: args.phonenumber
          });
        }
      },
      updateCustomer: {
        type: Customer,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          name: {
            type: GraphQLString
          },
          address: {
            type: GraphQLString
          },
          phonenumber: {
            type: GraphQLString
          }
        },
        resolve (source, args) {
          return Db.models.customers.update({
            name: args.name,
            address: args.address,
            phonenumber: args.phonenumber
          }, {
            where: {
                id: args.id
            }
          }).thenReturn(Db.models.customers);
        } 
      },
      addBrand: {
        type: Brand,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve (source, args) {
          return Db.models.brands.create({
            name: args.name
          });
        }
      },
      updateBrand: {
        type: Brand,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          name: {
            type: GraphQLString
          }
        },
        resolve (source, args) {
          return Db.models.brands.update({
            name: args.name
          }, {
            where: {
                id: args.id
            }
          }).thenReturn(Db.models.brands);
        } 
      },
      addProduct: {
        type: Product,
        args: {
          brandID: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          import_price: 
          {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          export_price: 
          {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          amount: 
          {
            type: new GraphQLNonNull(GraphQLInt)
          },
          url_image: 
          {
            type: new GraphQLNonNull(GraphQLString)
          },
          note: 
          {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve (source, args) {
          return Db.models.brands.findById(args.brandID).then(brand => {
            return brand.createProduct({
              name: args.name,
              import_price: args.import_price,
              export_price: args.export_price,
              amount: args.amount,
              url_image: args.url_image,
              note: args.note
            });
          });
        }
      },
      updateProduct: {
        type: Product,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          brandID: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          },
          import_price: 
          {
            type: GraphQLFloat
          },
          export_price: 
          {
            type: GraphQLFloat
          },
          amount: 
          {
            type: GraphQLInt
          },
          url_image: 
          {
            type: GraphQLString
          },
          note: 
          {
            type: GraphQLString
          }
        },
        resolve (source, args) {
          return Db.models.products.update({
            brandID: args.brandID,
            name: args.name,
            import_price: args.import_price,
            export_price: args.export_price,
            amount: args.amount,
            url_image: args.url_image,
            note: args.note
          }, {
            where: {
                id: args.id
            }
          }).thenReturn(Db.models.products);
        } 
      },
      addStaff: {
        type: Staff,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          sex: {
            type: new GraphQLNonNull(GraphQLBoolean)
          },
          address: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phonenumber: {
            type: new GraphQLNonNull(GraphQLString)
          },
          dob: {
            type: new GraphQLNonNull(GraphQLDate)
          }
        },
        resolve (source, args) {
          return Db.models.staffs.create({
            name: args.name,
            sex: args.sex,
            address: args.address,
            phonenumber: args.phonenumber,
            dob: args.dob
          });
        }
      },
      updateStaff: {
        type: Staff,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          name: {
            type: GraphQLString
          },
          sex: {
            type: GraphQLBoolean
          },
          address: {
            type: GraphQLString
          },
          phonenumber: {
            type: GraphQLString
          },
          dob: {
            type: GraphQLDate
          }
        },
        resolve (source, args) {
          return Db.models.staffs.update({
            name: args.name,
            sex: args.sex,
            address: args.address,
            phonenumber: args.phonenumber,
            dob: args.dob
          }, {
            where: {
                id: args.id
            }
          }).thenReturn(Db.models.staffs);
        } 
      },
      addOrder: {
        type: Order,
        args: {
          customerID: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          total: 
          {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          products:
          {
            type: new GraphQLList(OrderDetailInput)
          }
        },
        resolve (source, args) {
          return Db.transaction().then(t => {
            return Db.models.customers.findById(args.customerID).then(customer => {
              return customer.createOrder({
                total: args.total
              },{transaction: t}).then(order => {
                fetch('http://localhost:8080/sportstore/orderdetail', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify({
                  orderid: order.id,
                  products: args.products
                  })
                }).then((result) => {
                  return t.commit();
                }).catch(err => {
                  console.log(err);
                  return t.rollback();
              })
                //return order;
              })
            });
          });
          
        }
      },
      updateOrder: {
        type: Order,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          date: {
            type: GraphQLDate
          },
          total: 
          {
            type: GraphQLFloat
          }
        },
        resolve (source, args) {
          return Db.models.orders.update({
            date: args.date,
            total: args.total,
          }, {
            where: {
                id: args.id
            }
          }).thenReturn(Db.models.orders);
        } 
      },
      deleteOrder: {
        type: Order,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve (source, args) {
          return Db.models.orders.destroy({
            where: {
              id: args.id
            }
          }).then(order => {
            fetch(`http://localhost:8080/sportstore/orderdetail/${args.id}`, {
              method: "DELETE",
              mode: "cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers: {
                  "Content-Type": "application/json; charset=utf-8",
              },
              redirect: "follow",
              referrer: "no-referrer"
              })
              return order;
          });
        } 
      },
      addOrderDetail: {
        type: OrderDetail,
        args: {
          orderID: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          productID: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          quatity: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          price: 
          {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          discount: 
          {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          amount: 
          {
            type: new GraphQLNonNull(GraphQLFloat)
          }
        },
        resolve (source, args) {
          return Db.models.orderdetails.create({
            productID: args.productID,
            orderID: args.orderID,
            quatity: args.quatity,
            price: args.price,
            discount: args.discount,
            amount: args.amount
          });
        }
      },
      updateOrderDetail: {
        type: OrderDetail,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          quatity: {
            type: GraphQLInt
          },
          price: 
          {
            type: GraphQLFloat
          },
          discount: 
          {
            type: GraphQLFloat
          },
          amount: 
          {
            type: GraphQLFloat
          }
        },
        resolve (source, args) {
          return Db.models.orderdetails.update({
            quatity: args.quatity,
            price: args.price,
            discount: args.discount,
            amount: args.amount
          }, {
            where: {
                id: args.id
            }
          }).thenReturn(Db.models.orderdetails);
        } 
      }
    };
  }
});


module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});