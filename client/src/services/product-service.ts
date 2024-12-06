class ProductServiceClass {
  public formatPictureUrl = (url: string): string => {
    return url.startsWith("/") ? "/pictures" + url : url;
  };
}

const ProductService = new ProductServiceClass();

export default ProductService;
