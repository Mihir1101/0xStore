// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract ECommerce {
    // address private immutable owner;

    Product[] public products;
    user[] public users;
    customerDetails[] private customersOrders;

    error notEnoughtFunds();
    error trasactionFailed();

    struct Product {
        uint256 id;
        address owner;
        string name;
        string description;
        uint256 price;
        string imageUrl;
        productStatus status;
    }

    struct customerDetails {
        address customerAddress;
        address sellerAddress;
        uint256 productId;
        string name;
        string email;
        string phone;
        string homeAddress;
        string pincode;
    }

    struct user {
        address userAddress;
        profileStatus status;
    }

    enum profileStatus {
        buyer,
        buyerAndSeller
    }

    enum productStatus {
        sold,
        available
    }

    constructor() {
        // owner = msg.sender;
    }

    function addUser() public {
        user memory newUser = user(msg.sender, profileStatus.buyer);
        users.push(newUser);
    }

    function becomeSellerFromUser() public {
        for (uint i; i < users.length; i++) {
            if (users[i].userAddress == msg.sender) {
                users[i].status = profileStatus.buyerAndSeller;
            }
        }
    }

    function becomeSeller() public {
        user memory newUser = user(msg.sender, profileStatus.buyerAndSeller);
        users.push(newUser);
    }

    function addProduct(
        string memory _name,
        string memory _description,
        uint256 _price,
        string memory _imageUrl
    ) public {
        for (uint256 i; i < users.length; i++) {
            if (
                users[i].userAddress == msg.sender &&
                users[i].status == profileStatus.buyerAndSeller
            ) {
                Product memory newProduct = Product(
                    products.length,
                    msg.sender,
                    _name,
                    _description,
                    _price,
                    _imageUrl,
                    productStatus.available
                );
                products.push(newProduct);
            }
        }
    }

    function listedProduct() public view returns (Product[] memory) {
    uint256 count = 0;
    for (uint256 i = 0; i < products.length; i++) {
        if (products[i].owner == msg.sender) {
            count++;
        }
    }
    Product[] memory listedProducts = new Product[](count);
    uint256 index = 0;
    for (uint256 i = 0; i < products.length; i++) {
        if (products[i].owner == msg.sender) {
            listedProducts[index] = products[i];
            index++;
        }
    }
    return listedProducts;
}


    function allProducts() public view returns (Product[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < products.length; i++) {
            if (products[i].status == productStatus.available) {
                count++;
            }
        }
        Product[] memory availableProducts = new Product[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < products.length; i++) {
            if (products[i].status == productStatus.available) {
                availableProducts[index] = products[i];
                index++;
            }
        }
        return availableProducts;
    }

    function getStatus() public view returns (bool) {
        bool status = false;
        for (uint256 i; i < users.length; i++) {
            if (
                users[i].userAddress == msg.sender &&
                users[i].status == profileStatus.buyerAndSeller
            ) {
                status = true;
                break;
            }
        }
        return status;
    }

    function checkIfUserExist() public view returns (bool) {
        bool exist = false;
        for (uint256 i; i < users.length; i++) {
            if (users[i].userAddress == msg.sender) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    function getUsers() public view returns (user[] memory) {
        return users;
    }

    function buyProduct(
    address payable _to,
    uint256 _productId,
    string memory _name,
    string memory _email,
    string memory _phone,
    string memory _homeAddress,
    string memory _pincode
) public payable {

    (bool callSuccess, ) = _to.call{value: msg.value}("");
    require(callSuccess, "Transaction failed");

    customerDetails memory newCustomer = customerDetails(
        msg.sender,
        _to,
        _productId,
        _name,
        _email,
        _phone,
        _homeAddress,
        _pincode
    );

    customersOrders.push(newCustomer);
}


    function getOrders() public view returns (customerDetails[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < customersOrders.length; i++) {
            if (customersOrders[i].sellerAddress == msg.sender) {
                count++;
            }
        }
        customerDetails[] memory orders = new customerDetails[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < customersOrders.length; i++) {
            if (customersOrders[i].sellerAddress == msg.sender) {
                orders[index] = customersOrders[i];
                index++;
            }
        }
        return orders;
    }
    function getProductById(uint256 _id) public view returns (Product memory) {
        return products[_id];
    }

    function deleteProductFromListings(uint256 _id) public view {
        Product[] memory listedProducts = listedProduct();
        for (uint256 i = 0; i < listedProducts.length; i++) {
            if (listedProducts[i].id == _id) {
                listedProducts[i].status = productStatus.sold;
            }
        }
    }

    function getMyOrders() public view returns (customerDetails[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < customersOrders.length; i++) {
            if (customersOrders[i].customerAddress == msg.sender) {
                count++;
            }
        }
        customerDetails[] memory orders = new customerDetails[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < customersOrders.length; i++) {
            if (customersOrders[i].customerAddress == msg.sender) {
                orders[index] = customersOrders[i];
                index++;
            }
        }
        return orders;
    }
}
//price
//if else in add user / seller
