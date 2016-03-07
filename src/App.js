import React, { Component } from 'react';
import DropZone from 'react-dropzone'
import FileItem from './fileItem.js'
require('./index.scss')
export default class App extends Component {
  constructor(){
    super()
    this.state = {files: []}
  }
  onDrop = (files) => {
    let newFiles = files.map(file => {
      const file_obj = {
        percent:0,
        file
      }
      return file_obj
    })

    this.setState({files:this.state.files.concat(newFiles)})
  }

  render() {
    const files = this.state.files;
    const filesInProgress = files.map(content =>  content.percent < 100 ? content : "")
    return (
      <div className="container-fluid">
         <div className="row">
               <div className="col-md-4">
                   <div className="wall">
                     <header> Files in Progress</header>
                           <ul className="list-unstyled">
                            {
                              filesInProgress.map(content => {
                                return <li> <FileItem file_name={content.file.name}
                                                      file_size={content.file.size}
                                                      file_ext={content.file.type}
                                                      percent={content.percent}/></li>
                              })
                            }
                           </ul>
                   </div>
               </div>
               <div className="col-md-4">
                     <DropZone className="dropBox" onDrop={this.onDrop}>
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
