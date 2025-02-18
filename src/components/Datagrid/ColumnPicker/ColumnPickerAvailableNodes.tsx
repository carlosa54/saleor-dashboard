import { CircularProgress } from "@material-ui/core";
import { Box, Checkbox, Text } from "@saleor/macaw-ui/next";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ColumnPickerSearch } from "./ColumnPickerSearch";
import messages from "./messages";
import { ColumnCategory } from "./useColumns";

export interface ColumnPickerAvailableNodesProps {
  currentCategory: ColumnCategory;
  columnPickerSettings: string[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  changeHandler: (column: string) => void;
}

export const ColumnPickerAvailableNodes = ({
  currentCategory,
  columnPickerSettings,
  query,
  setQuery,
  changeHandler,
}: ColumnPickerAvailableNodesProps) => {
  const areNodesLoading = currentCategory.availableNodes === undefined;
  const areNodesEmpty = currentCategory.availableNodes?.length === 0;

  const renderNodes = () => {
    if (areNodesLoading) {
      return (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      );
    }

    if (areNodesEmpty) {
      return (
        <Text size="small" color="textNeutralSubdued">
          <FormattedMessage {...messages.noResultsFound} />
        </Text>
      );
    }

    return currentCategory.availableNodes!.map(node => (
      <Box padding={2} key={node.id}>
        <Checkbox
          onCheckedChange={() => changeHandler(node.id)}
          checked={columnPickerSettings.includes(node.id)}
          data-test-id={`search-dynamic-${node.id}`}
        >
          <Text size="small" color="textNeutralSubdued" ellipsis>
            {node.title}
          </Text>
        </Checkbox>
      </Box>
    ));
  };

  return (
    <>
      <Box
        display="flex"
        paddingX={4}
        style={{ boxSizing: "border-box" }}
        data-test-id="search-container"
      >
        <ColumnPickerSearch
          currentCategory={currentCategory}
          query={query}
          setQuery={setQuery}
        />
      </Box>
      <Box paddingX={5} paddingY={1.5} flexGrow="1">
        {renderNodes()}
      </Box>
    </>
  );
};
