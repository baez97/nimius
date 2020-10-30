import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
        totalLimit
        basicPercentage
        leisurePercentage
        expenses {
          description
          cost
          isBasic
          imageUrl
          day
          month
          year
        }
      }
    }
  }
`;

export const LOGIN_TOKEN_MUTATION = gql`
  mutation LoginMutation($token: String!) {
    loginToken(token: $token) {
      token
      user {
        username
        totalLimit
        basicPercentage
        leisurePercentage
        expenses {
          description
          cost
          isBasic
          imageUrl
          day
          month
          year
        }
      }
    }
  }
`;