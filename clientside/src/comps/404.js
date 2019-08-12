import React from 'react';


function NoMatch({ location }) {
    return (
      <div className="nomatch">
        <h3>
          404  <code> {location.pathname} Not Found</code>
        </h3>
      </div>
    );
  }

export default NoMatch;
