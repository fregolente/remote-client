import React from 'react';
import Radium from 'radium';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = theme => ({
  chipContainer: {
    backgroundColor: 'transparent',
    display: 'inline-block',
    marginBottom: 10
  },
  chip: {
    marginTop: 10,
    marginRight: 5
  },
  paper: {
    maxHeight: '150px',
    overflowY: 'auto'
  }
});

import * as userStyles from './styles';

const renderInput = inputProps => {
  const { InputProps, classes, availableItems, label, readOnly, selectedItem } = inputProps;

  const allItemSelected = availableItems.length === selectedItem.length;

  if (!readOnly) {
    return (
      <form>
        <TextField
          fullWidth
          label={
            allItemSelected ? 'All selected' : label
          }
          disabled={allItemSelected || readOnly}
          InputProps={{
            classes: {
              input: classes.input
            },
            ...InputProps
          }}
        />
      </form>
    );
  }
};


const renderChipList = inputProps => {
  const { classes, selectedItem, readOnly, onRemoveItem } = inputProps;

  return (
    <div className={classes.chipContainer}>
      {selectedItem.length > 0 &&
        selectedItem.map(item => {
          let deleteProps = {};
          if (!readOnly) {
            deleteProps = {
              deleteIcon: < CancelIcon />,
              onDelete: () => onRemoveItem(item),
              onClick: () => onRemoveItem(item),
            };
          }
          return (<Chip
            key={item}
            className={classes.chip}
            label={item}
            {...deleteProps}
          />)
        })}
    </div>
  );
};

const renderSuggestion = params => {
  const { item, itemProps, selectedItem } = params;
  const isSelected = selectedItem.indexOf(item.label) > -1;

  if (!isSelected) {
    return (
      <MenuItem
        {...itemProps}
        key={item.id}
        component='div'>
        {item.label}
      </MenuItem>
    );
  }
};

const getSuggestions = (inputValue, itemList) => {
  return itemList.filter(item => item.label.toLowerCase().includes(inputValue.toLowerCase()));
};

const MultiChipSelect = (props) => {
  const { id, classes, availableItems, onValueSelect, onRemoveItem, label, readOnly, ...rest } = props;

  return (
    <Downshift
      {...rest}>
      {({
        getInputProps,
        getItemProps,
        inputValue,
        selectedItem,
        highlightedIndex,
        toggleMenu,
        isOpen
      }) => (
          <div id="inner-downshift-content">
            {renderChipList({
              classes,
              onRemoveItem,
              selectedItem,
              readOnly
            })}

            {renderInput({
              classes,
              selectedItem,
              availableItems,
              label,
              readOnly,
              InputProps: {
                ...getInputProps({
                  onClick: () => !readOnly && toggleMenu(),
                  onBlur: (e) => e.preventDefault(),
                })
              }
            })}

            {isOpen && (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue, availableItems).map((item, index) =>
                  renderSuggestion({
                    item,
                    index,
                    itemProps: getItemProps({
                      item: item.label
                    }),
                    highlightedIndex,
                    selectedItem
                  })
                )}
              </Paper>
            )}
          </div>
        )}
    </Downshift>
  );
}

export default withStyles(styles)(Radium(MultiChipSelect));
