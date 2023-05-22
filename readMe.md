*Middleware 2 Assignment*

For this assignment you have to create a new branch - assignment/middleware2
Your *user document* should look like this
{ 
    _id: ObjectId("61951bfa4d9fe0d34da86829"),
    name: "Sabiha Khan",
	balance:100, // Default balance at user registration is 100
	address:"New delhi",
	age: 90,
 	gender: “female” // Allowed values are - “male”, “female”, “other”
	isFreeAppUser: false // Default false value.
}

Your *product document* should look like this
{
	_id: ObjectId("61951bfa4d9fe0d34da86344"),
	name:"Catcher in the Rye",
	category:"book",
	price:70 //mandatory property
}

Your *Order document* looks like this.
{
	_id: ObjectId("61951bfa4d9fe0d34da86344"),
	userId: “61951bfa4d9fe0d34da86829”,
	productId: “61951bfa4d9fe0d34da86344”
	amount: 0,
	isFreeAppUser: true, 
	date: “22/11/2021”
}

NOTE: In some of the below apis a header validation is to be performed (create user and create order). The name of the header is ‘isFreeAppUser’. Write a *header validation* that simply checks whether this header is present or not. Please note this validation should only be *called in create user and create order apis*. Perform this validation in a middleware.

Write a POST api to create a product from the product details in request body.

Write a POST api to create a user that takes user details from the request body. If the header isFreeAppUser is not present terminate the request response cycle with an error message that the request is missing a mandatory header. The value of field isFreeAppUser is determined by isFreeAppUser request header.

Write a POST api for *order purchase* that takes a *userId and a productId* in request body. 
If the header *isFreeAppUser is not present terminate the request response cycle with an error message* that the request is missing a mandatory header If the header is present the control goes to the request handler. *Perform the user and product validation*. 
//done
Check if the *user exists as well as whether the product exists*. Return an error with a suitable error message if either of these validations fail For every purchase we save an order document in the orders collection. isFreeAppUser property in an Order document depends on the header isFreeAppUser. If the isFreeAppUser header is true then the balance of the user is not deducted and the amount in order is set to 0 as well the attribute in order isFreeAppUser is set to true. *If this header has a false value then the product’s price is checked*. This value is deducted from the user’s balance and the order amount is set to the product’s price as well as the attrbiute isFreeAppUser is set to false in order document.

Update the logic in middleware to set the isFreeAppUser attribute in req. Use this attribute in the route handler for setting the isFreeAppUser attributes of User and Order collection.

*Hints for problem 3*
Validate the header in a middleware. Terminate the req-res cycle if this fails.
Validate the userId. Send error if userId is invalid
Validate the productId. Send the error if productId is invalid
Now write the logic for order creation. 3 scenarios
//Scenario 1 For paid user app and the user has sufficient balance. We deduct the balance from user's balance and update the user. We create an order document
//Scenaio 2 For paid app user and the user has insufficient balance. We send an error that the user doesn't have enough balance
//Scenario 3 For free app user, we dont check user's balance and create the order with 0 amount.


let createOrder = async function(req,res) {
   try {
    let header = req.headers["isFreeAppUser"]
    let userId = req.body.userId
    let productId = req.body.productId

    let user = await userModel.findById(userId)
    let product = await productModel.findById(productId)

    let more = user.balance - product.price
    if(header == "false") {
        if(more > 0) {
            let userBalace = await userModel.findByIdAndUpdate(
                id ,
                {$set : {balance : more}} ,
                {new : true}
            )
            req.body.amount = product.price
            let orderInfo = req.body
            let createOrder = await orderModel.create(orderInfo)
            res.status(401).send({order : createOrder})
        }
        else if(more < 0) {
            res.send({error : "Insufficient balance"})
        }
        else {
            req.body.amount = 0
            let data = req.body
            let orderCreate = await orderModel.create(data)
            res.status(401).send({order : orderCreate})
        }
    }

   }catch(error) {
    console.log(error)
    res.status(500).send({error : "Internal Server Error"})
   }
}







Assignment Auth 
Assignment
For this assignment you have to create a new branch - assignment/auth-1
Your user document should look like this
	{
    "_id" : ObjectId("6226e3d2b98f22b349ca58be"),
    "firstName" : "Sabiha",
    "lastName" : "Khan",
    "mobile" : "9898909087",
    "emailId" : "sk@gmail.com",
    "password" : "password123",
    "gender" : "female",
	"isDeleted": false, //default value is false 
    "age" : 12,
    "createdAt" : ISODate("2022-03-08T05:04:18.737Z"),
    "updatedAt" : ISODate("2022-03-08T05:04:18.737Z"),
    "__v" : 0
}

Write a POST api /users to register a user from the user details in request body.
Write a *POST api /login to login a user that takes user details - email and password from the request body. If the credentials don't match with any user's data return a suitable error. On successful login, generate a JWT token and return it in response body. Example
{
    status: true,
    data: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    }
 }

Write a GET api /users/:userId to fetch user details. Pass the userId as path param in the url. Check that request must contain x-auth-token header. If absent, return a suitable error. If present, check that the token is valid.
Write a PUT api /users/:userId to update user details. Pass the userId as path param in the url and update the attributes received in the request body. Check that request must contain x-auth-token header. If absent, return a suitable error.
Write a DELETE api /users/:userId that takes the userId in the path params and marks the isDeleted attribute for a user as true. Check that request must contain x-auth-token header. If absent, return a suitable error.
Once, all the apis are working fine, move the authentication related code in a middleware called auth.js
Add this middleware at route level in the routes where applicable.