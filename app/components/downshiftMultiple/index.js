import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import styles from './styles';


class DownshiftMultiple extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.placeholderText = this.props.placeholder
    this.state = {
      inputValue: '',
      selectedItem: [],
      fullItems: [],
    };
  }

  getSuggestions = (value) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    const { selectValues } = this.props;

    return inputLength === 0
      ? []
      : selectValues.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem, fullItems } = this.state;
    const { selectValues } = this.props;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
      const fullItem = R.find(R.propEq('label', item))(selectValues);
      fullItems = [...fullItems, fullItem];
    }


    const showPlaceholder = selectedItem.lenght > 1;
    this.placeholderText = showPlaceholder ? this.props.placeholder : ''
    this.props.onValueSelect(fullItems);

    this.setState({
      inputValue: '',
      selectedItem,
      fullItems,
    });
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.label}
      </MenuItem>
    );
  }

  renderInput = (inputProps) => {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  render() {
    const { id, classes } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
      <Downshift
        id={id}
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
            <div className={classes.container}>
              {this.renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  startAdornment: selectedItem.map(item => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={this.handleDelete(item)}
                    />
                  )),
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleKeyDown,
                  placeholder: this.placeholderText,
                }),
                label: this.props.label,
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {this.getSuggestions(inputValue2).map((suggestion, index) =>
                    this.renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
                      highlightedIndex,
                      selectedItem: selectedItem2,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          )}
      </Downshift>
    );
  }
}

DownshiftMultiple.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  selectValues: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  onValueSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(DownshiftMultiple);