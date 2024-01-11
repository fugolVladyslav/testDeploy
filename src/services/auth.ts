import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefresh } from './baseQuery';

export interface LoginRequest {
  phone_number: string | undefined;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

export interface RegisterResponseRequest {
  token: 'string';
}

export interface RegisterVerifyRequest {
  phone_number: string | undefined;

  code: string;
}

export interface SignUpForm {
  firstName: string;
  lastName: string;
  date_of_birth: string;
  gender: string;
  email: string;
  token: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const authAPI = createApi({
  reducerPath: 'auth',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    registerPhone: builder.mutation<string, LoginRequest>({
      query: (credentials) => ({
        url: 'customer/v1/register/start/',
        method: 'POST',
        body: credentials,
      }),
    }),
    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: 'customer/v1/auth/refresh/',
        method: 'POST',
        body: { token: localStorage.getItem('refreshToken') },
      }),
    }),

    registerVerifyPhone: builder.mutation<RegisterResponseRequest, RegisterVerifyRequest>({
      query: (credentials) => ({
        url: 'customer/v1/register/start/verify-phone/',
        method: 'POST',
        body: credentials,
      }),
    }),

    submitregisterForm: builder.mutation<any, any>({
      query: ({ token, firstName, lastName, date_of_birth, gender, email }) => ({
        url: `customer/v1/register/finish/${token}/`,
        method: 'POST',
        body: {
          first_name: firstName,
          last_name: lastName,
          date_of_birth: date_of_birth,
          gender: gender,
          email: email,
        },
      }),
    }),

    sendLoginPhoneNumber: builder.mutation<string, LoginRequest>({
      query: (credentials) => ({
        url: 'customer/v1/auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),

    sendLoginPhoneNumberVerify: builder.mutation<LoginResponse, RegisterVerifyRequest>({
      query: (credentials) => ({
        url: '/customer/v1/auth/login/verify/',
        method: 'POST',
        body: {
          phone_number: credentials.phone_number,
          otp: credentials.code,
        },
      }),
    }),

    buyFreeTickets: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/customer/v1/orders/ticket-tier/${credentials.idEvent}/buy-free/`,
        method: 'POST',
      }),
    }),

    getEvents: builder.query<any, void>({
      query: () => ({
        url: `customer/v1/events/homepage/`,
        method: 'GET',
      }),
    }),
    getEventPreview: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/customer/v1/events/${id}/preview/`,
        method: 'GET',
      }),
    }),

    getEventProductSizes: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/customer/v1/events/${id}/product/sizes/`,
        method: 'GET',
      }),
    }),

    getSelectProductSizes: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/customer/v1/events/${id}/product/sizes/`,
        method: 'GET',
      }),
    }),

    getWaitingRoom: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/customer/v1/events/${id}/waiting-room/`,
        method: 'GET',
      }),
    }),
    getProductSizes: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/customer/v1/events/${id}/product/sizes/?page=1&size=100`,
        method: 'GET',
      }),
    }),

    getSelectedProductSizes: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/customer/v1/events/${id}/product_sizes/`,
        method: 'GET',
      }),
    }),

    saveSelectedSize: builder.mutation<any, any>({
      query: (data) => ({
        url: `/customer/v1/events/product/sizes/`,
        method: 'PUT',
        body: data,
      }),
    }),

    getMainVideoAsset: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/customer/v1/main_asset_link/${id}`,
        method: 'GET',
      }),
    }),
    getMainVideoAssetItems: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/customer/v1/events/${id}/moments-video-info/`,
        method: 'GET',
      }),
    }),

    getShoppingCard: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/customer/v1/events/${id}/shopping-cart/`,
        method: 'GET',
      }),
    }),

    getMyInfo: builder.query<any, any>({
      query: () => ({
        url: `/customer/v1/my-info`,
        method: 'GET',
      }),
    }),

    getMissedItems: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/customer/v1/events/${id}/missing-items/`,
        method: 'GET',
      }),
    }),
    getDeliveryyRates: builder.query<any, any>({
      query: ({ order_id }) => ({
        url: `/customer/v1/orders/${order_id}/delivery_rates/`,
        method: 'GET',
      }),
    }),

    addToCard: builder.mutation<any, any>({
      query: ({ id, productId, sizeId, quantity }) => ({
        url: `/customer/v1/events/${id}/shopping-cart/`,
        method: 'POST',
        body: {
          product_id: productId,
          size_id: sizeId,
          quantity: quantity,
        },
      }),
    }),

    deleteOneProduct: builder.mutation<any, any>({
      query: ({ id, productId, sizeId, quantity }) => ({
        url: `/customer/v1/events/${id}/shopping-cart/`,
        method: 'DELETE',
        body: {
          product_id: productId,
          size_id: sizeId,
          quantity: quantity,
        },
      }),
    }),

    // shipping addresses
    getShippingAdresses: builder.query({
      query: () => ({
        url: `/customer/v1/orders/shipping_addresses/`,
        method: 'GET',
      }),
    }),

    addShippingAdresses: builder.mutation<any, any>({
      query: (address) => ({
        url: `/customer/v1/orders/shipping_addresses/`,
        method: 'POST',
        body: address,
      }),
    }),
    addShippingAdressesToOrder: builder.mutation<any, any>({
      query: (address) => ({
        url: `/customer/v1/orders/${address.order_id}/shipping-address/`,
        method: 'PUT',
        body: address,
      }),
    }),

    validateShippingAdress: builder.mutation<any, any>({
      query: (address) => ({
        url: `/customer/v1/orders/shipping_addresses/validate/`,
        method: 'POST',
        body: address,
      }),
    }),

    deleteShippingAdress: builder.mutation<any, any>({
      query: ({ address_id }) => ({
        url: `/customer/v1/orders/shipping_addresses/${address_id}/`,
        method: 'DELETE',
      }),
    }),

    getCheckoutPrices: builder.query({
      query: ({ order_id, rate_id }) => ({
        url: `/customer/v1/orders/${order_id}/checkout/?rate_id=${rate_id}`,
        method: 'GET',
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `/customer/v1/orders/`,
        method: 'GET',
      }),
    }),

    getStripeKeys: builder.mutation<any, any>({
      query: (order: any) => ({
        url: `/customer/v1/orders/products/buy/`,
        method: 'POST',
        body: order,
      }),
    }),

    contactForm: builder.mutation<any, any>({
      query: (form: any) => ({
        url: `/landing/get_in_contact/`,
        method: 'POST',
        body: form,
      }),
    }),

    inviteFriend: builder.mutation<any, any>({
      query: ({ phone, comment, id }) => ({
        url: `/customer/v1/events/${id}/invite-member/`,
        method: 'POST',
        body: {
          phone,
          comment,
        },
      }),
    }),

    // analitics
    synkViewSession: builder.mutation<any, any>({
      query: (viewId: number) => ({
        url: `/customer/v1/events/${viewId}/sync-view/`,
        method: 'POST',
      }),
    }),

    createViewSession: builder.mutation<any, any>({
      query: (assetId: string) => ({
        url: `/customer/v1/events/${assetId}/start-view/`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useRegisterPhoneMutation,
  useRefreshMutation,
  useRegisterVerifyPhoneMutation,
  useSubmitregisterFormMutation,
  useSendLoginPhoneNumberMutation,
  useSendLoginPhoneNumberVerifyMutation,
  useGetEventsQuery,
  useGetEventPreviewQuery,
  useGetEventProductSizesQuery,
  useGetSelectProductSizesQuery,
  useBuyFreeTicketsMutation,
  useGetWaitingRoomQuery,
  useGetProductSizesQuery,
  useGetSelectedProductSizesQuery,
  useSaveSelectedSizeMutation,
  useGetMainVideoAssetQuery,
  useGetMainVideoAssetItemsQuery,
  useGetShoppingCardQuery,
  useGetMyInfoQuery,
  useGetMissedItemsQuery,
  useAddToCardMutation,
  useDeleteOneProductMutation,
  useGetDeliveryyRatesQuery,
  useGetShippingAdressesQuery,
  useAddShippingAdressesMutation,
  useValidateShippingAdressMutation,
  useDeleteShippingAdressMutation,
  useGetCheckoutPricesQuery,
  useGetStripeKeysMutation,
  useContactFormMutation,
  useAddShippingAdressesToOrderMutation,
  useGetOrdersQuery,
  useInviteFriendMutation,
  useCreateViewSessionMutation,
  useSynkViewSessionMutation,
} = authAPI;
