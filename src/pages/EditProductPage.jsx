import { useParams } from "react-router-dom";
import FormProduct from "../components/form/FormProduct";

const EditProductPage = () => {
    const { productId } = useParams();

    const styles = {
        height: "100vh",
        width: "100%",
        overflow: "auto",
    };

    return (
        <div style={styles}>
            <div className="mx-auto my-5 pt-5" style={{ maxWidth: "35rem" }}>
                <FormProduct productId={productId} />
            </div>
        </div>
    );
};

export default EditProductPage;
