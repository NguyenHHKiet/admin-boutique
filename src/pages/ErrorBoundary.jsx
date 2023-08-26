import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    // Uncaught ReferenceError: path is not defined
    return (
        <div>
            <h1 className="not-found">
                {isRouteErrorResponse(error) ? (
                    <>
                        {error.status} {error.statusText}
                    </>
                ) : (
                    <>{error.message || error}</>
                )}
            </h1>
        </div>
    );
}
