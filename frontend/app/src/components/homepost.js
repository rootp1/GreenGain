import React from 'react';
import '../signin.css'

function HomePost(props){
    return(
        <div className="card">
        <div className="card-header">
          <img
            src="images/person.png"
            alt="Profile Picture"
            className="profile-pic"
          />
          <div className="user-info">
            <h3>{props.username}</h3>
            <p>{props.uid}</p>
          </div>
        </div>
        <div className="card-content">
          <p>
            {props.desc}
          </p>
        </div>
        <div className="card-images">
          <img src="images/MangoTree.jpg" alt="Mango Tree 1" className="card-image" />
          <img src="images/MangoTree.jpg" alt="Mango Tree 2" className="card-image" />
        </div>
      </div>
      
    );
}

export default HomePost