import FormProduct from "../components/form/FormProduct";

const ProductPage = () => {
    const styles = {
        height: "100vh",
        width: "100%",
        overflow: "auto",
    };
    return (
        <div style={styles}>
            <div className="mx-auto my-5 pt-5" style={{ maxWidth: "40rem"}}>
                <FormProduct />
            </div>
        </div>
    );
};

export default ProductPage;
