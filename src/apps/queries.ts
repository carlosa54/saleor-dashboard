import { gql } from "@apollo/client";

export const appsList = gql`
  query AppsList(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $sort: AppSortingInput
    $filter: AppFilterInput
  ) {
    apps(
      before: $before
      after: $after
      first: $first
      last: $last
      sortBy: $sort
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
      edges {
        node {
          ...AppListItem
        }
      }
    }
  }
`;

export const appsInProgressList = gql`
  query AppsInstallations {
    appsInstallations {
      ...AppInstallation
    }
  }
`;

export const appDetails = gql`
  query App($id: ID!) {
    app(id: $id) {
      ...App
      aboutApp
      author
      permissions {
        code
        name
      }
      dataPrivacy
      dataPrivacyUrl
      brand {
        logo {
          default(size: 64, format: WEBP)
        }
      }
    }
  }
`;

export const extensionList = gql`
  query ExtensionList($filter: AppExtensionFilterInput!) {
    appExtensions(filter: $filter, first: 100) {
      edges {
        node {
          id
          label
          url
          mount
          target
          accessToken
          permissions {
            code
          }
          app {
            id
            appUrl
          }
        }
      }
    }
  }
`;

export const EXTENSION_LIST_QUERY = "ExtensionList";
