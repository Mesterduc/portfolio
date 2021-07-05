<template>
	<h1>This is the Hompepage</h1>
	<section class="filter">
		<article
			class="filter__item"
			v-for="(category, index) in categories"
			:class="{ 'filter__item-isActive': index === isActive }"
			@click="setLinkActive(index)"
		>
			{{ category }}
		</article>
	</section>
	<section class="project__container">
		<article
			class="project"
			v-for="(repo, index) in repos"
		>
				{{ repo.name }}
			<article 
			class="project__overlay"
			:class="{ test: index === isRepoActive }"
			@mouseenter=" setRepoActive(index)"
			@mouseleave="setRepoActive(null)"
			
			>
			<article v-for="(language, i) in repo.languages">
				<div class="hej">
					{{ i }} 
					</div>
			</article>
				
				
			</article>
		</article>
	</section>
	<h2>{{ repos[0] }}</h2>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import linkIsActive from '../composables/linkIsActive'
import Repository from '../types/repository'

export default defineComponent({
	name: 'Home',
	setup() {
		// link active
		let { isActive, setLinkActive, setRepoActive, isRepoActive } = linkIsActive()

		// array of language categories
		const categories = ref(['all', 'vue', 'react', 'javascript', 'swift'])

		const repos = ref([])
		const language_url = ref([])
		const languages = ref([])
		const content = ref('')

		// get Data
		const getData = async () => {
			const url = 'https://api.github.com/users/Mesterduc/repos'
			const respose = await fetch(url)
			const result = await respose.json()
			result.forEach((e) => {
				hej(e.languages_url).then((a) => {
					let insert: Repository = {
						name: e.name,
						url: e.languages_url,
						languages: a,
					}
					repos.value.push(insert)
				})
			})
		}

		onMounted(getData)

		// get readme file
		const fetchReadme = async () => {
			const url = 'https://api.github.com/repos/Mesterduc/walkSite/contents/walksite/README.md'
			const respose = await fetch(url)
			const result = await respose.json()
			// console.log(result.content)

			content.value = atob(result.content)
		}
		fetchReadme()

		async function hej(url: string) {
			const respose = await fetch(url)
			const result = await respose.json()
			return result
		}

		return {
			repos,
			languages,
			content,
			language_url,
			categories,
			isActive,
			setLinkActive,
			// hej,
			setRepoActive,
			isRepoActive,
		}
	},
})
</script>

<style lang="scss" scoped>
.filter {
	display: flex;
	justify-content: center;

	&__item {
		font-size: 2.2rem;
		text-transform: uppercase;
		margin: 0 0.6rem;
		padding: 0.2rem 0.6rem;

		&:hover {
			background: gray;
			cursor: pointer;
		}

		&-isActive {
			background: gray;
		}
	}
}
.project {
	display: flex;
	justify-content: center;
	border: solid 1px black;
	position: relative;

	&:hover::before {
		background: white;
		transition: all 0.5s ease-in-out;
		height: 100%;
	}
	&::before {
		content: '';
		filter: brightness(60%);
		opacity: 0.7;
		position: absolute;
		transition: all 0.5s ease-in-out;
		height: 0;
		top: 0;
		left: 0;
		width: 100%;
	}

	&__container {
		display: grid;
		// grid-template-columns: repeat(3, 1fr);
		grid-template-columns: repeat(2, 50%);
		grid-auto-rows: 100px;
		gap: 1rem;
	}

	&__overlay{
		opacity: 0;
		// display: none;
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.75s ease-in-out;


	}
}
.test{
	opacity: 1;
}
.hej{
	border:solid 1px black;
	margin-right: 1rem;
	padding: 0.5rem;
	border-radius: 0.5rem;
}
</style>
