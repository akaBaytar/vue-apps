<template>
  <section>
    <BaseCard>
      <img src="../../public/not-found.svg" alt="404 Not Found" />
      <h2>Whoops!</h2>
      <p>It seems like we couldn't find the page you were looking for.</p>
      <RouterLink to="/mentors">Go Homepage</RouterLink>
    </BaseCard>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
section {
  text-align: center;
}

a {
  text-decoration: none;
  color: #8b5cf6;
}

img {
  width: 75%;
  
}
</style>
