import React from 'react';
import './item.scss';

export default function ({ title, price, thumbnail }) {
    return (
        <div className="card my-2 item-ctn">
            <img src={thumbnail} className="d-block item-img" alt="default" />
            <div className="card-body">
                <h4 className="title-card">{title}</h4>
                <p className="title-card subtitle-card">$ {price}</p>
            </div>
        </div>
    );
}