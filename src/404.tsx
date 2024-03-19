import {Link} from 'react-router-dom';

const NotFoundPage = () =>{
return (
<div className="container-fluid">
    <div className="text-center">
        <div className="error mx-auto" data-text="404">404</div>
        <p className="lead text-gray-800 mb-5">Page Not Found</p>
        <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
        <Link to='/'>&lt;&lt; Back to product list</Link>
    </div>
</div>
)
};

export default NotFoundPage;
