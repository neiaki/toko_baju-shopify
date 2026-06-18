import { shopifyFetch } from './client';

const cartFragment = `
  fragment cart on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              product {
                title
                handle
              }
              image {
                url
                altText
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

const createCartMutation = `
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

const addToCartMutation = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

const removeFromCartMutation = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

const updateCartMutation = `
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

const getCartQuery = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${cartFragment}
`;

export async function createCart() {
  const res = await shopifyFetch<any>({
    query: createCartMutation,
    cache: 'no-store',
  });
  return res.body.data?.cartCreate?.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const res = await shopifyFetch<any>({
    query: addToCartMutation,
    variables: { cartId, lines },
    cache: 'no-store',
  });
  return res.body.data?.cartLinesAdd?.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const res = await shopifyFetch<any>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });
  return res.body.data?.cartLinesRemove?.cart;
}

export async function updateCart(cartId: string, lines: { id: string; merchandiseId: string; quantity: number }[]) {
  const res = await shopifyFetch<any>({
    query: updateCartMutation,
    variables: { cartId, lines },
    cache: 'no-store',
  });
  return res.body.data?.cartLinesUpdate?.cart;
}

export async function getCart(cartId: string) {
  const res = await shopifyFetch<any>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store',
  });
  return res.body.data?.cart;
}
