import React from "react";
import PropTypes from "prop-types";
import { t } from "ttag";

import EmptyState from "metabase/components/EmptyState";
import Search from "metabase/entities/search";

import { QuestionPickerItem } from "./QuestionPickerItem";

QuestionList.propTypes = {
  searchText: PropTypes.string,
  collectionId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export function QuestionList({ searchText, collectionId, onSelect }) {
  if (collectionId === "personal" && !searchText) {
    return null;
  }

  let query = searchText
    ? {
        q: searchText,
      }
    : {
        collection: collectionId,
      };

  query = {
    ...query,
    models: "card",
  };

  return (
    <Search.ListLoader entityQuery={query} wrapped>
      {({ list }) => {
        if (list.length === 0) {
          return <EmptyState message={t`No questions found`} icon="search" />;
        }

        return (
          <ul>
            {list.map(item => {
              return (
                <QuestionPickerItem
                  key={item.id}
                  id={item.id}
                  name={item.getName()}
                  icon={item.getIcon()}
                  canSelect={true}
                  onSelect={onSelect}
                />
              );
            })}
          </ul>
        );
      }}
    </Search.ListLoader>
  );
}
