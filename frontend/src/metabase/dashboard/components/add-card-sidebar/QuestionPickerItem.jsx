import React from "react";
import PropTypes from "prop-types";
import Icon from "metabase/components/Icon";
import styled from "styled-components";

import Label from "metabase/components/type/Label";

import { color } from "metabase/lib/colors";

QuestionPickerItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  hasChildren: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export function QuestionPickerItem({ id, name, icon, hasChildren, onSelect }) {
  return (
    <ItemRoot onClick={() => onSelect(id)}>
      <ItemIconContainer>
        <Icon name={icon} size={22} color={color["text-light"]} />
      </ItemIconContainer>
      <ItemTitle>{name}</ItemTitle>
      {hasChildren && <Icon name="chevronright" />}
    </ItemRoot>
  );
}

const ItemRoot = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
`;

const ItemTitle = styled(Label)`
  flex: 1;
`;

const ItemIconContainer = styled.div`
  margin-right: 0.5rem;
`;
