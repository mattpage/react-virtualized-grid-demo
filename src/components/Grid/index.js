import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, MultiGrid } from 'react-virtualized';
import styled from 'styled-components';
import classnames from 'classnames';

const gridHeaderColor = '#e0e0e0';
const gridBorderColor = '#cbcbcb';
const gridStripeColor = '#f2f2f2';

export const GridContainer = styled.div`
  border: solid 1px ${gridBorderColor};

  .ReactVirtualized__Grid {
    outline-style: none;
  }

  .cell, .column {
    padding: 4px;
    overflow: hidden;
    text-align: left;
    white-space: nowrap;
  }

  .cell {
    border-bottom: solid 1px ${gridBorderColor};
  }

  .cell.odd {
    background-color: ${gridStripeColor} !important; 
  }

  .grid-header {
    background-color: ${gridHeaderColor}; 
    border-bottom: solid 1px ${gridBorderColor};
    overflow-x: hidden !important;
  }

  .grid-body {
    .ReactVirtualized__Grid__innerScrollContainer {
      overflow: visible !important;
    }
  }

`;

class Grid extends Component {

  static createCellRenderer(columns, rows, features, gridWidth) {
    return ({ columnIndex, key, rowIndex, style }) => {
      if (rowIndex < 1){
        //this is a header cell
        const column = columns.length > 0 ? `${columns[columnIndex].label} ` : '';
        return (
          <div
            key={key}
            className={classnames('column')}
            style={style}
          >
            {column}
          </div>
        );
      }
      //this is a row cell
      const cellStyle = { ...style };
      const index = rowIndex - 1;
      const row = rows[index];
      const stripe = (index % 2 === 1) ? 'odd' : 'even';
      const cell = row.length > 0 ? `${row[columnIndex]} ` : '';
      const isLastCell = columnIndex === (columns.length - 1);
      if (isLastCell) {
        //this last cell business is all about extending the width of the last cell
        //to equal the full width of the grid body
        const left = parseInt(cellStyle.left, 10);
        const width = parseInt(cellStyle.width, 10);
        const newWidth = Math.max(gridWidth-left, width);
        if (newWidth !== width) {
          cellStyle.width = `${newWidth}px`;
        }
      }
      return (
        <div
          key={key}
          className={classnames('cell', { [stripe]: features.enableRowStriping })}
          style={cellStyle}
        >
          {cell}
        </div>
      );

    };
  }

  static propTypes = {
    columns: PropTypes.array,
    enableFixedHeader: PropTypes.bool,
    enableRowStriping: PropTypes.bool,
    rows: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number,
  };

  static defaultProps = {
    columns: [],
    enableFixedHeader: false,
    enableRowStriping: false,
    rows: [],
    height: -1,
    width: -1,
  };

  render() {
    const { columns, enableFixedHeader, enableRowStriping, height, rows, width } = this.props;
    const columnCount = columns.length;

    return (
      <AutoSizer className="auto-sizer">
        {
          (size) => {
            const h = height > 0 ? height : size.height;
            const w = width > 0 ? width : size.width;
            return (
              <GridContainer className="grid-container" style={{ height: h, width: w }}>
                <MultiGrid
                  classNameTopLeftGrid="gridtl"
                  classNameTopRightGrid="grid-header"
                  classNameBottomLeftGrid="gridbl"
                  classNameBottomRightGrid="grid-body"
                  cellRenderer={Grid.createCellRenderer(columns, rows, { enableRowStriping }, w)}
                  columnCount={columnCount}
                  columnWidth={(col) => ('width' in columns[col.index] ? columns[col.index].width : 100)}
                  enableFixedRowScroll
                  estimatedColumnSize={100 * columnCount}
                  fixedRowCount={enableFixedHeader ? 1 : 0}
                  height={h}
                  hideTopRightGridScrollbar
                  overscanRowCount={50}
                  rowCount={rows.length + 1}
                  rowHeight={28}
                  width={w}
                />
              </GridContainer>
            );
          }
        }
      </AutoSizer>
    );
  }
}

export default Grid;
