import React from 'react';


function NoMatch({ location }) {
    return (
      <div>
        <h3>
            404 <code>{location.pathname}</code> Not Found
        </h3>
      </div>
    );
  }

export default NoMatch;
