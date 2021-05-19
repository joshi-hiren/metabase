import React, { useState } from "react";
import { t } from "ttag";

import AuditTable from "./AuditTable";
import AuditParameters from "../components/AuditParameters";

import { table } from "../lib/cards/queries";

const getSortOrder = isDescending => isDescending ? "desc" : "asc";

export function QuestionsAuditTable(props) {
  const [sorting, setSorting] = useState({
    // TODO: set proper default sort column
    column: "table_id",
    isDescending: false,
  });

  const handleSortingChange = sorting => setSorting(sorting);

  return (
    <AuditParameters
      parameters={[
        { key: "questionFilter", placeholder: t`Question name` },
        { key: "collectionFilter", placeholder: t`Collection name` },
      ]}
    >
      {({ questionFilter, collectionFilter }) => (
        <AuditTable
          {...props}
          pageSize={50}
          isSortable
          sorting={sorting}
          onSortingChange={handleSortingChange}
          table={table(
            questionFilter,
            collectionFilter,
            sorting.column,
            getSortOrder(sorting.isDescending),
          )}
        />
      )}
    </AuditParameters>
  );
}
