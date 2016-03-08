import React, {Component, PropTypes} from 'react'


export default class FileItem extends Component {

  render(){
    const file_name =  this.props.file_name;
    const file_size =  this.props.file_size;
    const file_ext = this.props.file_ext;
    const percent = this.props.percent;
    const style = {
      width:percent+"%"
    }
    const statusClass = percent < 100 ? "status pending" : "status done"
    //Math.floor(Math.random() * 100) + 10
    return (
      <div className="fileitem">
        <div>
        </div>
            <div className="title">
              <span className="myLabel">File Name:</span><span>{file_name}</span>
              <span className="myLabel">File Size:</span><span>{file_size+"kb"}</span>
            </div>
            <div className="title">
              <span className="myLabel">File Ext:</span><span>{file_ext}</span>
              <span className="myLabel">Status:</span><span className={statusClass}>{percent < 100 ? "upload pending" : "uploaded"}</span>
            </div>
            <div>
              <span className="progress" style={style}>
              </span>
            </div>
      </div>
    )
  }
}


FileItem.propTypes = {
  file_name: PropTypes.string.isRequired,
  file_size: PropTypes.number.isRequired,
  file_ext: PropTypes.string.isRequired,
  percent: PropTypes.number
}
