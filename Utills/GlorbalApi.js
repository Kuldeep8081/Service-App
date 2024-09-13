import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const MASTER_URL = 'https://ap-south-1.cdn.hygraph.com/content/clypb8ng8013508w8r7azeccj/master';

const httpLink = new HttpLink({
  uri: MASTER_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


//getSlider
const getSlider = async () => {
  const { data } = await client.query({
    query: gql`
      query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
    `
  });
  return data;
};

//getCategories
const getCategories = async () => {
  const { data } = await client.query({
    query: gql`
      query getCategory {
  categories {
    id
    name
    icon {
      url
    }
  }
} `

  });
  return data;
};

const getBusinessList = async () => {
  const { data } = await client.query({
    query: gql`
      query getBusiness {
  businesses {
    id
    email
    name
    contactPerson
    category {
      name
    }
    images {
      url
    }
  }
} `

  });
  return data;
};

const getBusinessListByCategory = async (category) => {
  const { data } = await client.query({
    query: gql`
    query getBusiness($categoryName: String!) {
    businesses(where: { category: { name: $categoryName } }) {
    id
    email
    name
    contactPerson
    category {
      name
    }
    images(where: {}) {
      url
    }
    address
    about
  }
}`,
    variables: { categoryName: category }
  });
  return data;
};

const createBooking = async (inputData) => {
  const mutationQuery = gql`
    mutation createBooking {
      createBooking(
        data: {
          bookingStatus: booked,
          business: { connect: { id: "${inputData.businessId}" } },
          date: "${inputData.date}",
          time: "${inputData.time}",
          userEmail: "${inputData.userEmail}",
          userName: "${inputData.userName}"
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
        count
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: mutationQuery,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
};


const getUserBookings = async (userEmail) => {
  const { data } = await client.query({
    query: gql`
      query GetUserBookings($userEmail: String!) {
        bookings(orderBy: updatedAt_DESC, where: { userEmail: $userEmail }) {
          bookingStatus
          date
          id
          time
          userEmail
          userName
          business {
            about
            address
            contactPerson
            email
            id
            images {
              url
            }
            name
          }
        }
      }
    `,
    variables: { userEmail }
  });
  return data;
};

export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings
};
