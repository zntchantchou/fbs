import Header from "@/app/(components)/Header";
import Uploader from "@/app/(components)/Uploader";

function CreateProduct() {
  const labelClassnames = "block my-1 text-sm font-medium text-gray-700";
  const inputClassnames =
    "block w-full max-w-2xl border-gray-400 border-2 rounded-md mb-4 mt-2 p-2";
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   const numericFields = ["price", "stockQuantity", "rating"];
  //   setFormData({
  //     ...formData,
  //     [name]: numericFields.includes(name) ? parseFloat(value) : value,
  //   });
  // };
  return (
    <div className="w-full h-full">
      {/* TITLE */}
      <Header name="Create a product" />
      {/* FORM */}
      <div className="w-full">
        {/* PRODUCT NAME */}
        <label htmlFor="productName" className={labelClassnames}>
          Product Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="name"
          // onChange={handleChange}
          // value={formData.name}
          className={inputClassnames}
        />
        <label htmlFor="productPrice" className={labelClassnames}>
          Price
        </label>
        {/* PRICE */}
        <input
          type="number"
          name="price"
          min={1}
          placeholder="Price"
          // onChange={handleChange}
          // value={formData.price}
          className={inputClassnames}
        />
        {/* STOCK QUANTITY */}
        <label htmlFor="stockQuantity" className={labelClassnames}>
          Stock quantity
        </label>
        <input
          type="number"
          name="stockQuantity"
          placeholder="Stock Quantity"
          min={0}
          // onChange={handleChange}
          // value={formData.stockQuantity}
          className={inputClassnames}
        />
        {/* PICTURES */}
        <label htmlFor="Pictures" className={labelClassnames}>
          Pictures
        </label>

        {/* DROP ZONE */}
        <Uploader />
        <button
          type="submit"
          className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-900"
        >
          Create
        </button>
        <button
          type="submit"
          className="ml-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700"
          // onClick={onClose}
        >
          Cancel
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default CreateProduct;
