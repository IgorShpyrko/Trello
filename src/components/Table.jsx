import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Desk from './Desk/Desk';
import Popup from './Popup/Popup';
import './Table.css'

class Table extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      popupActive: false,
      inputValue: '',
      inputContent: '',
      quantity: localStorage.getItem('quantity') || 4,
      desks: JSON.parse(localStorage.getItem('desks')) || [
        {
          id: 0,
          name: 'first',
          content: ['first content']
        },
        {
          id: 1,
          name: 'second',
          content: ['second content']
        },
        {
          id: 2,
          name: 'third',
          content: ['third content']
        },
        {
          id: 3,
          name: 'forth',
          content: ['forth content']
        },
      ]
    };
  };

  handleChangeDesk = (name, content) => {
    let newDesks = [];
    this.state.desks.filter((item) => {

      if(Number(item.id) === Number(this.state.popupTarget.id) ){
        let newItem = {
          id: item.id,
          name: name ? name : item.name,
          content: content? content : item.content
        };
        newDesks.push(newItem);

      } else {
        newDesks.push(item);
      }
      return null
    });

    this.setState({
      desks: newDesks
    });
    localStorage.setItem('desks', JSON.stringify(newDesks));
  };

  handleDeleteItem = (value, index) => {

    let desks = this.state.desks;    

    let newDesk = desks[index]['content'].filter((item) => {
      return item !== value
    });

    desks[index]['content'] = newDesk;

    localStorage.setItem('desks', JSON.stringify(desks))

    this.setState({
       desks:desks
    })
    

  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  handleChangeInputContent = (e) => {
    e.preventDefault();
    this.setState({ inputContent: e.target.value });
  };

  handleChangeInputName = (e) => {
    e.preventDefault();
    this.setState({ inputValue: e.target.value });
  };

  handleDeleteDesk = (e) => {
    let newDesks = this.state.desks.filter((item) => {
      if(Number(item.id) === Number(e.target.parentNode.id) ){ 
        return null 
      } else { 
        return item
      }
    });
    this.setState({ desks: newDesks });
    localStorage.setItem('desks', JSON.stringify(newDesks));
  };

  handleClosePopup = (e) => {
    this.setState({
      popupActive: false
    });
  };

  handleOpenPopup = (e) => {
    if(e.target.localName === 'button') return;
    if(e.target.localName === 'input') return;

    function parent(target) {
      if(!target.id){
        let newTarget = target.parentNode;
        return parent(newTarget);
      } else {
        localStorage.setItem('popupTarget', JSON.stringify(target.id));
        return target;
      }
    }
    let target = parent(e.target)    
    this.setState({
      popupActive: true,
      popupTarget: target
    });
  };

  handleAdd = (e) => {
    if(!this.state.inputValue){
      alert('Name field is empty');
      return;
    };
    if(!this.state.inputContent){
      alert('Content field is empty');
      return;
    };
    const newDesk = {
      id: this.state.quantity,
      name: this.state.inputValue || 'default',
      content: this.state.inputContent ? [this.state.inputContent] : ['default content'],
    };
    

    this.setState((prevState) => {
      let newDesks = prevState.desks;
      newDesks.push(newDesk);
      localStorage.setItem('desks', JSON.stringify(newDesks));
      let newQuantity = prevState.quantity + 1;
      localStorage.setItem('quantity', JSON.stringify(newQuantity))
      return {
        inputValue: '',
        inputContent: '',
        desks: newDesks,
        quantity: newQuantity
      }
    });
  };

  handleSaveContent = (content, value) => {
    
    let desks = this.state.desks;

    let tmp = desks.filter(item => {
      return item['content'] === content
    });

    if(tmp[0]['content'].indexOf(value) !== -1){
      console.error('Can\'t add same element to Desk');
      return 
    } else {

      tmp[0].content.push(value);
  
      localStorage.setItem('desks', JSON.stringify(desks))
      this.setState({desks});
    }
  }

  render(){
    return(
      
      <React.Fragment>
        { this.state.popupActive ? 
          <Popup 
            onClosePopup={ this.handleClosePopup }
            popupTarget={this.state.popupTarget}
            desks={this.state.desks}
            handleChangeDesk = {this.handleChangeDesk}
            
          /> : null
        }
        <div className='form-wrapper'>
          <div className='form-header-wrapper'>
            <h2>Create new Desk</h2>
          </div>
          <form className='form' action="" onSubmit={ this.handleSubmitForm }>
            <div className='form-item'>
              <span className='form-item-span'>Name</span>
              <input className='input-form' type='text' onChange={ this.handleChangeInputName }></input>
            </div>
            <div className='form-item'>
              <span className='form-item-span'>Content</span>
              <input className='input-form' type='text' onChange={ this.handleChangeInputContent }></input>
            </div>
            <div className='add-button-wrapper'>
              <button 
                className='add-button'
                onClick={ this.handleAdd }
                >
                  Add Desk
              </button>
            </div>
            
          </form>
        </div>
        <div className='table'>
        { this.state.desks.map((item) => (
          <Desk 
            id={ item.id }
            key={ item.id }
            name={ item.name } 
            content={ item.content }
            onClick={ this.handleOpenPopup }
            onClickDeleteDesk={ this.handleDeleteDesk }
            saveContent={ this.handleSaveContent }
            onDeleteItem={ this.handleDeleteItem }
          />
        )) }
        </div>
      </React.Fragment>
    )
  }
}

export default DragDropContext(HTML5Backend)(Table);
