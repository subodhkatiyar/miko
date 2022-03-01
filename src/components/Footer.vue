<template>
  <div class="footer-section">
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Miko</strong> by <a href="">Subodh katiyar</a>. The source
          code is licensed <a href="">MIT</a>. The website content is licensed
        </p>
        <strong class="thanks-for-coming">Thanks For visiting the site</strong>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "Footer",
};
</script>
<style scoped>
footer {
  background-color: #7957d5;
}
a {
  color: white;
}
p {
  color: white;
}
.thanks-for-coming {
  color: white;
  text-transform: uppercase;
}
</style>
