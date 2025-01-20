import ProductImageUpload from "@/components/admin-view/image-upload";
// import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "react-toastify";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  adminProductSelector,
  deleteProduct,
  editProduct,
  fetchAllProducts
} from "@/store/admin/products-slice/productSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector(adminProductSelector);

  const dispatch = useDispatch();
  // const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl
      })
    ).then((data) => {
      if (data?.payload?.success) {
        // Close the form and reset all states
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setUploadedImageUrl("");
        setFormData(initialFormData);
        dispatch(fetchAllProducts());
        toast.success("Product added successfully!");
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    });
  }

  // function handleDelete(getCurrentProductId) {
  //   dispatch(deleteProduct(getCurrentProductId)).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchAllProducts());
  //     }
  //   });
  // }

  // function isFormValid() {
  //   return Object.keys(formData)
  //     .filter((currentKey) => currentKey !== "averageReview")
  //     .map((key) => formData[key] !== "")
  //     .every((item) => item);
  // }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, uploadedImageUrl, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null} */}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          // setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            // isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductFormElements}
              // isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
