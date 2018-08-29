<template>
  <router-link
    class="navbar-brand"
    :to="{ name: 'home.index' }"
  >
    <img src="static/img/logo.png" alt="">
  </router-link>
</template>

<script>
  /* ============
   * Logo Component
   * ============
   *
   * Gives an idea how components work.
   */

  export default {
    /**
     * The name of the component.
     */
    name: 'logo',
    /**
     * The properties that the component accepts.
     */
    props: {},

    /**
     * The computed properties that the component can use.
     */
    computed: {},
  };

</script>
