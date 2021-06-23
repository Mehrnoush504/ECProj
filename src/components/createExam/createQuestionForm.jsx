import React, { Component } from "react";
import ChoiceForms from "./choiceForms";
import Joi from "joi-browser";
import Input from "../common/input2";
import "../Site.css";
/*import "./createExam.css";*/
// const options = ["Descriptive", "Multi-choice"];
// const defaultOption = options[0];

class QuestionForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { questions: this.props.questions };
  // }

  schema = {
    examTitle: Joi.string().required().label("examTitle"),
    date: Joi.date().raw().required().label("date"),
    time: Joi.string().required().label("time"),
    className: Joi.string().required().label("className"),
  };
  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; // can be username or password
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange(i, event) {
    const value = event.target.value;
    this.props.qBoxChange(i, value);
  }

  handlequestionTypeChange(i, event) {
    const value = event.target.value;
    this.props.qTypeDropdown(value, i);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      this.props.QuestionSubmit(errors);
      return;
    }
    //Call the server

    console.log("creat question form Submitted");
  };

  createUI(dropdownDefault) {
    return this.props.questions.map((el, i) => (
      <div key={i}>
        <form className="exam_question" onSubmit={this.handleSubmit}>
          <div className="collapse_question">
            {this.props.questions.length - i}
          </div>
          <div
            className="remove_question"
            onClick={() => this.props.removeQuestion(i)}
          >
            remove
          </div>

          <div>
            <label>question type: </label>
            <select
              value={dropdownDefault[i]}
              onChange={this.handlequestionTypeChange.bind(this, i)}
            >
              <option value="Descriptive">Descriptive</option>
              <option value="Multi-choice">Multi-choice</option>
            </select>
            <br />
            <div>
              {/* <Input
                name="questionDescription"
                type="text"
                label="enter question: "
                value={data.question}
                onChange={this.handleChange}
                error={errors.question}
              /> */}
              <label>enter question:</label>
              <input
                type="text"
                value={el.questionDescription || ""}
                onChange={this.handleChange.bind(this, i)}
              />
              {el.questionTypeId === 1 /*Multi-choice */ ? (
                <ChoiceForms
                  /*choice part */
                  qIndex={i}
                  choices={el.choices}
                  addChoice={this.props.addChoice}
                  removeChoice={this.props.removeChoice}
                  cBoxChange={this.props.cBoxChange}
                  choiceSubmit={this.props.choiceSubmit}
                  cTypeDropdown={this.props.cTypeDropdown}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
      </div>
    ));
  }

  render() {
    const dropdownDefault = this.props.questions.map((q) => {
      if (q.questionTypeId === 1) return "Multi-choice";
      return "Descriptive";
    });
    console.log("question dropdown", dropdownDefault);
    return <React.Fragment>{this.createUI(dropdownDefault)}</React.Fragment>;
  }
}

export default QuestionForm;
