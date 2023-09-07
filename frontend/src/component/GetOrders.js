import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Contact_Address } from "../constant/contractAddress";

export default function GetOrders() {
    let orderCount = 0;
    const { contract } = useContract(Contact_Address);
    const { data: orderedProducts } = useContractRead(
        contract,
        "getOrders",
    );
    try {
        orderCount = orderedProducts.length;
    }
    catch (error) {
        console.log(error);
    }
    console.log(orderedProducts);
    return (
        <div>
            {
                orderCount > 0 ? (
                    <div className="card-container">
                        {
                            orderedProducts.map((product) => (
                                <div key={product.productid} className="card">
                                    <h3>Customer Details</h3>
                                    <p>Name:{product.name}</p>
                                    <p>Email:{product.email}</p>
                                    <p>Phone:{product.phone}</p>
                                    <p>Address:{product.address}</p>
                                    <p>Pincode:{product.pincode}</p>
                                </div>
                            ))

                        }
                    </div>
                ) : (
                    <h1>No current</h1>
                )
            }
        </div>
    )
}