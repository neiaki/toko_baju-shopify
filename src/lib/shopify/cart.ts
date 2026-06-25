import { shopifyFetch } from './client';

const cartFragment = `
  fragment cart on Cart {
    id
    checkoutUrl
    totalQuantity
    discountCodes {
      code
      applicable
    }
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
  mutation createCart($lineItems: [CartLineInput!], $buyerIdentity: CartBuyerIdentityInput) {
    cartCreate(input: { lines: $lineItems, buyerIdentity: $buyerIdentity }) {
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

const updateCartBuyerIdentityMutation = `
  mutation updateCartBuyerIdentity($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export async function createCart(countryCode?: string) {
  const res = await shopifyFetch<any>({
    query: createCartMutation,
    variables: {
      lineItems: [],
      ...(countryCode && { buyerIdentity: { countryCode } }),
    },
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

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId?: string; quantity: number }[]
) {
  const formattedLines = lines.map((line) => {
    const item: any = {
      id: line.id,
      quantity: line.quantity,
    };
    if (line.merchandiseId) {
      item.merchandiseId = line.merchandiseId;
    }
    return item;
  });

  const res = await shopifyFetch<any>({
    query: updateCartMutation,
    variables: { cartId, lines: formattedLines },
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

export async function updateCartBuyerIdentity(cartId: string, countryCode: string) {
  const res = await shopifyFetch<any>({
    query: updateCartBuyerIdentityMutation,
    variables: {
      cartId,
      buyerIdentity: { countryCode },
    },
    cache: 'no-store',
  });
  return res.body.data?.cartBuyerIdentityUpdate?.cart;
}

const applyDiscountCodesMutation = `
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;

export async function applyDiscountCodes(cartId: string, discountCodes: string[]) {
  const res = await shopifyFetch<any>({
    query: applyDiscountCodesMutation,
    variables: { cartId, discountCodes },
    cache: 'no-store',
  });
  const result = res.body.data?.cartDiscountCodesUpdate;
  if (result?.userErrors?.length > 0) {
    return null;
  }
  return result?.cart;
}

export async function removeDiscountCodes(cartId: string) {
  return applyDiscountCodes(cartId, []);
}

