import React from 'react';
import Skeleton from '@mui/material/Skeleton'; 

import './SkeletonCard.css';

const SkeletonCard = () => {
    return (
        <div className="Item mb-2" >
                  <Skeleton variant="rectangular" height={300} />
                  <div className="card-body">
                    <Skeleton variant="text" width="80%" height={30} />
                    <Skeleton variant="text" width="60%" />
                    <div className="property-info d-flex justify-content-around mt-2 mb-2">
                      <Skeleton variant="rectangular" width={50} height={50} />
                      <Skeleton variant="rectangular" width={50} height={50} />
                      <Skeleton variant="rectangular" width={50} height={50} />
                      <Skeleton variant="rectangular" width={50} height={50} />
                    </div>
                  </div>
                </div>
    );
};

export default SkeletonCard;