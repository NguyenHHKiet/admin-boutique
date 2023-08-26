import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import useAxios from "../../hooks/useAxios";

function FormExample({ productId }) {
    const [validated, setValidated] = useState(false);
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const navigate = useNavigate();

    const { sendRequest, isLoading } = useAxios();
    const isURL = () => {
        return productId
            ? `/admin/edit-product/${productId}`
            : "/admin/add-product";
    };

    useEffect(() => {
        if (productId) {
            sendRequest(
                { url: "/admin/edit-product/" + productId },
                (result) => {
                    setName(result.name);
                    setCategory(result.category);
                    setPrice(result.price);
                    setShortDescription(result.short_desc);
                    setLongDescription(result.long_desc);
                }
            );
        }
    }, [sendRequest, productId]);

    function uploadPhotos(e) {
        setImage(e.target.files);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            const formData = new FormData();
            for (const key of Object.keys(image)) {
                formData.append("uploadedImages", image[key]);
            }

            formData.append("name", name);
            formData.append("category", category);
            formData.append("price", price);
            formData.append("shortDescription", shortDescription);
            formData.append("longDescription", longDescription);

            sendRequest(
                {
                    url: isURL(),
                    body: formData,
                    method: productId ? "put" : "post",
                    headers: productId && {
                        headers: {
                            // application/json have forbidden upload file
                            "Content-Type": "application/json",
                        },
                    },
                },
                (result) => {
                    if (result) {
                        if (productId) navigate("/list-products");
                        setName("");
                        setCategory("");
                        setPrice("");
                        setShortDescription("");
                        setLongDescription("");
                    }
                }
            );
        }

        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
                <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Product Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        readOnly={isLoading && productId}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="category"
                        placeholder="Enter Category"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        readOnly={isLoading && productId}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="price"
                        placeholder="Enter Price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        readOnly={isLoading && productId}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Short Description</Form.Label>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            aria-label="With textarea"
                            placeholder="Enter Short Description"
                            required
                            name="shortDescription"
                            rows={3}
                            onChange={(e) =>
                                setShortDescription(e.target.value)
                            }
                            value={shortDescription}
                            readOnly={isLoading && productId}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Long Description</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            as="textarea"
                            aria-label="With textarea"
                            placeholder="Enter Long Description"
                            required
                            name="longDescription"
                            rows={5}
                            onChange={(e) => setLongDescription(e.target.value)}
                            value={longDescription}
                            readOnly={isLoading && productId}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formFile" className="my-2 pb-1">
                    <Form.Label>Upload image (5 images)</Form.Label>
                    <Form.Control
                        type="file"
                        multiple
                        name="uploadedImages"
                        onChange={uploadPhotos}
                    />
                </Form.Group>
            </Row>
            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default FormExample;
