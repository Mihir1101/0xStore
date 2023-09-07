import React from "react";
import { useState } from "react";
import Navbar from "../component/Navbar";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { Contact_Address } from "../constant/contractAddress";
import IsSeller from "../component/IsSeller";
import BuyProduct from "../component/BuyProduct";
import ManageProduct from "../component/ManageProduct";
import GetOrders from "../component/GetOrders";
import "../styles/Home.css";


export default function Home() {
  let productCount = 0;
  const address = useAddress();
  const { contract } = useContract(Contact_Address)
  const {
    data: allProducts
  } = useContractRead(
    contract,
    "allProducts",
  );
  try {
    productCount = allProducts.length;
  } catch (error) {
    console.log(error)
  }
  const [openBuyForms, setOpenBuyForms] = useState({});
  const handleBuyButtonClick = (productId) => {
    setOpenBuyForms((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
  };

  const handleBuyFormClose = (productId) => {
    setOpenBuyForms((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  };

  let userStatus = false;
  const { data: user } = useContractRead(
    contract,
    "getUsers"
  );

  try {
    for (let i = 0; i < user.length; i++) {
      if (user[i].userAddress === address && user[i].status === 1) {
        userStatus = true;
        break;
      } else {
        userStatus = false;
      }
    }
  } catch (error) {
    console.log(error)
  }

  const [manageProduct, setManageProduct] = useState(false);
  const [getOrders, setGetOrders] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="user-options">
        {
          userStatus ? (
            <div>
              <button onClick={() => { setManageProduct(false); setGetOrders(false); }}>Home</button>
              <button onClick={() => { setManageProduct(true) }}>Manage Listings</button>
              <button onClick={() => { setGetOrders(true) }}>Current Orders</button>
              {
                manageProduct && (
                  <ManageProduct />
                )
              }
              {
              getOrders && (
                <GetOrders />
              )
              }
            </div>

          ) : (
            <div>
              <button>My Orders</button>
            </div>
          )
        }
      </div>
      {
        productCount > 0 ? (
          <div className="card-container">
            {allProducts.map((product) => (
              <div className="card" key={product.id}>
                <div>
                  <img src={product.imageUrl} width="250px" />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>{product.price.toString() / 1e3} ETH</p>
                </div>
                {
                  !openBuyForms[product.id] ? (
                    <button onClick={() => handleBuyButtonClick(product.id)} className="buy-btn-home">
                      Buy Product
                    </button>
                  ) : (
                    <div className="buyer-Details">
                      <BuyProduct productId={product.id.toNumber()} />
                      <button
                        className="close-btn"
                        onClick={() => handleBuyFormClose(product.id)}
                      >
                        Close
                      </button>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        ) : (
          <h3>No Products</h3>
        )
      }
      <IsSeller />
    </div>
  );
}