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

  updatePercentage = (index,percent) => {
    let files =  this.state.files;
    console.log(files)
    console.log(index)
    console.log(files[index])
    files[index].percent = percent;
    this.setState({files:files})
  }

  uploadFile = (file,index) => {
    let formData = new FormData();
        formData.append('image',file);

    let xhr = new window.XMLHttpRequest();


    xhr.upload.addEventListener("progress", (evt) => {
            if (evt.lengthComputable) {
                const new_percent = Math.round(((evt.loaded / evt.total) * 100));
                console.log(new_percent)
                this.updatePercentage(index,new_percent)
            }
        });

        xhr.addEventListener("load",(res)=>{
            const response = JSON.parse(xhr.responseText);
            console.log(response);


        })
        xhr.addEventListener("error", (res)=>{
            console.log('error')

        });

        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID c43b7ffbce9e238');
        xhr.send(formData)

  }

  componentDidUpdate(prevProps,prevState){
    const files =  this.state.files;
    for(let i = 0; i < files.length; i++){
        if(files[i].percent > 0 && files[i].percent < 100){
          // it means this file is uploading
          break;
        } else if(files[i].percent < 100){
            this.uploadFile(files[i].file,i)
            break;
        }
    }
  }
  render() {
    const files = this.state.files;
    const filesInProgress = files.map((content,index) => {
        if(content.percent < 100){
          return <li key={index}> <FileItem file_name={content.file.name}
                                     file_size={content.file.size}
                                     file_ext={content.file.type}
                                     percent={content.percent}/></li>
        }
    })

    const filesUploaded = files.map((content,index) => {
        if(content.percent == 100){
          return <li key={index}> <FileItem file_name={content.file.name}
                                     file_size={content.file.size}
                                     file_ext={content.file.type}
                                     percent={content.percent}/></li>
        }
    })

    return (
      <div className="container-fluid">
         <div className="row">
               <div className="col-md-4">
                   <div className="wall">
                     <header> Files in Progress</header>
                           <ul className="list-unstyled">
                            {
                              filesInProgress.map(content => {
                                return content
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
                  <ul className="list-unstyled">
                   {
                     filesUploaded.map(content => {
                       return content
                     })
                   }
                  </ul>
               </div>
         </div>
      </div>
    );
  }
}
