<template>
	<nav class="navbar">
		<router-link class="navbar__link" to="/">Home</router-link>
		<router-link class="navbar__link" to="/hej">link</router-link>
		<router-link class="navbar__link" to="/hej">link</router-link>
	</nav>
</template>

<style lang="scss" scoped>
.navbar {
    font-size: 2em;
    font-weight: 600;
    display: flex;
    justify-content: flex-end;
    align-items: center;
	&__link {
		color: black;
        margin-left: 1em;
        text-decoration: none;

	}
}
</style>
