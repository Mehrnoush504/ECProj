import React, { Component } from "react";
import ChoiceForm from "./createChoiceForm";
import "./createExam.css";

class ChoiceForms extends Component {
  state = { choices: this.props.choices };
  render() {
    return (
      <React.Fragment>
        <div
          onClick={(e) => this.props.addChoice(this.props.qIndex)}
          className="add_choice"
        >
          add
        </div>
        <ChoiceForm
          /*choice part */
          qIndex={this.props.qIndex}
          choices={this.props.choices}
          removeChoice={this.props.removeChoice}
          cBoxChange={this.props.cBoxChange}
          cTypeDropdown={this.props.cTypeDropdown}
          choiceSubmit={this.props.choiceSubmit}
        />
      </React.Fragment>
    );
  }
}

export default ChoiceForms;
