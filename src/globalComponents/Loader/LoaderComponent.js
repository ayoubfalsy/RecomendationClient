import React from 'react';
// import './LoaderCSS.css';

const LoaderComponent = (WrappedComponent) => {

  return function WithLoadingComponent({isLoading, ...props}) {
    if (!isLoading) return (<WrappedComponent {...props} />);
    return (<div className="loader modal-backdrop fade show bg-white loader-bg-position"><WrappedComponent {...props} />
    </div>);
  }
};
export default LoaderComponent;
