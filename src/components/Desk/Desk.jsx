import React from 'react';
import './Desk.css';
import uuidv4 from 'uuid/v4';

class Desk extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      inputValue: ''
    }
  };

  handleBlur = (e) => {

    if(e.relatedTarget && e.relatedTarget.className === 'save'){
      return null
    } else {
      if(e.target.value){
        let answer = window.confirm('save changes?');
  
        if(answer){
          this.handleSave();
        } 
      }
      this.handleCloseDialog();
    }
  }

  handleDeleteItem = (e) => {
    let data = e.target.parentNode.firstChild.data;
    
    this.props.onDeleteItem(data, this.props.id)
  };

  handleKeyDown = (e) => {
    if(e.keyCode === 27) {
      this.handleCloseDialog();
    }
    if(e.keyCode === 13) {
      this.handleSave();
    }
  };

  handleCloseDialog = () => {
    this.setState({
      open: false,
      inputValue: ''
    })
  };

  handleSave = () => {
    let content = this.props.content;
    let value = this.state.inputValue;
    if(value){
      this.props.saveContent(content, value)
    }
    this.handleCloseDialog();
  };

  handleOpenAddDialog = () => {
    this.setState({
      open: true
    })
  };

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  };

  render() {
    
    let header = +this.props.name.toString().length < 7 ? this.props.name : `${this.props.name.substr(0, 7)}...`;

    return(
      <React.Fragment>
        <div className='desk' onClick={this.props.onClick} id={this.props.id}>
        <button className='del-button' onClick={this.props.onClickDeleteDesk}>Delete Desk</button>
          <h1>{header}</h1>
          <div className='desk-content'>
            {this.props.content.map(item => (
              <div key={uuidv4()} id={uuidv4()}>
                {item}
                <button onClick={this.handleDeleteItem}>del</button>
              </div> 
            ))}
            {this.state.open ? null : <button className="add-desk-button" onClick={this.handleOpenAddDialog}>+</button>}
            {this.state.open ? 
              <div className='add-desk-item'>
                <input 
                type="text" 
                size="10" 
                autoFocus 
                onChange={this.handleChange} 
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}/>
                <button className="save" onClick={this.handleSave} >save</button>
              </div>
              : null}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Desk;