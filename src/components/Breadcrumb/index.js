import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <span key={index} className={`breadcrumb-item${index === items.length - 1 ? ' active' : ''}`}>
            {index === items.length - 1 ? (
              <span>{item.label} </span>
            ) : (
              <Link to={item.link}>{item.label}</Link>
            )}
          </span>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
