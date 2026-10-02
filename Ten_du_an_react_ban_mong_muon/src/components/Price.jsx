function Price({currency, price}) {
    return (
        <>
            {currency} 
           <span>
                {price.toFixed(2)}
            </span>
        </>
    );
}

export default Price;