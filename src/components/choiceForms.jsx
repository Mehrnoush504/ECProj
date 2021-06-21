import React, { Component } from "react";
import ChoiceForm from "./createChoiceForm";
import "./createExam.css";

class ChoiceForms extends Component {
  state = { choices: this.props.choices };
  render() {
    return (
      <React.Fragment>
        <div onClick={this.props.addChoice} className="add_choice">
          add
        </div>
        <ChoiceForm
          /*choice part */
          choices={this.props.choices}
          removeChoice={this.props.removeChoice}
          cBoxChange={this.props.cBoxChange}
          choiceSubmit={this.props.choiceSubmit}
        />
      </React.Fragment>
    );
  }
}

export default ChoiceForms;
