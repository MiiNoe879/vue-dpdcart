/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

export default [
  // Home
  {
    path: '/home',
    name: 'home.index',
    component: () => import('@/pages/Home/Index'),

    // If the user needs to be authenticated to view this page
    // meta: {
    //   auth: true,
    // },
  },

  // Cart
  {
    path: '/cart',
    name: 'cart.index',
    component: () => import('@/pages/Cart/Index'),

    // If the user needs to be authenticated to view this page
    // meta: {
    //   auth: true,
    // },
  },

  // Checkout
  {
    path: '/checkout',
    name: 'checkout.index',
    component: () => import('@/pages/Checkout/Index'),

    // If the user needs to be authenticated to view this page
    // meta: {
    //   auth: true,
    // },
  },
  {
    path: '/product/:id',
    name: 'product.index',
    component: () => import('@/pages/Product/Index'),

    // If the user needs to be authenticated to view this page
    // meta: {
    //   auth: true,
    // },
  },

  // Account
  {
    path: '/account',
    name: 'account.index',
    component: () => import('@/pages/Account/Index'),

    // If the user needs to be authenticated to view this page.
    meta: {
      auth: true,
    },
  },

  // Login
  {
    path: '/login',
    name: 'login.index',
    component: () => import('@/pages/Login/Index'),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true,
    },
  },

  // Register
  {
    path: '/register',
    name: 'register.index',
    component: () => import('@/pages/Register/Index.vue'),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true,
    },
  },

  {
    path: '/',
    redirect: '/home',
  },

  {
    path: '/*',
    redirect: '/home',
  },
];
