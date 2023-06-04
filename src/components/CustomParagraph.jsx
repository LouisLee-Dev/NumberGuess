const CustomParagraph = ({children, ...rest}) => (
    <p className="fontSize17px" {...rest}>{children}</p>
);

export default CustomParagraph;