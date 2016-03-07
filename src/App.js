import React, { Component } from 'react';
import DropZone from 'react-dropzone'
import FileItem from './fileItem.js'
require('./index.scss')
export default class App extends Component {

  onDrop = (files) => {
    console.log(files)
  }
  render() {
    return (
      <div className="container-fluid">
         <div className="row">
               <div className="col-md-4">
                   <div className="wall">
                     <header> Files in Progress</header>
                           <ul>
                         <li>
        <FileItem />
                         </li>
                           </ul>
                   </div>
               </div>
               <div className="col-md-4">
                     <DropZone className="dropBox">
                       Drag & Drop Files Here
                     </DropZone>
               </div>
               <div className="col-md-4">
                  <header> Files Uploaded</header>
               </div>
         </div>
      </div>
    );
  }
}
