import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input2";
import "./createExam.css";

class ChoiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("constructor");
  }

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

  handleChange(i, qIndex, event) {
    const value = event.target.value;
    this.props.cBoxChange(i, qIndex, value);
  }
  handleChoiceTypeChange(i, event) {
    const value = event.target.value;
    this.props.cTypeDropdown(value, i, this.props.qIndex);
    console.log("dropdownDfault", this.state.dropdownDefault);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      this.props.ChoiceSubmit(errors);
      return;
    }
    //Call the server

    console.log("creat choice form Submitted");
  };

  createUI(dropdownDefault) {
    return this.props.choices.map((el, i) => (
      <div key={i}>
        <form className="exam_choice" onSubmit={this.handleSubmit}>
          <div className="collapse_choice">{this.props.choices.length - i}</div>
          <div
            className="remove_choice"
            onClick={() => this.props.removeChoice(i, this.props.qIndex)}
          >
            remove
          </div>

          <div>
            <label>This choice is: </label>

            <select
              value={dropdownDefault[i]}
              onChange={this.handleChoiceTypeChange.bind(this, i)}
            >
              <option>Incorrect</option>
              <option>Correct</option>
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
              <label>enter choice:</label>
              <input
                type="text"
                value={el.choiceDescription || ""}
                onChange={this.handleChange.bind(this, i, this.props.qIndex)}
              />
            </div>
          </div>
        </form>
      </div>
    ));
  }

  render() {
    const dropdownDefault = this.props.choices.map((c) => {
      if (c.isCorrect) return "Correct";
      return "Incorrect";
    });

    console.log("choice dropdown", dropdownDefault);
    return <React.Fragment>{this.createUI(dropdownDefault)}</React.Fragment>;
  }
}

export default ChoiceForm;
