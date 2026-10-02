import PageTitle from "./PageTitle.jsx";

function PageHeading(props) {
    return (
        <div className="page-heading-container">
            <PageTitle title="Explore Sticker" />
            <div className="font-primary leading-6 text-gray-600 dark:text-lighter"> {props.children} </div> 
            {/* props.children là thẻ p */}
        </div>
    );
}

export default PageHeading;