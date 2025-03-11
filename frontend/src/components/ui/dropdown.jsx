import React, { Component } from "react";
import Select, { components } from "react-select";

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, child =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

export default class Dropdown extends Component {
  render() {
    return (
      <Select
        className={`basic-single ${ this.props.className }`}
        classNamePrefix="select"
        name="color"
        isClearable
        options={this.props.options}
        placeholder={this.props.placeholder}
        components={{
          ValueContainer: CustomValueContainer
        }}
        styles={{
          container: (provided, state) => ({
            ...provided,
            marginTop: 10
          }),
          valueContainer: (provided, state) => ({
            ...provided,
            overflow: "visible"
          }),
          placeholder: (provided, state) => ({
            ...provided,
            position: "absolute",
            top: state.hasValue || state.selectProps.inputValue ? -25 : "10%",
            left: state.hasValue || state.selectProps.inputValue ? -9 : 0,
            transition: "top 0.15s, font-size 0.1s",
            fontSize: (state.hasValue || state.selectProps.inputValue) && 13
          })
        }}
      />
    );
  }
}