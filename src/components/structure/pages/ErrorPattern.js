const ErrorPattern = ({message}) => {
    return (
        <div className="container">
            <header className="jumbotron text-center">
                <h3>
                    {message != null ? message : "Page not found"}
                </h3>
            </header>
        </div>
    );
};
export default ErrorPattern;
