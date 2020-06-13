import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearServiceUnavailable } from '../../redux/actions/userActions';

const ServiceUnavailable = () => {
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(clearServiceUnavailable());
  }, [dispatchAction]);

  return (
    <div className="container content">
      <h1 className="text-center m-3 p-4">
        <b>Internal Server Error</b>
      </h1>
    </div>
  );
};

export default ServiceUnavailable;
