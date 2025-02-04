import * as React from 'react';
import { GridCellValue } from '../gridCell';
import { GridCellClassNamePropType } from '../gridCellClass';
import { GridColumnHeaderClassNamePropType } from '../gridColumnHeaderClass';
import { GridFilterOperator } from '../gridFilterOperator';
import {
  GridCellParams,
  GridGroupingValueGetterParams,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
  GridValueSetterParams,
  GridPreProcessEditCellProps,
} from '../params/gridCellParams';
import { GridColumnHeaderParams } from '../params/gridColumnHeaderParams';
import { GridComparatorFn, GridSortDirection } from '../gridSortModel';
import { GridColType, GridNativeColTypes } from './gridColType';
import { GridRowParams } from '../params/gridRowParams';
import { GridValueOptionsParams } from '../params/gridValueOptionsParams';
import { GridActionsCellItemProps } from '../../components/cell/GridActionsCellItem';
import { GridRowModel } from '../gridRows';
import { GridEditCellProps } from '../gridEditRowModel';
import type { GridApiPro } from '../api/gridApiPro';
import type { GridApiCommon } from '../api/gridApiCommon';
import type { GridApiCommunity } from '../api/gridApiCommunity';

/**
 * Alignment used in position elements in Cells.
 */
export type GridAlignment = 'left' | 'right' | 'center';

type ValueOptions = string | number | { value: any; label: string };

/**
 * Value that can be used as a key for grouping rows
 */
export type GridKeyValue = string | number | boolean;

/**
 * Column Definition interface.
 */
export interface GridColDef<Api extends GridApiCommon = GridApiCommunity> {
  /**
   * The column identifier. It's used to map with [[GridRowModel]] values.
   */
  field: string;
  /**
   * The title of the column rendered in the column header cell.
   */
  headerName?: string;
  /**
   * The description of the column rendered as tooltip if the column header name is not fully displayed.
   */
  description?: string;
  /**
   * Set the width of the column.
   * @default 100
   */
  width?: number;
  /**
   * If set, it indicates that a column has fluid width. Range [0, ∞).
   */
  flex?: number;
  /**
   * Sets the minimum width of a column.
   * @default 50
   */
  minWidth?: number;
  /**
   * Sets the maximum width of a column.
   * @default Infinity
   */
  maxWidth?: number;
  /**
   * If `true`, hide the column.
   * @deprecated Use the `columnVisibility` prop instead.
   * @default false
   */
  hide?: boolean;
  /**
   * If `false`, removes the buttons for hiding this column.
   * @default true
   */
  hideable?: boolean;
  /**
   * If `true`, the column is sortable.
   * @default true
   */
  sortable?: boolean;
  /**
   * The order of the sorting sequence.
   */
  sortingOrder?: GridSortDirection[];
  /**
   * If `true`, the column is resizable.
   * @default true
   */
  resizable?: boolean;
  /**
   * If `true`, the cells of the column are editable.
   * @default false
   */
  editable?: boolean;
  /**
   * If `true`, the rows can be grouped based on this column values (pro-plan only).
   * @default true
   */
  groupable?: boolean;
  /**
   * If `false`, the menu items for column pinning menu will not be rendered.
   * Only available in DataGridPro.
   * @default true
   */
  pinnable?: boolean;
  /**
   * A comparator function used to sort rows.
   */
  sortComparator?: GridComparatorFn<Api>;
  /**
   * Type allows to merge this object with a default definition [[GridColDef]].
   * @default 'string'
   */
  type?: GridColType;
  /**
   * To be used in combination with `type: 'singleSelect'`. This is an array (or a function returning an array) of the possible cell values and labels.
   */
  valueOptions?: Array<ValueOptions> | ((params: GridValueOptionsParams) => Array<ValueOptions>);
  /**
   * Allows to align the column values in cells.
   */
  align?: GridAlignment;
  /**
   * Function that allows to get a specific data instead of field to render in the cell.
   * @param {GridValueGetterParams} params Object containing parameters for the getter.
   * @returns {GridCellValue} The cell value.
   */
  valueGetter?: (params: GridValueGetterParams<any, any, Api>) => GridCellValue;
  /**
   * Function that transforms a complex cell value into a key that be used for grouping the rows.
   * @param {GridGroupingValueGetterParams} params Object containing parameters for the getter.
   * @returns {GridKeyValue | null | undefined} The cell key.
   */
  groupingValueGetter?: (params: GridGroupingValueGetterParams) => GridKeyValue | null | undefined;
  /**
   * Function that allows to customize how the entered value is stored in the row.
   * It only works with cell/row editing.
   * @param {GridValueSetterParams} params Object containing parameters for the setter.
   * @returns {GridRowModel} The row with the updated field.
   */
  valueSetter?: (params: GridValueSetterParams) => GridRowModel;
  /**
   * Function that allows to apply a formatter before rendering its value.
   * @param {GridValueFormatterParams} params Object containing parameters for the formatter.
   * @returns {GridCellValue} The formatted value.
   */
  valueFormatter?: (params: GridValueFormatterParams<Api>) => GridCellValue;
  /**
   * Function that takes the user-entered value and converts it to a value used internally.
   * @param {GridCellValue} value The user-entered value.
   * @param {GridCellParams} params The params when called before saving the value.
   * @returns {GridCellValue} The converted value to use internally.
   */
  valueParser?: (value: GridCellValue, params?: GridCellParams<Api>) => GridCellValue;
  /**
   * Class name that will be added in cells for that column.
   */
  cellClassName?: GridCellClassNamePropType;
  /**
   * Allows to override the component rendered as cell for this column.
   * @param {GridRenderCellParams} params Object containing parameters for the renderer.
   * @returns {React.ReactNode} The element to be rendered.
   */
  renderCell?: (params: GridRenderCellParams<any, any, any, Api>) => React.ReactNode;
  /**
   * Allows to override the component rendered in edit cell mode for this column.
   * @param {GridRenderEditCellParams} params Object containing parameters for the renderer.
   * @returns {React.ReactNode} The element to be rendered.
   */
  renderEditCell?: (params: GridRenderEditCellParams<Api>) => React.ReactNode;
  /**
   * Callback fired when the edit props of the cell changes.
   * It allows to process the props that saved into the state.
   * @param {GridPreProcessEditCellProps} params Object containing parameters of the cell being edited.
   * @returns {GridEditCellProps | Promise<GridEditCellProps>} The new edit cell props.
   */
  preProcessEditCellProps?: (
    params: GridPreProcessEditCellProps,
  ) => GridEditCellProps | Promise<GridEditCellProps>;
  /**
   * Class name that will be added in the column header cell.
   */
  headerClassName?: GridColumnHeaderClassNamePropType;
  /**
   * Allows to render a component in the column header cell.
   * @param {GridColumnHeaderParams} params Object containing parameters for the renderer.
   * @returns {React.ReactNode} The element to be rendered.
   */
  renderHeader?: (params: GridColumnHeaderParams) => React.ReactNode;
  /**
   * Header cell element alignment.
   */
  headerAlign?: GridAlignment;
  /**
   * Toggle the visibility of the sort icons.
   * @default false
   */
  hideSortIcons?: boolean;
  /**
   * If `true`, the column menu is disabled for this column.
   * @default false
   */
  disableColumnMenu?: boolean;
  /**
   * If `true`, the column is filterable.
   * @default true
   */
  filterable?: boolean;
  /**
   * Allows setting the filter operators for this column.
   */
  filterOperators?: GridFilterOperator<Api>[];
  /**
   * If `true`, this column cannot be reordered.
   * @default false
   */
  disableReorder?: boolean;
  /**
   * If `true`, this column will not be included in exports.
   * @default false
   */
  disableExport?: boolean;
}

export interface GridActionsColDef<Api extends GridApiCommon = GridApiCommunity>
  extends GridColDef<Api> {
  /**
   * Type allows to merge this object with a default definition [[GridColDef]].
   * @default 'actions'
   */
  type: 'actions';
  /**
   * Function that returns the actions to be shown.
   * @param {GridRowParams} params The params for each row.
   * @returns {React.ReactElement<GridActionsCellItemProps>[]} An array of [[GridActionsCell]] elements.
   */
  getActions: (params: GridRowParams) => React.ReactElement<GridActionsCellItemProps>[];
}

export type GridEnrichedColDef<Api extends GridApiCommon = GridApiCommunity> =
  | GridColDef<Api>
  | GridActionsColDef<Api>;

export type GridColumns<Api extends GridApiCommon = GridApiCommunity> = GridEnrichedColDef<Api>[];

export type GridColTypeDef<Api extends GridApiCommon = GridApiCommunity> = Omit<
  GridColDef<Api>,
  'field'
> & { extendType?: GridNativeColTypes };

export type GridStateColDef<Api extends GridApiCommon = GridApiCommunity> =
  GridEnrichedColDef<Api> & {
    computedWidth: number;
  };

/**
 * Meta Info about columns.
 */
export interface GridColumnsMeta {
  totalWidth: number;
  positions: number[];
}

export interface GridGroupingColDefOverride
  extends Omit<
    GridColDef<GridApiPro>,
    | 'editable'
    | 'valueSetter'
    | 'field'
    | 'type'
    | 'preProcessEditCellProps'
    | 'renderEditCell'
    | 'groupable'
  > {
  /**
   * The field from which we want to apply the sorting and the filtering for the grouping column.
   * It is only useful when `props.rowGroupingColumnMode === "multiple"` to decide which grouping criteria should be used for sorting and filtering.
   * Do not have any effect when building the tree with the `props.treeData` feature.
   * @default: The sorting and filtering is applied based on the leaf field in any, otherwise based on top level grouping criteria.
   */
  mainGroupingCriteria?: string;

  /**
   * The field from which we want to render the leaves of the tree.
   * Do not have any effect when building the tree with the `props.treeData` feature.
   */
  leafField?: string;

  /**
   * If `true`, the grouping cells will not render the amount of descendants.
   * @default: false
   */
  hideDescendantCount?: boolean;
}

export interface GridGroupingColDefOverrideParams {
  /**
   * The name of the grouping algorithm currently building the grouping column.
   */
  groupingName: string;

  /**
   * The fields of the columns from which we want to group the values on this new grouping column.
   */
  fields: string[];
}
