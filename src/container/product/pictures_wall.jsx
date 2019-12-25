import React,{Component} from 'react'
import {reqDeletePicture} from '../../api'
import { Upload, Icon, Modal, message } from 'antd';

//将图片转换为base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, //控制是否展示预览窗
    previewImage: '',//预览谁，url，base64
    fileList: [],
  };

	//关闭预览的回调
  handleCancel = () => this.setState({ previewVisible: false });

	//点击预览的回调
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

	//当上传图片上时，图片的状态会发生几次变化：
  handleChange = async({file,fileList}) =>{
		if(file.status === 'done'){
			fileList[fileList.length-1].name = file.response.data.name
		}
		if(file.status === 'removed'){
			let result = await reqDeletePicture(file.name)
			const {status,msg} = result
			if(status === 0) message.success('图片删除成功')
			else  message.warning(msg)
		}
		this.setState({fileList});
	}

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
					action="http://localhost:3000/manage/img/upload"
					method="POST"
					name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}