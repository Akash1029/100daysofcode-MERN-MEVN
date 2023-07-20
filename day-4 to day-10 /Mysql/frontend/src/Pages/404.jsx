import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({hideLoader}) => {
    useEffect(() => {
        hideLoader(true);
    }, [])
    
        return  <div>
                    <div style={{textAlign:"center"}}>
                        <h4>Page not found</h4>
                    <Link to="/">Go to Home </Link>
                    </div>
                </div>;
};

export default NotFoundPage;