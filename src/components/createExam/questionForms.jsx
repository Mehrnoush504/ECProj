import React, { Component } from "react";
import QuestionForm from "./createQuestionForm";
import "./createExam.css";

class QuestionForms extends Component {
  state = { questions: this.props.questions };
  render() {
    return (
      <React.Fragment>
        <div onClick={(e) => this.props.addQuestion()} className="add_question">
          +
        </div>
        <QuestionForm
          /*question part */
          questions={this.props.questions}
          addQuestion={this.props.addQuestion}
          removeQuestion={this.props.removeQuestion}
          qBoxChange={this.props.qBoxChange}
          questionSubmit={this.props.questionSubmit}
          qTypeDropdown={this.props.qTypeDropdown}
          /*choice part */
          addChoice={this.props.addChoice}
          removeChoice={this.props.removeChoice}
          cBoxChange={this.props.cBoxChange}
          choiceSubmit={this.props.choiceSubmit}
          cTypeDropdown={this.props.cTypeDropdown}
          /*question type dropdown */

          qselectValue={this.props.qselectValue}
        />
      </React.Fragment>
    );
  }
}

export default QuestionForms;
