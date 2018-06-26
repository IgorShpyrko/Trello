import React from 'react';
import './Popup.css';

class Popup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      configName: false,
      configContent: false,
      name: '',
      content: ''
    };
  };

  // Configure Content input...
  handleCangeContentInput = (e) => {
    this.setState({
      content: e.target.value
    });
  };

  handleApplyNewContent = () => {
    this.props.handleChangeDesk(this.state.name, this.state.content)
    this.handleCloseEditContent();
  };

  handleCloseEditContent = () => {
    this.setState({
      configContent: false
    })
  };

  handleEditContent = () => {
    this.setState({
      configContent: true
    })
  };

  // Configure Name input...
  handleCangeNameInput = (e) => {
    this.setState({
      name: e.target.value
    });
  };

  handleApplyNewName = () => {
    this.props.handleChangeDesk(this.state.name, this.state.content)
    this.handleCloseEditName();
  };

  handleCloseEditName = () => {
    this.setState({
      configName: false
    })
  };

  handleEditName = () => {
    this.setState({
      configName: true
    })
  };
  handleClosePopup = (e) => {
    if(e.keyCode === 27) {
      if(!this.state.configName && !this.state.configContent){
        this.props.onClosePopup()
      }
    }
    document.body.removeEventListener('keydown', this.handleClosePopup)
  }

  render(){

    let arr = this.props.desks.filter((item) => {
      return Number(item.id) === Number(this.props.popupTarget.id)
    });

    document.body.addEventListener('keydown', this.handleClosePopup)
       
    return(
      <div className='popup-wrapper' onClick={this.props.onClosePopup}>
        
        <div className='popup'
       
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <div className='close-icon' onClick={this.props.onClosePopup}>&times;</div>
          <h3 className='popup-header'>Desk {arr[0].name}</h3>
          <div className='config-desk'>
            <div className='config-name'>
            {this.state.configName ? null :
              <React.Fragment>
                <span>name: {arr[0].name}</span>
                <button className='config-btn' onClick={this.handleEditName}>
                    <span>configure name</span>
                </button>
              </React.Fragment>}
              {this.state.configName ? 
                <React.Fragment>
                  <input 
                    autoFocus
                    type='text' 
                    onChange={this.handleCangeNameInput}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      e.keyCode === 27 && this.handleCloseEditName()
                      e.keyCode === 13 && this.handleApplyNewName()
                    }}/>
                  <button className='config-btn' onClick={this.handleApplyNewName}> Apply </button>
                  <button className='config-btn' onClick={this.handleCloseEditName}> Cancel </button>
                </React.Fragment> : null}
            </div>
            <div className='config-content'>
              {this.state.configContent ? null :
                <React.Fragment>
                  <span>content: {arr[0].content.map(item => <div key={item}>{item}</div>)}</span>
                  <button 
                    className='config-btn'
                    onClick={this.handleEditContent}
                    >
                      <span>configure content</span>
                  </button>
                </React.Fragment>}
              {this.state.configContent ? 
                <React.Fragment>
                  <input 
                    autoFocus
                    type='text' 
                    onChange={this.handleCangeContentInput}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      e.keyCode === 27 && this.handleCloseEditContent()
                      e.keyCode === 13 && this.handleApplyNewContent()
                    }}/>
                  <button className='config-btn' onClick={this.handleApplyNewContent}> Apply </button>
                  <button 
                    className='config-btn' 
                    onClick={this.handleCloseEditContent}
                    > 
                    Cancel 
                  </button>
                </React.Fragment> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup;