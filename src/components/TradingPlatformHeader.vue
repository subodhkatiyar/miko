<template>
  <b-navbar class="is-primary">
    <template #brand>
      <b-navbar-item>
        <img
          src="https://images.ctfassets.net/g9ymljj7t64b/58Ae50iaytu6bMgx2ZWZ1d/22d84ea040663a3b60df8f6854eb3c9f/old-miko-logo.svg?fm=webp"
          alt="miko logo image not found"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#"> Home </b-navbar-item>
      <b-navbar-item href="#"> Documentation </b-navbar-item>
      <b-navbar-dropdown label="Charts">
        <b-navbar-item @click="$emit('showIntraDay')"> Intraday Intraday </b-navbar-item>
        <b-navbar-item @click="$emit('showIntraDayWithBreaks')"> Intraday with breaks </b-navbar-item>
        <b-navbar-item @click="$emit('showIntraDayCandlestick')"> Intraday candlestick </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <!-- <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template> -->
  </b-navbar>
</template>
<script>
export default {
  name: "TrdingPlatformHeader",
};
</script>
<style scoped></style>
