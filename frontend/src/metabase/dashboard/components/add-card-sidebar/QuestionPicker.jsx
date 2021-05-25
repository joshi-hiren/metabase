import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import { connect } from "react-redux";

import Breadcrumbs from "metabase/components/Breadcrumbs";
import { QuestionPickerItem } from "./QuestionPickerItem";
import { QuestionList } from "./QuestionList";

import { entityListLoader } from "metabase/entities/containers/EntityListLoader";

import Collections from "metabase/entities/collections";

import TextInput from "metabase/components/TextInput";
import Icon from "metabase/components/Icon";

const isRoot = collection => collection.id === "root" || collection.id == null;

QuestionPicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
  collectionsById: PropTypes.object,
  getCollectionIcon: PropTypes.func,
  initialCollection: PropTypes.number,
};

function QuestionPicker({
  onSelect,
  collectionsById,
  getCollectionIcon,
  initialCollection = "root",
}) {
  const [currentCollectionId, setCurrentCollectionId] = useState(
    initialCollection,
  );
  // TODO: add debounce
  const [searchText, setSearchText] = useState("");

  const collection = collectionsById[currentCollectionId];

  const getCrumbs = collection => {
    if (collection && collection.path) {
      return [
        ...collection.path.map(id => [
          collectionsById[id].name,
          () => setCurrentCollectionId(id),
        ]),
        [collection.name],
      ];
    } else {
      return [];
    }
  };
  const crumbs = getCrumbs(collection);

  const handleSearchTextChange = value => setSearchText(value);

  const collections = (collection && collection.children) || [];

  return (
    <div>
      <TextInput
        hasClearButton
        value={searchText}
        onChange={handleSearchTextChange}
        icon={<Icon name="search" size={16} />}
      />

      {!searchText && <Breadcrumbs crumbs={crumbs} />}

      <ul>
        {collections.map(collection => {
          const hasChildren =
            collection.children &&
            collection.children.length > 0 &&
            !isRoot(collection);

          return hasChildren ? (
            <QuestionPickerItem
              key={collection.id}
              id={collection.id}
              name={collection.name}
              icon={getCollectionIcon(collection)}
              hasChildren={hasChildren}
              onSelect={collectionId => setCurrentCollectionId(collectionId)}
            />
          ) : null;
        })}
      </ul>

      <QuestionList
        searchText={searchText}
        collectionId={currentCollectionId}
        onSelect={onSelect}
      />
    </div>
  );
}

export default _.compose(
  entityListLoader({
    entityType: "collections",
    loadingAndErrorWrapper: false,
  }),
  connect((state, props) => ({
    collectionsById: (
      props.entity || Collections
    ).selectors.getExpandedCollectionsById(state),
    getCollectionIcon: (props.entity || Collections).objectSelectors.getIcon,
  })),
)(QuestionPicker);
