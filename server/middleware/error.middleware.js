const errorMiddleware = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "something went wrong";

    res.status(500).json({
        success: false,
        message: err.message,
        stack: err.stack,
    })
    
}
export default errorMiddleware;