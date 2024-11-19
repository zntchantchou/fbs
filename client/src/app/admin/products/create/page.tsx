import Header from "@/app/(components)/Header";

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
        <div className="w-full max-w-2xl h-20 mb-4 border-dashed bg-blue-300 hover:bg-blue-200 cursor-pointer border-indigo-500 border-2 rounded-md text-blue-600 text-md flex items-center justify-center">
          Drop a file here or click to browse
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create
        </button>
        <button
          type="submit"
          className="ml-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
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
