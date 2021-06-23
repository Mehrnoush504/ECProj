import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import QuestionForms from "./questionForms";
import axios from "axios";

import "./createExam.css";

class CreateExam extends Component {
  state = {
    data: {
      examTitle: "",
      date: "",
      stime: "",
      etime: "",
      className: "",
      searchId: "",
    },
    questions: [],
    errors: {},
  };

  schema = {
    examTitle: Joi.string().required().label("exam title"),
    date: Joi.date().raw().required().label("date"),
    stime: Joi.string().required().label("start time"),
    etime: Joi.string().required().label("end time"),
    className: Joi.string().required().label("class name"),
    searchId: Joi.string().required().label("search Id"),
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

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //Call the server
    this.doSubmit();
  };

  doSubmit = async () => {
    //call the server
    const reverseData = this.state.questions.reverse().map((q, i) => {
      return q.choices.reverse();
    });
    console.log("reverse", reverseData);
    console.log("Submitted");
    console.log("calling server...");
    const min = 97;
    const max = 122;
    const size = Math.random() / 30;
    let eId = "";
    for (let i = 0; i < size; i++) {
      const rand = (min + Math.random() * (max - min)) / 32;
      eId = eId + rand + "a";
    }

    console.log(eId);
    let obj = {
      examId: eId,
      examSearchId: "ssearchlll",
      examName: this.state.data.examName,
      isPublic: true,
      isFinished: false,
      questionNum: 2,
      startTime: this.state.data.stime,
      endTime: this.state.data.etime,
      questions: this.state.questions,
    };
    const { data } = await axios.put(
      "https://run.mocky.io/v3/1efb72d8-0bcc-4b1c-af64-94d2170516e4",
      obj
    );
    console.log(obj);
    console.log("submitted");
    this.props.history.replace("/my-exams");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <div className="container main_exam">
          <form onSubmit={this.handleSubmit}>
            <div>
              <Input
                name="examTitle"
                type="text"
                label="exam title: "
                value={data.examTitle}
                placeholder="enter exam title"
                onChange={this.handleChange}
                error={errors.examTitle}
              />
            </div>
            <br />
            <div>
              <Input
                name="date"
                type="date"
                label="date: "
                value={data.date}
                onChange={this.handleChange}
                error={errors.date}
              />
            </div>
            <br />
            <div>
              <Input
                name="stime"
                type="time"
                label="start time: "
                value={data.stime}
                onChange={this.handleChange}
                error={errors.stime}
              />
            </div>
            <br />
            <div>
              <Input
                name="etime"
                type="time"
                label="end time: "
                value={data.etime}
                onChange={this.handleChange}
                error={errors.etime}
              />
            </div>
            <br />
            <div>
              <Input
                name="className"
                type="text"
                label="class name:"
                value={data.className}
                placeholder="eg: school year 9 physics,UCLA mechanical engineering,..."
                onChange={this.handleChange}
                error={errors.className}
              />
            </div>
            <br />
            <div>
              <Input
                name="searchId"
                type="text"
                label="search Id:"
                value={data.searchId}
                onChange={this.handleChange}
                error={errors.searchId}
              />
            </div>
            <br />
            <button disabled={this.validate()}>submit</button>
          </form>
          <QuestionForms
            /*question part */
            questions={this.state.questions}
            addQuestion={this.addQuestionClick}
            removeQuestion={this.removeQuestionClick}
            qBoxChange={this.handleQuestionBoxChange}
            questionSubmit={this.handleQuestionSubmit}
            qTypeDropdown={this.handleQustionTypeDropdownChange}
            /*choice part */
            addChoice={this.addChoiceClick}
            removeChoice={this.removeChoiceClick}
            cBoxChange={this.handleChoiceBoxChange}
            choiceSubmit={this.handleChoiceSubmit}
            cTypeDropdown={this.handleChoiceTypeDropdownChange}
            /*question type dropdown */

            qselectValue={this.state.questionType}
          />
        </div>

        <div className="ad"></div>
        <footer>
          <hr />© Behdad Alagha
        </footer>
      </React.Fragment>
    );
  }

  /* question handler functions */
  addQuestionClick = () => {
    const question = {
      questionTypeId: 2,
      questionNum: -1,
      questionDescription: "",
      choices: [],
    };

    const questions = [question, ...this.state.questions];

    //updating qustion number of each question in question list
    questions.map((q, i) => {
      q.questionNum = questions.length - i - 1;
    });

    this.setState({ questions });

    console.log("add q", questions);
  };

  removeQuestionClick = (i) => {
    const questions = [...this.state.questions];

    questions.splice(i, 1);

    questions.map((q, i) => {
      q.questionNum = questions.length - i - 1;
    });

    this.setState({ questions });
    console.log("remove q", questions);
  };

  handleQuestionBoxChange = (i, value) => {
    const questions = [...this.state.questions];
    questions[i].questionDescription = value;
    this.setState({ questions });
  };

  handleQuestionSubmit = (errors) => {
    //const errors = this.validate();
    // this.setState({ errors: errors || {} });
    // if (errors) return;

    console.log("handleQuestionSubimt");
  };

  /* choice handler functions*/
  addChoiceClick = (qIndex) => {
    const questions = [...this.state.questions];
    const choice = { choiceNum: -1, choiceDescription: "", isCorrect: false };
    const choices = [choice, ...questions[qIndex].choices];

    choices.map((c, i) => {
      c.choiceNum = choices.length - i - 1;
    });
    questions[qIndex].choices = choices;

    this.setState({ questions });
    console.log(`add choice(s) to question[${qIndex}]`, questions[qIndex]);
  };

  removeChoiceClick = (i, qIndex) => {
    const questions = [...this.state.questions];
    const choices = [...questions[qIndex].choices];
    choices.splice(i, 1);

    choices.map((c, i) => {
      c.choiceNum = choices.length - i - 1;
    });

    questions[qIndex].choices = choices;
    this.setState({ questions });

    console.log("remove c", choices);
    console.log("update q", questions);
  };

  handleChoiceBoxChange = (i, qIndex, value) => {
    const questions = [...this.state.questions];
    const choices = [...questions[qIndex].choices];

    choices[i].choiceDescription = value;
    questions[qIndex].choices = choices;

    this.setState({ questions });
    console.log("val", value);
    console.log("handleChoiceBoxChange for c", choices);
    console.log("handleChoiceBoxChange for q", questions);
  };

  handleChoiceSubmit = (errors) => {
    //const errors = this.validate();
    // this.setState({ errors: errors || {} });
    // if (errors) return;

    console.log("handleQuestionSubimt");
  };

  //for dropdown
  handleQustionTypeDropdownChange = (value, index) => {
    const questions = [...this.state.questions];
    let id = 0;
    if (value === "Descriptive") id = 2;
    else id = 1;
    questions[index].questionTypeId = id;
    console.log(
      `QustionType -> questions[${index}]`,
      questions[index].questionTypeId
    );
    this.setState({ questions });
  };

  handleChoiceTypeDropdownChange = (value, cIndex, qIndex) => {
    const questions = [...this.state.questions];
    const choices = [...questions[qIndex].choices];

    let isCorrect = false;
    if (value === "Correct") isCorrect = true;
    choices[cIndex].isCorrect = isCorrect;
    questions[qIndex].choices = choices;

    console.log(`ChoiceType -> choices[${cIndex}]`, choices[cIndex].isCorrect);
    this.setState({ questions });
  };
}

export default CreateExam;
