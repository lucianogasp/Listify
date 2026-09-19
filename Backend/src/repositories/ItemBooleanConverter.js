export class ItemBooleanConverter {

  ArraySqliteBooleanToBoolean = (rows) => {
    const convertedRows = rows.map(row => {
      row.is_prioritized = Boolean(row.is_prioritized);
      return row;
    });
    return convertedRows;
  }

  sqliteBooleanToBoolean = (row) => {
    return {
      ...row,
      is_prioritized: Boolean(row.is_prioritized)
    }
  }
}