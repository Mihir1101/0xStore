import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Contact_Address } from "../constant/contractAddress";

export default function ManageProduct() {
    let listedProductCount = 0;
    const { contract } = useContract(Contact_Address);
    const { data: listedProducts } = useContractRead(
        contract,
        "listedProduct",
    );
    try {
        listedProductCount = listedProducts.length;
    }
    catch (error) {
        console.log(error);
    }
    console.log(listedProducts);
    return (
        <div className="listed-product">
            {
                listedProductCount > 0 ? (
                    <div className="card-container">
                        {
                            listedProducts.map((product) => (
                                <div key={product.id} className="card">
                                    <img src={product.imageUrl} width="250px" />
                                    <h1>{product.name}</h1>
                                    <p>{product.description}</p>
                                    <h3>{product.price.toString() / 1e3} ETH</h3>
                                </div>
                            ))

                        }
                    </div>
                ) : (
                    <h1>No Products Listed</h1>
                )
            }
        </div>
    )
}