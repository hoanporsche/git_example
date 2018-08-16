import React from 'react';
import { Route } from 'react-router-dom';
import RedirectQueryParams from '../../util/RedirectQueryParams';

const SearchRedirect = () => (
  <Route render={({ history }) => (
    <div className="col-md-5 header-search">
      <input type="text" className="inline-block w-small bm-remove" 
            placeholder="Bạn cần tìm gì?" maxLength="255" autoComplete="off" defaultValue="" 
            onKeyPress={(event) => {
              if (event.key==='Enter') {
                history.push(RedirectQueryParams('',[
                  {
                    name: 'name',
                    value: event.target.value
                  }
                ]))
              }
            }}
      />
    </div>
  )}
  />
)

export default SearchRedirect;